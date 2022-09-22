const fs = require('fs')
const e = require('cli-color')
const emailValidator = require('email-validator')
const {phone} = require('phone')
require('dotenv').config()

module.exports = {
	info : function(text) {
		console.log(e.green(text))
	},
	success : function(text) {
		console.log(e.white(text))
	},
	error : function(text) {
		console.log(e.red(text))
	},
	warning : function(text) {
		console.log(e.yellow(text))
	},
	toObject : function(html) {
		return JSON.parse(this.getContent(html,'<pre style="word-wrap: break-word; white-space: pre-wrap;">','</pre>'))
	},
	toJson : function(obj) {
		return JSON.stringify(obj)
	},
	wordlist : function(fileName) {
		return fs.readFileSync('storage/' + fileName, {
			encoding: 'utf8'
		})
	},
	getCookies : function(cookieFile) {
		const cookieJson = fs.readFileSync(cookieFile, {
			encoding: 'utf8'
		})

		return JSON.parse(cookieJson)
	},
	validateEmail(email) {
		return emailValidator.validate(email)
	},
	validatePhoneNumber(phoneNumber) {
		return phone(phoneNumber)
	},
	createEquals : function(text = null) {
		if(text == null) {
			this.info(`=======================================================================================================`)
		} else {
			this.info(`${text} =======================================================================================================`)
		}
	},
	regex : function(html,reg) {
		return [...html.matchAll(reg)]
	},
	writeContent : function writeContent(html, fileName) {
		fs.writeFile('storage/' + fileName, html, err => {
			if (err) {
				this.error(err)
			}
		})
	},
	appendContent : function appendContent(html, fileName) {
		fs.appendFile('storage/' + fileName, html, err => {
			if (err) {
				this.error(err)
			}
		})
	},
	getContent : function(html, start, end) {
	    var str1 = html.split(start)
	    var str2 = str1[1].split(end)
	    return str2[0]
	},
	monthName :  function() {
		return [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]
	},
	monthNumber : function() {
		return [
		    '01',
		    '02',
		    '03',
		    '04',
		    '05',
		    '06',
		    '07',
		    '08',
		    '09',
		    '10',
		    '11',
		    '12'
		]
	},
	customDate : function(t) {
		// let joiningDate = 8760 / 24
		let joiningDate = t / 24
		let dateOffset = (24 * 60 * 60 * 1000) * joiningDate
		let myDate = new Date()

		let months = this.monthNumber()

		myDate.setTime(myDate.getTime() - dateOffset)

		return `${myDate.getDate()}-${months[myDate.getMonth()]}-${myDate.getFullYear()}`
	},
	formatUnixTimestamps : function(unixTimestamp) {
		let date = new Date(unixTimestamp * 1000)
		// Hours part from the timestamp
		let hours = date.getHours()
		// Minutes part from the timestamp
		let minutes = "0" + date.getMinutes()
		// Seconds part from the timestamp
		let seconds = "0" + date.getSeconds()

		// Will display time in 10:30:23 format
		let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
		return formattedTime
	},
	puppeteerOptions : function(opt = null) {

		let args = [
            '--no-sandbox',
            '--test-type=webdriver',
            '--disabled-setupid-sandbox',
            '--unhandled-rejections=strict',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="'+ process.env.USER_AGENT +'"'
		]

		if(process.env.IS_HEADLESS == 1) {
			var isHeadless = true
		} else {
			var isHeadless = false
		}

		if(opt == 'login') {
			var isHeadless = false
		}

		if(process.env.USE_EXECUTABLE_PATH_BROWSER == 1) {
			return {
				headless : isHeadless,
				userDataDir : 'data/userdata',
				executablePath: process.env.BROWSER_EXECUTABLE_PATH,
				args : args
			}
		}

		return {
			headless : isHeadless,
			userDataDir : 'data/userdata',
			args : args
		}
	}
}
