window.onload = function () {
    let today = new Date();
    const calendarBody = document.querySelector('.calendar-body');
    const prevEl = document.querySelector('.prev');
    const nextEl = document.querySelector('.next');
    let currentDate;
    let today = new Date();
    const calendarBody = document.querySelector('.calendar-body');
    const prevEl = document.querySelector('.prev');
    const nextEl = document.querySelector('.next');
    let currentDate;
  
    let DATA = {
      // todolist 목록 
    }
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
      today = new Date(today.getFullYear(), today.getMonth(), 1);
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
    Date.prototype.format2 = function () {
      var yyyy = this.getFullYear();
      var month = (this.getMonth() + 1);
      var format = [yyyy, month].join('-');
      return format;
    }
  
    // 달력생성방법 
    buildCalendar();
    function buildCalendar() {
      today = new Date(today.getFullYear(), today.getMonth(), 1);
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
          if (i === 0 && j < firstDate.getDay() || dateSet > pageYear[firstDate.getMonth()]) {
            let dateEl = document.createElement('div');
            weeklyEl.appendChild(dateEl);
          } else {
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
    prevEl.addEventListener('click', function () {
      today = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      removeCalendar();
      buildCalendar();
    });
  
    // 다음 달로 이동하는 함수
    nextEl.addEventListener('click', function () {
      today = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      removeCalendar();
      buildCalendar();
    });
  
    function currentDateget() {
      currentDate = today.format();
    }

    target.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), target.innerHTML);
    showMain();
    currentDateget();
  };

 

  
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
  
    document.addEventListener('DOMContentLoaded', function () {
      var addButton = document.getElementById('add');
      var signupForm = document.getElementById('signup');
      var userList = document.getElementById('userList');
  
      // URL에서 프로젝트 이름과 랜덤 주소 파라미터 가져오기
      var urlParams = new URLSearchParams(window.location.search);
      var randomAddress = urlParams.get('url');
      var projectName = urlParams.get('projectName');
  
      // 팀명과 URL을 이용해 사용자 목록 가져오기
      fetch(`/signup?url=${encodeURIComponent(randomAddress)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'teamName': projectName
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('User List:', data);
          data.forEach(user => {
            var userElement = document.createElement('div');
            userElement.textContent = user.name;
            userList.appendChild(userElement);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
      addButton.addEventListener('click', function (event) {
        event.preventDefault();
        signupForm.style.display = 'block';
      });
    });
  
  

