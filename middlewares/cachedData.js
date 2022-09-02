const { responseSuccess } = require("../libs/response");
const { redis } = require("../models");

const all = (key) => {
	return async (req, res, next) => {
		try {
			const cacheResults = await redis.get(key);
			if (cacheResults) {
				return res.json(responseSuccess("retrieved", { fromCache: true, data: JSON.parse(cacheResults) }));
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

const byId = (key) => {
	return async (req, res, next) => {
		const { id } = req.params;
		try {
			const cacheResults = await redis.get(`${key}-${id}`);
			if (cacheResults) {
				return res.json(responseSuccess("retrieved", { fromCache: true, data: JSON.parse(cacheResults) }));
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

const byQuery = (key) => {
	return async (req, res, next) => {
		const uniqueName = Object.values(req.query).join("-");
		try {
			const cacheResults = await redis.get(`${key}-${uniqueName}`);
			if (cacheResults) {
				return res.json(responseSuccess("retrieved", { fromCache: true, data: JSON.parse(cacheResults) }));
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

const byUser = (key) => {
	return async (req, res, next) => {
		const { id: userId } = req.decoded;
		const { id } = req.params || null;
		try {
			const cacheResults = await redis.get(id ? `${key}-${userId}-${id}` : `${key}-${userId}`);
			if (cacheResults) {
				return res.json(responseSuccess("retrieved", { fromCache: true, data: JSON.parse(cacheResults) }));
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

module.exports = { all, byId, byQuery, byUser };
