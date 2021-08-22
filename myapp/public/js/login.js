const userID = document.querySelector('.userID');
const userPW = document.querySelector('.userPW');

var regType1 = /^[A-Za-z0-9+]*$/; 

function handleOnInput(e)  {
    e.value = e.value.replace(/[^A-Za-z0-9]/ig, '')
  }
function checkID(e)  {
    let regType1 = /^[A-Za-z0-9+]*$/; 
  if (regType1.test(e.value) && (e.value.length < 5 || e.value.length > 15)) { alert('아이디가 조건에 맞지 않습니다'); }
  console.log(regType1, e.value);
  }
userID.addEventListener("onmouseout", (e)=> {
    console.log('hell');
});
userPW.addEventListener("keydown", (e)=> {
    if(e.value == 'e') console.log('he');
});