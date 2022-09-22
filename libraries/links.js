const Models = require('../models/index')

module.exports = {
	create : async function(data) {
		await Models.Link.findOrCreate({
            where : data.condition,
            defaults : data.data
		})
	},
	findAll : async function(condition, limit = 1) {
        return await Models.Link.findAndCountAll({
            where: condition,
            order : [
                ['createdAt','desc']
            ],
            offset: 0,
            limit : limit
        })
	},
	update : async function(data) {
	    await Models.Link.update(data.data, data.condition)
	},
	delete : async function(id) {
		await Models.Link.destroy({
			where : {
				id : id
			}
		})
	}
}