document.addEventListener('DOMContentLoaded', function() {

  var addButton = document.getElementById('add');
  var signupForm = document.getElementById('signup');
  var submitTodoButton = document.getElementById('submit_todo');
  var cancelButton = document.getElementById('cancel');
  var todoInput = document.getElementById('wr_todo');
  var savedItemsContainer = document.getElementById('saved_items_container');
  var deleteButton = document.getElementById('delete');
  var isDeleting = false;
  var selectedItem = null;

  // 랜덤한 색상 생성 함수
  function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // 네모칸들의 초기 위치와 초기 테두리 색상을 저장하는 배열
  var initialPositions = [];
  var initialBorderColors = [];

  addButton.addEventListener('click', function(event) {
    event.preventDefault();
    signupForm.style.display = 'block';
  });

  submitTodoButton.addEventListener('click', function(event) {
    event.preventDefault();
    var todoText = todoInput.value.trim();
    if (todoText !== '') {
      var newDiv = document.createElement('div');
      newDiv.classList.add('saved_item');

      // 랜덤 색상 생성
      var randomColor = generateRandomColor();

      // 체크박스 추가
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'todo_checkbox';
      checkbox.value = todoText;
      checkbox.style.display = 'inline-block'; // 체크박스 표시

      // 초기 테두리 설정
      newDiv.style.border = `2px solid ${randomColor}`; // 기본 테두리 색상 설정
      newDiv.style.borderLeft = `7px solid ${randomColor}`; // 왼쪽 테두리 굵기 설정

      // 텍스트 추가
      var textNode = document.createTextNode(todoText);
      newDiv.appendChild(textNode);

      // 체크박스 추가
      newDiv.appendChild(checkbox);

      // 새로운 네모칸을 saved_items_container에 추가
      savedItemsContainer.appendChild(newDiv); // 맨 아래에 추가

      // 네모칸의 초기 위치와 초기 테두리 색상 저장
      initialPositions.push({ element: newDiv, initialIndex: initialPositions.length });
      initialBorderColors.push(randomColor);

      todoInput.value = '';
      signupForm.style.display = 'none';
    }
  });

  cancelButton.addEventListener('click', function(event) {
    event.preventDefault();
    todoInput.value = ''; // 입력 필드 초기화
    signupForm.style.display = 'none';
  });

  deleteButton.addEventListener('click', function(event) {
    event.preventDefault();
    // 삭제 버튼에 클래스 추가
    deleteButton.classList.add('delete-selected');
    isDeleting = true;
    // 네모칸에 삭제 모드 클래스 추가
    var savedItems = document.querySelectorAll('.saved_item');
    savedItems.forEach(function(item) {
      item.classList.add('delete-mode');
      item.style.border = '2px solid red';
      item.style.borderLeft = '7px solid red'
      // 체크박스 비활성화
      var checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.disabled = true;
      }
    });
  });

  savedItemsContainer.addEventListener('click', function(event) {
    if (!isDeleting && event.target.classList.contains('saved_item')) {
      selectedItem = event.target;
      var todoText = selectedItem.textContent.trim();

      // 기존 텍스트를 입력 상자로 대체
      var editInput = document.getElementById('edit_todo_input');
      editInput.value = todoText;

      // 폼 표시
      var editForm = document.getElementById('edit_form');
      editForm.style.display = 'block';

      // 입력 상자에 포커스 설정
      editInput.focus();

      // 수정 버튼 클릭 시
      var editButton = editForm.querySelector('#edit_todo');
      editButton.addEventListener('click', function() {
        var newText = editInput.value.trim();
        if (newText !== '') {
          selectedItem.textContent = newText;

          // 체크박스가 이미 있으면 추가하지 않음
          var checkbox = selectedItem.querySelector('input[type="checkbox"]');
          if (!checkbox) {
            // 체크박스 추가
            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'todo_checkbox';
            checkbox.value = newText;
            checkbox.style.display = 'inline-block'; // 체크박스 표시
            selectedItem.appendChild(checkbox);
          } else {
            // 체크박스를 다시 보이게 함
            checkbox.hidden = false;
          }

          editForm.style.display = 'none';
        }
      });

      // 취소 버튼 클릭 시
      var cancelButton2 = editForm.querySelector('#cancel2');
      cancelButton2.addEventListener('click', function() {
        editForm.style.display = 'none';
      });
    }
  });

  savedItemsContainer.addEventListener('click', function(event) {
    if (isDeleting && event.target.classList.contains('saved_item')) {
      selectedItem = event.target;
      var deleteConfirmation = confirm('정말로 삭제하시겠습니까?');
      if (deleteConfirmation) {
        savedItemsContainer.removeChild(selectedItem);
      }
      isDeleting = false;
      selectedItem = null;
      // 삭제 버튼 클래스 제거
      deleteButton.classList.remove('delete-selected');
      // 네모칸에 삭제 모드 클래스 제거
      var savedItems = document.querySelectorAll('.saved_item');
      savedItems.forEach(function(item, index) { // index 매개변수 추가
        item.classList.remove('delete-mode');
        // 초기 테두리 스타일 복원
        item.style.border = `2px solid ${initialBorderColors[index]}`;
        item.style.borderLeft = `7px solid ${initialBorderColors[index]}`;
        var checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.disabled = false;
        }
      });
    }
  });

  savedItemsContainer.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox' && !isDeleting) {
      var parentDiv = event.target.parentElement;
      if (event.target.checked) {
        // 선택한 네모칸을 가장 아래로 이동
        parentDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
        savedItemsContainer.appendChild(parentDiv);
      } else {
        // 체크박스를 해제하면 초기 위치로 이동
        parentDiv.style.backgroundColor = 'transparent';
        initialPositions.forEach(function(item) {
          if (item.element === parentDiv) {
            savedItemsContainer.insertBefore(parentDiv, savedItemsContainer.children[item.initialIndex]);
          }
        });
      }
    }
  });

  const calendarBody = document.querySelector('.calendar-body');
  const prevEl = document.querySelector('.prev');
  const nextEl = document.querySelector('.next');
  let today = new Date();
  let currentDate;

  
  // 현재 날짜 보기 좋게 출력하는 방법
  Date.prototype.format = function () {  
    var yyyy = this.getFullYear();
    var month = (this.getMonth() + 1);
    var dd = this.getDate();
    var format = [yyyy, month, dd].join('-');
    return format;
  };
  
  Date.prototype.format2 = function () {  
    var yyyy = this.getFullYear();
    var month = (this.getMonth() + 1);
    var format = [yyyy, month].join('-');
    return format;
  };

  // 달력생성방법 
  function buildCalendar() {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const headerYear = document.querySelector('.current-year-month');
    
    // 윤년 체크 
    const pageYear = ((firstDayOfMonth.getFullYear() % 4 === 0 && firstDayOfMonth.getFullYear() % 100 !== 0) || firstDayOfMonth.getFullYear() % 400 === 0) ? leapYear : notLeapYear;

    headerYear.innerHTML = `${monthList[firstDayOfMonth.getMonth()]}&nbsp;&nbsp;&nbsp;&nbsp;${today.getFullYear()}`;
    makeElement(firstDayOfMonth, pageYear);
    currentDateget();
    selectToday(); // 여기서 selectToday 함수 호출
  }
  
  function makeElement(firstDayOfMonth, pageYear) {
    let dateSet = 1;
    for (let i = 0; i < 6; i++) {
      let weeklyEl = document.createElement('div');
      weeklyEl.setAttribute('class', 'weekly');
      weeklyEl.setAttribute('id', `weekly-${i}`);
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth.getDay() || dateSet > pageYear[firstDayOfMonth.getMonth()]) {
          let dateEl = document.createElement('div');
          weeklyEl.appendChild(dateEl);
        } else {
          let dateEl = document.createElement('div');
          dateEl.textContent = dateSet;
          dateEl.setAttribute('class', `dateClass ${dateSet}`);
          dateEl.setAttribute('id', `${firstDayOfMonth.format2()}-${dateSet}`);
          weeklyEl.appendChild(dateEl);
          dateSet++;
        }
      }
      calendarBody.appendChild(weeklyEl);
    }
  }

  function selectToday() {
    const todayFormatted = new Date().format(); // 현재 날짜를 다시 불러옵니다.
    const todayElement = document.getElementById(todayFormatted);
    if (todayElement) {
      todayElement.classList.add('active');
    }
  }

  function removeCalendar() {
    const weeklyEls = document.querySelectorAll('.calendar-body .weekly');
    for (const weeklyEl of weeklyEls) {
      weeklyEl.remove();
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
    const target = e.target;
    const eachDate = document.querySelectorAll('.calendar-body .dateClass');
    for (const date of eachDate) {
      date.classList.remove('active');
    }
    target.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), target.innerHTML);
    showMain();
    currentDateget();
  });

  // URL에서 프로젝트 이름과 랜덤 주소 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const randomAddress = urlParams.get('url');
  const projectName = urlParams.get('projectName');
  const userList = document.getElementById('userList'); // 전체 공간 아래에 위치할 유저 목록 div

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
          const userElement = document.createElement('div');
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

  function showMain() {
    // TODO: 메인 콘텐츠 표시 함수 구현
  }

  // 초기 달력 생성
  buildCalendar();
});
