'use strict';

const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/clothes');
const foodModel = require('./food/food');
const Collection = require('./collections');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';
let sequelizeOptions =
process.env.NODE_ENV === "production" ?{
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: { require: true, rejectUnauthorized: false},
                native: true
            }
        } : {} ;

const sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
}
