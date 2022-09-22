const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { Cluster } = require('puppeteer-cluster')
const lib = require('../../libraries/index')
const scrapeData = require('../../libraries/scrapeData')
const _url = 'https://app.seekout.io'
const md5 = require('md5')

puppeteer.use(StealthPlugin())

module.exports = {
	autoScroll : async function autoScroll(page) {
	    await page.evaluate(async () => {
	        await new Promise((resolve, reject) => {
	            var totalHeight = 0
	            var distance = 100
	            var timer = setInterval(() => {
	                var scrollHeight = document.body.scrollHeight
	                window.scrollBy(0, distance)
	                totalHeight += distance

	                console.log(`[+] ... Scrolling Down ${totalHeight} ... `)

	                if(totalHeight >= scrollHeight) {
	                    clearInterval(timer);
	                    resolve();
	                }

	            }, 5)
	        })
	    })
	},
	index : async function(pathProject,startNumber,lengthNumber) {
		(async () => {

			const browser = await puppeteer.launch(lib.puppeteerOptions())
			const page = await browser.newPage()

			await page.setDefaultNavigationTimeout(process.env.NAVIGATION_DEFAULT_TIMEOUT)

			var number = startNumber
			for(var i = 0; i < lengthNumber; i++) {

			    await page.goto(_url + '/project/' + pathProject + '?page='+ number +'&pageSize=100&sortBy=oldest', {
			        waitUntil: 'networkidle0',
			    })

			    var candidateHeader = page.waitForSelector(
			    	'div[data-for="candidateHeader"]', {
			    		visible: true
			    }).then(() => {
					return true
				}).catch((res) => {
					return false
				})

				if(!candidateHeader) {
					lib.warning(`⚠️  ... Retries to previouse page.`)
					continue
				}

				await this.autoScroll(page)

				var html = await page.content()

			    var candidateElement = page.waitForSelector('.-mcYW7', { visible: true }).then(() => {
					return true
				}).catch((res) => {
					return false
				})

				if(!candidateElement) {
					lib.warning(`⚠️  ... Retries to previouse page.`)
					continue
				}

				var html = lib.getContent(html,'<div class="-mcYW7">','<div class="-h5Bty -ytoRt">')

				let dataKeys = [...html.matchAll(/data-key=\"([a-zA-Z0-9\.\-\_]+)\"/gm)]

				for(var n = 0; n < dataKeys.length; n++) {
					try {
						var candidateKey = dataKeys[n][1]

						try {
							var getCandidateContent = lib.getContent(html,'data-key="'+ candidateKey +'">','<div class="candidateResult -YC0Jf"')
						} catch(e) {
							continue
						}

						var name = lib.getContent(getCandidateContent,'class="-g2GWi"><span>','</span>')

						try {
							var linkedin = lib.getContent(getCandidateContent, '<div class="-wzpkV"><a href="','"')
						} catch(e) {
							var linkedin = ''
						}

						try {
							var role = lib.getContent(getCandidateContent,'-ezKRP -qIFgq"><span>','</span>')
						} catch(e) {
							var role = ''
						}

						try {
							var company = lib.getContent(getCandidateContent,'</span> at <span>','</span>')
						} catch(e) {
							var company = ''
						}

						try {
							var location = lib.getContent(getCandidateContent,'-PhaLH -ezKRP">','<')
						} catch(e) {
							var location = ''
						}

						scrapeData.create({
							condition : {
								code : candidateKey
							},
							data : {
								code : candidateKey,
								serviceName: 'seekout',
								computerName : process.env.COMPUTER_NAME,
								category : pathProject,
								data : {
									code : candidateKey,
									hashCode : md5(candidateKey),
									name : name,
									linkedin : linkedin,
									role :role,
									company : company,
									location : location
								},
								isScraped : false
							}
						})

						lib.success(`...... Page Number : ${number} ✅`)
						lib.success(`...... Number : ${n} ✅`)
						lib.success(`...... Name : ${name} ✅`)
						lib.success(`...... Linkedin : ${linkedin} ✅`)
						lib.success(`...... Role : ${role} ✅`)
						lib.success(`...... Company : ${company} ✅`)
						lib.success(`...... Location : ${location} ✅`)
						lib.createEquals()
					} catch(e) {
						lib.error(`...... ${e} ✅`)
					}
				}
		        number++
			}

			await browser.close()
		})()
	}
}
