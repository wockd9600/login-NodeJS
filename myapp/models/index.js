'use strict';

const Sequelize = require('sequelize');
const User = require('./user');
// const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];
const db = {};



// 연결 객체
// const sequelize = new Sequelize(config.database, config.username, config.password, config);
const sequelize = new Sequelize('yrdb', 'yrsql', 'root', {
  dialect: 'mssql',
  host: '127.0.0.1',
  port: '1433',
});

db.sequelize = sequelize;

db.User = User;
// // db.Comment = Comment;

User.init(sequelize);
// // Comment.init(sequelize);

// User.associate(db);
// // Comment.associate(db);
// // console.log(db);

module.exports = db;
