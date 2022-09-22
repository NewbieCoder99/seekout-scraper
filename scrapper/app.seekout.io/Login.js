const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { Cluster } = require('puppeteer-cluster')
const lib = require('../../libraries/index')
const scrapeData = require('../../libraries/scrapeData')
const _url = 'https://app.seekout.io'

puppeteer.use(StealthPlugin())

module.exports = {
	index : async function() {
		(async () => {

	        const browser = await puppeteer.launch(lib.puppeteerOptions())

	        const page = await browser.newPage()

		    await page.goto(_url + '/signIn', {
		        waitUntil: 'networkidle0',
		    })

		})()
	}
}
