const { responseSuccess } = require("../../libs/response");
const { recipesModel, commentsModel, recipesVideosModel } = require("../../models");

exports.selectAll = async (req, res, next) => {
	const { page, size } = req.query;
	try {
		if (page && size) {
			const totalRecipes = await recipesModel.select.selectTotalModel();
			const recipes = await recipesModel.select.selectAllPaginationModel(page, size);
			const results = {
				recipes,
				total_recipes: parseInt(totalRecipes[0].count, 10),
				total_page: Math.ceil(totalRecipes[0].count / size),
				current_page: parseInt(page, 10),
				current_size: parseInt(size, 10),
			};
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			const results = await recipesModel.select.selectAllModel();
			res.status(200).json(responseSuccess("retrieved", results));
		}
	} catch (err) {
		next(err);
	}
};

exports.selectById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const recipe = await recipesModel.select.selectByIdModel(id);
			const comments = await commentsModel.select.selectByRecipeModel(id);
			const videos = await recipesVideosModel.select.selectByRecipeModel(id);
			const results = { recipe: recipe[0], videos, comments };
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};

exports.selectByOwner = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await recipesModel.select.selectByOwnerModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};

exports.selectByName = async (req, res, next) => {
	const { search } = req.body;
	try {
		const results = await recipesModel.select.selectByNameModel(search);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectLatest = async (req, res, next) => {
	try {
		const results = await recipesModel.select.selectLatestModel();
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};
