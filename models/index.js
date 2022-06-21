module.exports = {
  usersModel: {
    insert: require("./users/model.insert"),
    select: require("./users/model.select"),
    update: require("./users/model.update"),
    delete: require("./users/model.delete"),
  },
  recipesModel: {
    insert: require("./recipes/model.insert"),
    select: require("./recipes/model.select"),
    update: require("./recipes/model.update"),
    delete: require("./recipes/model.delete"),
  },
  commentsModel: {
    insert: require("./comments/model.insert"),
    select: require("./comments/model.select"),
    update: require("./comments/model.update"),
    delete: require("./comments/model.delete"),
  },
  recipesVideosModel: {
    insert: require("./recipes_videos/model.insert"),
    select: require("./recipes_videos/model.select"),
    update: require("./recipes_videos/model.update"),
    delete: require("./recipes_videos/model.delete"),
  },
  likedRecipesModel: {
    insert: require("./liked_recipes/model.insert"),
    select: require("./liked_recipes/model.select"),
    delete: require("./liked_recipes/model.delete"),
  },
  savedRecipesModel: {
    insert: require("./saved_recipes/model.insert"),
    select: require("./saved_recipes/model.select"),
    delete: require("./saved_recipes/model.delete"),
  },
};
