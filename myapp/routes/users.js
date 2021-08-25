const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const { User } = require('../models');


/* GET users listing. */
//로그인 페이지
router.get('/', async (req, res, next) => {
    res.render('login');
});

// 회원가입 페이지
router.get('/signup', function (req, res, next) {
    res.render('signup');
});

// 회원가입 페이지
router.get('/faillogin', function (req, res, next) {
    res.render('signup');
});

// 로그인 액션
router.post("/login", async function (req, res, next) {
    let body = req.body;

    //sql injection 방지해야함
    let inputID = body.userID;
    let inputPW = body.userPW;


    try {
        let result = await User.findOne({
            where: {
                user: inputID
            }
        });

        if (result === null) {
            return res.json(0);
        } else { }

        let dbPW = result.dataValues.pwd;
        let salt = result.dataValues.salt;
        let hashPW = crypto.createHash("sha512").update(inputPW + salt).digest("hex");

        if (dbPW === hashPW) {
            console.log('success');
            // 쿠키 설정
            res.cookie("user", body.userEmail, {
                expires: new Date(Date.now() + 24 * 60 * 60),
                httpOnly: true
            });
            return res.json(1);
        } else { }
    } catch (err) {
        console.log(err);
    }
    res.json(0);
});

// 회원가입 액션
router.post('/signup', async (req, res, next) => {
    let body = req.body;

    let inputID = body.userID;
    const regType = /^[A-Za-z0-9+]{5,15}$/;

    if (!(regType.test(inputID)) || (inputID.length < 5 || inputID.length > 15)) {
        return;
    }

    let inputPW = body.userPW;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPW + salt).digest("hex");

    try {
        User.create({
            user: inputID,
            pwd: hashPassword,
            salt: salt
        });
        console.log('create new ID');
    } catch (err) {
        console.log(err);
    }

    res.redirect("/users/signup");
});

// 로그아웃
router.get("/logout", function (req, res, next) {
    req.session.destroy();
    res.clearCookie('sid');

    res.redirect("/user/login");
});

// 아이디 중복확인
router.get('/confirmid', async (req, res, next) => {
    let id = req.query.id;
    try {
        let isAvailableID = await User.findOne({
            where: {
                user: id,
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
