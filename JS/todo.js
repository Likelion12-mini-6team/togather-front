document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.getElementById('add');
  var signupForm = document.getElementById('signup');

  addButton.addEventListener('click', function(event) {
      event.preventDefault(); // add 버튼의 기본 폼 제출 동작을 방지
      signupForm.style.display = 'block'; // signup 폼을 표시
  });
});