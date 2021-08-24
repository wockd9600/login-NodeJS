const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        // table
        return super.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            create_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'Coment',
            tableName: 'coments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    // 다른 모델과 관계
    static associate(db) {
        db.User.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    }
};