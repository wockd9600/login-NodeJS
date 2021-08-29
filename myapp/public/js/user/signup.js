const XSSfilter = content => content.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#x27').replace(/\//g, '&#x2F');


let userPW = document.querySelector('#userPW')

let isAvailableID = false;
let isAvailablePW = false;
let isSameAsPW = false;


// 회원가입 가능한 아이디인지 확인
function checkID(e) {
    const displayCheckID = document.querySelector('.checkID');

    const regType = /^[A-Za-z0-9+]{5,15}$/;

    isAvailableID = false;

    displayCheckID.style.color = 'red';

    if (e.value.length <= 0) {
        displayCheckID.textContent = '아이디는 필수 정보입니다.';
        return;
    } else { }

    if (!(regType.test(e.value)) || (e.value.length < 5 || e.value.length > 15)) {
        displayCheckID.textContent = '5~15자의 영문 소문자, 숫자만 사용 가능합니다.';
        return;
    } else { }

    $.ajax({
        url: `/users/confirmid`,
        data: { id: e.value },
        type: "get",
        success: function (result) {
            if (result) {
                displayCheckID.textContent = '이미 사용 중인 아이디입니다.'
                return;
                // 사용 가능한 아이디
            } else {
                isAvailableID = true;

                displayCheckID.style.color = '#00B7FF';
                displayCheckID.textContent = '사용 가능한 아이디입니다.'
            }
        }
    });
}

// 회원가입 가능한 비밀번호인지 확인
function checkPW(e) {
    const displayCheckPW = document.querySelector('.checkPW');

    const regType = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}/;

    isAvailablePW = false;

    if (e.value.length <= 0) {
        displayCheckPW.textContent = '비밀번호는 필수 정보입니다.';
        return;
    } else { }

    if (!(regType.test(e.value)) || (e.value.length < 8 || e.value.length > 20)) {
        displayCheckPW.textContent = '8~20자 숫자, 영문 대소문자, 특수문자를 사용하세요.';
        return;
    } else {
        isAvailablePW = true;
        displayCheckPW.textContent = '';
    }
}
// 비밀번호 재확인
function confirmPW(e) {
    const displayCheckPW = document.querySelector('.confirmPW');

    isSameAsPW = false;
    if (userPW.value !== e.value) {
        displayCheckPW.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        isSameAsPW = true;
        displayCheckPW.textContent = '';
    }
}

// 회원가입 액션
function signup() {
    let alertMsg = document.querySelector('.alertUser');

    if (!isAvailableID) {
        alertMsg.innerText = '아이디를 확인해주세요.';
    }
    else if (!isAvailablePW) {
        alertMsg.innerText = '비밀번호를 확인해주세요.';
    }
    else if (!isSameAsPW) {
        alertMsg.innerText = '비밀번호가 일치하지 않습니다.';
    }
    else {
        let userID = XSSfilter(document.querySelector('#userID').value);
        let userPW = XSSfilter(document.querySelector('#userPW').value);
        let userName = XSSfilter(document.querySelector('#userName').value);
        let joinCode = XSSfilter(document.querySelector('#joinCode').value);

        // let userData = {
        //     userID,
        //     userPW,
        //     joinCode,
        //     userName,
        // }

        $.ajax({
            url: `/users/signup`,
            data: { userID, userPW, userName, joinCode },
            type: "post",
            success: function (result) {
                if (result) {
                    console.log('sucees');
                    location.href = 'success'
                } else {
                    alertMsg.innerText = '아이디 또는 비밀번호를 확인해주세요.';
                }
            }
        });
    }
}
