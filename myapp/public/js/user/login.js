const userID = document.querySelector('.userID');
const userPW = document.querySelector('.userPW');

// 전역변수
// 지역변수

const displayCheckID = document.querySelector('.checkID');



function checkID(e) {
    let regType1 = /^[A-Za-z0-9+]{5,20}$/;

    if (!(regType1.test(e.value)) && (e.value.length < 5 || e.value.length > 15)) {
        return;
    } else {
        //ajax로 존재하는 아이디인지 확인
        if (true) {
            displayCheckID.textContent = '이미 사용 중인 아이디입니다.';
        } else { }
    }
}

userPW.addEventListener("keydown", (e) => {
    if (e.value == 'e') {
        console.log('he');
    } else { }
});