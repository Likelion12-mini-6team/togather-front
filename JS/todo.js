
window.onload = function () {

  let today = new Date();
  const calendarBody = document.querySelector('.calendar-body');
  const prevEl = document.querySelector('.prev');
  const nextEl = document.querySelector('.next');
  let currentDate;
  
  let DATA = {
    // todolist 목록 
  }
  
  // 현재 날짜 보기 좋게 출력하는 방법
  Date.prototype.format = function () {  
    var yyyy = this.getFullYear();
    var month = (this.getMonth() + 1);
    var dd = this.getDate();
    var format = [yyyy, month, dd].join('-');
    return format;
  }
  
  Date.prototype.format2 = function () {  
    var yyyy = this.getFullYear();
    var month = (this.getMonth() + 1);
    var format = [yyyy, month].join('-');
    return format;
  }

  // 달력생성방법 

  buildCalendar();
  function buildCalendar() {
    today = new Date(today.getFullYear(),today.getMonth(),1);
    let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const headerYear = document.querySelector('.current-year-month');
    
    // 윤년 체크 
    if ((firstDate.getFullYear() % 4 === 0 && firstDate.getFullYear() % 100 !== 0) || firstDate.getFullYear() % 400 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notLeapYear;
    }
    headerYear.innerHTML = `${monthList[firstDate.getMonth()]}&nbsp;&nbsp;&nbsp;&nbsp;${today.getFullYear()}`;
    makeElement(firstDate);
    currentDateget();
  }
  
  function makeElement(firstDate) {
    let weekly = 100;
    let dateSet = 1;
    for (let i = 0; i < 6; i++) {
      let weeklyEl = document.createElement('div');
      weeklyEl.setAttribute('class', 'weekly');
      weeklyEl.setAttribute('id', `weekly-${i}`);
      for (let j = 0; j < 7; j++) {
        // i === 0이여야 하는 이유는 첫 날짜를 찍고 그 다음 날짜가 0번째 칸부터 다시 그려져야 하기 때문
        // firstDate.getMonth() => 현재 달의 일수가 몇일인지 반환해주고, 이 조건은 반환 된 값에 따라 출력해 준 후, 달력 출력 종료조건이다.
        if (i === 0 && j < firstDate.getDay() || dateSet > pageYear[firstDate.getMonth()]) {
          // 만약 해당 칸에 날짜가 없으면 div엘리먼트만 생성
          let dateEl = document.createElement('div');
          weeklyEl.appendChild(dateEl);
        } else {
          // 해당 칸에 날짜가 있으면 div엘리먼트 생성 후 해당 날짜 기입
          let dateEl = document.createElement('div');
          dateEl.textContent = dateSet;
          dateEl.setAttribute('class', `dateClass ${dateSet}`);
          dateEl.setAttribute('id', `${today.format2()}-${dateSet}`);
          weeklyEl.appendChild(dateEl);
          dateSet++;
        }
      }
      calendarBody.appendChild(weeklyEl);
    }

  

  }
  function removeCalendar() {
    let weeklyEls = document.querySelectorAll('.calendar-body .weekly');
    for (let i = 0; i < weeklyEls.length; i++) {
      weeklyEls[i].remove();
    }

}

  // 이전 달로 이동하는 함수
  prevEl.addEventListener('click', function() {
    today = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    removeCalendar();
    buildCalendar();
  });

  // 다음 달로 이동하는 함수
  nextEl.addEventListener('click', function() {
    today = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    removeCalendar();
    buildCalendar();
  }); 

  function currentDateget() {
    currentDate = today.format();
  }

  calendarBody.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dateClass')) return;
    let target = e.target;
    let eachDate = document.querySelectorAll('.calendar-body .dateClass');
    for (let i = 0; i < eachDate.length; i++) {
      eachDate[i].classList.remove('active');
    }
    target.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), target.innerHTML);
    showMain();
    currentDateget();
  });
}
 