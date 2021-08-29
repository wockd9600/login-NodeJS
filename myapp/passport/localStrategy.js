const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userID',
        passwordField: 'userPW',
    }, async (userID, userPW, done) => {
        try {
            const result = await User.findOne({
                where: {
                    id: userID
                }
            });

            if (result) {
                let dbPW = result.dataValues.pwd;
                let salt = result.dataValues.salt;
                let isLoginalbe = await bcrypt.compare(userPW + salt, dbPW);

                if (isLoginalbe) {
                    done(null, result);
                }
                else {
                    done(null, false, { failLogin: 1 });
                }
            }
            else {
                done(null, false, { failLogin: 1 });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
