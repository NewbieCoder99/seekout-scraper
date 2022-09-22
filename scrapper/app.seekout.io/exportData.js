const ExcelJS = require('exceljs')
const scrapeData = require('../../libraries/scrapeData')
const lib = require('../../libraries/index')

module.exports = {
	setColumns : function(worksheet) {
		worksheet.columns = [
			{
				header: 'No',
				key: 'no',
				width: 10
			},
			{
				header: 'Name',
				key: 'name',
				width: 32
			},
			{
				header: 'Linkedin',
				key: 'linkedin',
				width: 50
			},
			{
				header: 'Role',
				key: 'role',
				width: 20
			},
			{
				header: 'Company',
				key: 'company',
				width: 30
			},
			{
				header: 'Location',
				key: 'location',
				width: 30
			}
		]

		return worksheet
	},
	updateStatus : async function(params) {
		await scrapeData.update({
			data : {
				isExported : params.isExported,
				exportStatus : params.exportStatus
			},
			condition : {
	            where: {
	                id: params.id
	            }
			}
		})
	},
	exportData : async function(data) {

		let workbook = new ExcelJS.Workbook()

		const worksheet = workbook.addWorksheet('sheet')

		const row = worksheet.lastRow

		this.setColumns(worksheet)

		var rowNumber = 2
		var totalExported = 0
		for(var i = 0; i < data.length; i++) {
			var candidate = JSON.parse(data[i].data)

			worksheet.getCell('A' + rowNumber).value = i + 1
			worksheet.getCell('B' + rowNumber).value = candidate.name
			worksheet.getCell('C' + rowNumber).value = candidate.linkedin
			worksheet.getCell('D' + rowNumber).value = candidate.role
			worksheet.getCell('E' + rowNumber).value = candidate.company
			worksheet.getCell('F' + rowNumber).value = candidate.location

			var jsonData = JSON.stringify({
				name : candidate.name,
				linkedin : candidate.linkedin,
				role : candidate.role,
				company : candidate.company,
				location : candidate.location
			})

			this.updateStatus({
				isExported: 1,
				exportStatus : 'success',
				id : data[i].id
			})

			lib.info(jsonData)
			totalExported++
			rowNumber++
		}

		let d = new Date()
		let m = lib.monthNumber()

		let fileName = './storage/xls/seekout-' + d.getFullYear() + '-' + m[d.getMonth()] + '-' + d.getHours() + d.getMinutes() + d.getSeconds() + '-export-' + totalExported + '.csv'

		lib.success(`[+] Filename : ${fileName}`)

		workbook.csv.writeFile(fileName)
	},
	index : async function() {

		const { count, rows } = await scrapeData.findAll({
			serviceName : 'seekout',
			isExported :0
		}, 1000)

		this.exportData(rows)
	}
}
