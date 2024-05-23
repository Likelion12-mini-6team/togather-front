document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('add');
    var signupForm = document.getElementById('signup');
    var userList = document.getElementById('userList'); // 전체 공간 아래에 위치할 유저 목록 div

    // 로컬 스토리지에서 유저 이름 가져오기
    var userName = localStorage.getItem("userName");

    // 유저 이름을 사이드바의 유저 목록에 추가
    if (userName) {
        var userElement = document.createElement('div');
        userElement.textContent = userName;
        userList.appendChild(userElement);
    }

    addButton.addEventListener('click', function(event) {
        event.preventDefault(); // add 버튼의 기본 폼 제출 동작을 방지
        signupForm.style.display = 'block'; // signup 폼을 표시
    });
});
