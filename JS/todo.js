

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
