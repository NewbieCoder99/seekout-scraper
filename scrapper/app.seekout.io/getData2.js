const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { Cluster } = require('puppeteer-cluster')
const lib = require('../../libraries/index')
const scrapeData = require('../../libraries/scrapeData')
const _url = 'https://app.seekout.io'
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')

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

	                if(totalHeight >= scrollHeight) {
	                    clearInterval(timer);
	                    resolve();
	                }
	            }, 20)
	        })
	    })
	},
	index : async function(pathProject,numberLoop) {
		(async () => {

			const cluster = await Cluster.launch({
			    concurrency: Cluster.CONCURRENCY_PAGE,
			    maxConcurrency: 2,
			    puppeteerOptions : {
			    	executablePath: process.env.BROWSER_EXECUTABLE_PATH,
			    	userDataDir : 'data/userdata',
			        args : [
			            '--no-sandbox',
			            '--test-type=webdriver',
			            '--disable-setuid-sandbox',
			            '--unhandled-rejections=strict',
			            '--window-position=0,0',
			            '--ignore-certifcate-errors',
			            '--ignore-certifcate-errors-spki-list',
			            '--user-agent="'+ process.env.USER_AGENT +'"'
			        ],
			        sameDomainDelay: 1000,
			        retryDelay: 1000,
			        workerCreationDelay: 1000
			    }
			})

			cluster.on('taskerror', (err, data) => {
				lib.error(`💀 ${data.data} => ${err}`)
			})

			cluster.task(async ({page, data}) => {

		        await page.goto(_url + '/project/' + data.pathProject + '?page='+ data.number +'&pageSize=100&sortBy=oldest', {
		            waitUntil : 'networkidle0',
		        })

		        await this.autoScroll(page)

		        var html = await page.content()

		        lib.writeContent(html,'logs/'+ data.number +'.html')

		        lib.info(data.number + '.html')
			})

			var number = 1
			for(var i = 0; i < numberLoop; i++) {
		        cluster.queue({
		            pathProject : pathProject,
		            number : number
		        })
		        number++
			}

		})()
	}
}
