const XSSfilter = content => content.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#x27').replace(/\//g, '&#x2F');


function checkUser() {
    let userID = XSSfilter(document.querySelector('.userID').value);
    let userPW = XSSfilter(document.querySelector('.userPW').value);
    let alertMsg = document.querySelector('.alertUser');

    if (userID.length <= 0) {
        alertMsg.innerText = '아이디를 입력해주세요.';
        return;
    } else { }

    if (userPW <= 0) {
        alertMsg.innerText = '비밀번호를 입력해주세요.';
        return;
    } else { }

    $.ajax({
        url: `/users/login`,
        data: { userID, userPW },
        type: "POST",
        success: function (result) {
            if (result) {
                location.href = '/success'
            } else {
                alertMsg.innerText = '아이디 또는 비밀번호를 확인해주세요.';
            }
        }
    });
}