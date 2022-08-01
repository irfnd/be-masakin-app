require("dotenv").config();
const { DATABASE_URL, DATABASE_URL_LOCAL, ENV } = process.env;

const Sequelize = require("sequelize");

const dbUri = ENV === "production" ? DATABASE_URL : DATABASE_URL_LOCAL;
const ssl = ENV === "production" ? { ssl: { require: true, rejectUnauthorized: false } } : null;
const sequelize = new Sequelize(dbUri, { logging: false, dialectOptions: ssl });

const db = { sequelize, Sequelize };

db.Users = require("./model.users")(sequelize, Sequelize);
db.Tokens = require("./model.tokens")(sequelize, Sequelize);
db.Recipes = require("./model.recipes")(sequelize, Sequelize);
db.Videos = require("./model.videos")(sequelize, Sequelize);
db.Comments = require("./model.comments")(sequelize, Sequelize);
db.LikedRecipes = require("./model.likedRecipes")(sequelize, Sequelize);
db.SavedRecipes = require("./model.savedRecipes")(sequelize, Sequelize);

// Users Relations
db.Users.hasMany(db.Tokens, { onDelete: "cascade" });
db.Users.hasMany(db.Recipes);
db.Users.hasMany(db.Comments);
db.Users.belongsToMany(db.Recipes, { through: db.LikedRecipes, onDelete: "cascade" });
db.Users.belongsToMany(db.Recipes, { through: db.SavedRecipes, onDelete: "cascade" });

// Tokens Relations
db.Tokens.belongsTo(db.Users);

// Recipes Relations
db.Recipes.hasMany(db.Videos, { onDelete: "cascade" });
db.Recipes.hasMany(db.Comments, { onDelete: "cascade" });
db.Recipes.belongsTo(db.Users);
db.Recipes.belongsToMany(db.Users, { through: db.LikedRecipes, onDelete: "cascade" });
db.Recipes.belongsToMany(db.Users, { through: db.SavedRecipes, onDelete: "cascade" });

// Videos Relations
db.Videos.belongsTo(db.Recipes);

// Comments Relations
db.Comments.belongsTo(db.Users);
db.Comments.belongsTo(db.Recipes);

module.exports = db;
