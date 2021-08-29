const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

/* GET users listing. */
//로그인 페이지
router.get('/', isNotLoggedIn, (req, res, next) => {
    res.render('login');
});

// 회원가입 페이지
router.get('/signup', isNotLoggedIn, function (req, res, next) {
    res.render('signup');
});

// 회원가입 실패
router.get('/faillogin', function (req, res, next) {
    res.render('signup');
});

// 로그인 액션
router.post("/login", isNotLoggedIn, async function (req, res, next) {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
          console.error(authError);
          return next(authError);
        }
        if (!user) {
          return res.json(0);;
        }
        return req.login(user, (loginError) => {
          if (loginError) {
            console.error(loginError);
            return res.json(0);
          }
          return res.json(1);
        });
      })(req, res, next);
    //sql injection 방지해야함
    // let { userID, userPW } = req.body;

    // try {
    //     let result = await User.findOne({
    //         where: {
    //             user: userID
    //         }
    //     });

    //     if (result === null) {
    //         return res.json(0);
    //     } else { }

    //     let dbPW = result.dataValues.pwd;
    //     let salt = result.dataValues.salt;
    //     let hashPW = crypto.createHash("sha512").update(userPW + salt).digest("hex");

    //     if (dbPW === hashPW) {
    //         console.log('success');
    //         // 쿠키 설정
    //         // res.cookie("user", userID, {
    //         //     expires: new Date(Date.now() + 24 * 60 * 60),
    //         //     httpOnly: true
    //         // });
    //         req.session.user = userID;
    //         return res.json(1);
    //     } else { }
    // } catch (err) {
    //     console.log(err);
    // }
    // res.json(0);
});

// 회원가입 액션
router.post('/signup', async (req, res, next) => {
    let body = req.body;
    let { userID, userPW, joinCode, userName } = body;

    const regType = /^[A-Za-z0-9+]{5,15}$/;

    if (!(regType.test(userID)) || (userID.length < 5 || userID.length > 15)) {
        return;
    }

    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = await bcrypt.hash(userPW + salt, 12);

    try {
        User.create({
            id: userID,
            pwd: hashPassword,
            salt: salt,
            name: userName,
        });
        console.log('create new ID');
    } catch (err) {
        console.log(err);
    }

    res.redirect("/users");
});

// 로그아웃
router.get("/logout",isLoggedIn, function (req, res, next) {
    req.session.destroy();
    res.clearCookie('sid');

    res.redirect("/user/logout");
});

// 아이디 중복확인
router.get('/confirmid', async (req, res, next) => {
    let id = req.query.id;
    try {
        let isAvailableID = await User.findOne({
            where: {
                id,
            }
        });
        if (isAvailableID === null) {
            res.json(0);
        } else {
            console.log('available ID')
            res.json(1);
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
