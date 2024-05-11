// second.js
window.onload = function() {
    var projectName = localStorage.getItem("projectName"); // 프로젝트 이름 가져오기

    // 프로젝트 이름 보여주기
    document.getElementById("projectNameDisplay").innerText = projectName;

    // 현재 URL에서 랜덤 주소 파라미터 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var randomAddress = urlParams.get('address');

    // "접속하기" 버튼에 이벤트 리스너 추가
    document.getElementById("login").addEventListener("click", function() {
        // todo.html로 넘어가면서 랜덤 주소와 함께 이동
        window.location.href = "todo.html?address=" + randomAddress + "todo";
    });
};
