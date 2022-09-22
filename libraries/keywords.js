const Models = require('../models/index')

module.exports = {
	create : async function(data) {
		return await Models.Keywords.create(data)
	},
	findOne : async function(condition) {
        return await Models.Keywords.findOne(condition)
	}
}