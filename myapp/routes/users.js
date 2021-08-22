const express = require('express');
const crypto = require('crypto');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
// 로그인
router.post("/login", async function(req, res, next){
  let body = req.body;

  // let result = await models.user.findOne({
  //     where: {
  //         email : body.userEmail
  //     }
  // });

  let dbPassword = result.dataValues.userPW;
  let inputPassword = body.userPW;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    // 쿠키 설정
    res.cookie("user", body.userEmail , {
        expires: new Date(Date.now() + 24 * 60 * 60),
        httpOnly: true
    });
    res.redirect("/user");
}
else{
    console.log("비밀번호 불일치");
    res.redirect("/user/login");
}
});
// 로그아웃
router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/user/login");
})
// 회원가입
router.post('/sign_up', (req, res, next)=>{
  let body = req.body;
  const regType1 = /^[A-Za-z0-9+]*$/;
  if (regType1.test(document.getElementById('userid').value)) { alert('아이디가 조건에 맞지 않습니다'); }
  
    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    // let result = models.user.create({
    //     name: body.userName,
    //     email: body.userEmail,
    //     password: hashPassword,
    //     salt: salt
    // });

    res.redirect("/users/sign_up");
});

module.exports = router;
