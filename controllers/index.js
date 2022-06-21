module.exports = {
  usersController: {
    insert: require("./users/controller.insert"),
    select: require("./users/controller.select"),
    update: require("./users/controller.update"),
    delete: require("./users/controller.delete"),
  },
  recipesController: {
    insert: require("./recipes/controller.insert"),
    select: require("./recipes/controller.select"),
    update: require("./recipes/controller.update"),
    delete: require("./recipes/controller.delete"),
  },
  commentsController: {
    insert: require("./comments/controller.insert"),
    select: require("./comments/controller.select"),
    update: require("./comments/controller.update"),
    delete: require("./comments/controller.delete"),
  },
  recipesVideosController: {
    insert: require("./recipes_videos/controller.insert"),
    select: require("./recipes_videos/controller.select"),
    update: require("./recipes_videos/controller.update"),
    delete: require("./recipes_videos/controller.delete"),
  },
  likedRecipesController: {
    insert: require("./liked_recipes/controller.insert"),
    select: require("./liked_recipes/controller.select"),
    delete: require("./liked_recipes/controller.delete"),
  },
  savedRecipesController: {
    insert: require("./saved_recipes/controller.insert"),
    select: require("./saved_recipes/controller.select"),
    delete: require("./saved_recipes/controller.delete"),
  },
};
