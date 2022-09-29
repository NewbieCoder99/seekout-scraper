const Models = require('../models/index')
const { Op } = require('sequelize')

module.exports = {
	create : async function(data) {
		await Models.ScrapeData.findOrCreate({
            where : data.condition,
            defaults : data.data
		})
	},
	findAllWithCount : async function(condition, limit = 1, orderBy = 'desc') {
        return await Models.ScrapeData.findAndCountAll({
            where: condition,
            order : [
                [
                    'id', orderBy
                ]
            ],
            offset: 0,
            limit : limit
        })
	},
    findAll : async function(condition, limit = 1, offset, orderBy = 'desc') {
        return await Models.ScrapeData.findAll({
            where: condition,
            order : [
                ['id', orderBy]
            ],
            offset: offset,
            limit : limit
        })
    },
    findAllWithoutFilter : async function() {
        return await Models.ScrapeData.findAndCountAll({
            order : [
                ['id','asc']
            ]
        })
    },
    groupByName : async function() {
        return await Models.ScrapeData.findAll({ group: 'category' })
    },
    update : async function(data) {
        await Models.ScrapeData.update(data.data, data.condition)
    },
    findOne : async function(code) {
        return await Models.ScrapeData.findOne({
            where : {
                code : code
            }
        })
    },
    countData : async function(condition) {
        return await Models.ScrapeData.count({
            where : condition
        })
    },
    resetData : async function() {
        await Models.ScrapeData.update({
            exportStatus: null,
            isExported : 0
        }, {
            where : {
                [Op.or]: [
                    {isScraped: 1},
                    {isExported : 1},
                    {exportStatus : 'error'},
                    {exportStatus : 'success'},
                ]
            }
        })
    }
}