
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
   
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('add');
    var signupForm = document.getElementById('signup');
    var userList = document.getElementById('userList'); // 전체 공간 아래에 위치할 유저 목록 div
  
    // URL에서 프로젝트 이름과 랜덤 주소 파라미터 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var randomAddress = urlParams.get('url');
    var projectName = urlParams.get('projectName');
  
    // 팀명과 URL을 이용해 사용자 목록 가져오기
    // todo.html이 로드될 때 GET 요청을 통해 서버에서 사용자 목록을 가져와 화면에 표시하도록 함
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
        // 데이터가 배열로 반환된다고 가정하고 사용자 목록 추가
        data.forEach(user => {
            var userElement = document.createElement('div');
            userElement.textContent = user.name;
            userList.appendChild(userElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
  
    addButton.addEventListener('click', function(event) {
        event.preventDefault(); // add 버튼의 기본 폼 제출 동작 방지
        signupForm.style.display = 'block'; // signup 폼 표시
    });
  });
  
  