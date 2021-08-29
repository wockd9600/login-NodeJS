const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        // table
        return super.init({
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            pwd: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            salt: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    // 다른 모델과 관계
    static associate(db) {
        // db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id', as: 'comment_user'});
    }
};