// main.js
document.getElementById("createTodoList").addEventListener("click", function() {
    var projectName = document.getElementById("projectName").value;

    // 프로젝트 이름 저장
    localStorage.setItem("projectName", projectName);

    // 랜덤 주소 생성
    var randomAddress = Math.random().toString(36).substring(2, 15);

    // second.html로 넘어가면서 랜덤 주소 포함
    window.location.href = "second.html?" + randomAddress;
});
