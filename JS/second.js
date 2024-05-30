window.onload = function () {
  var projectName = localStorage.getItem("projectName"); // 프로젝트 이름 가져오기

  // 프로젝트 이름을 표시할 요소 찾기
  var projectNameDisplay = document.getElementById("projectNameDisplay");

  // 프로젝트 이름이 null이 아니라면
  if (projectNameDisplay) {
    // 프로젝트 이름 보여주기
    projectNameDisplay.innerText = projectName;
  }

  // 여기부터 회원가입/로그인 API 코드
  // 현재 URL에서 랜덤 주소 파라미터 가져오기
  var urlParams = new URLSearchParams(window.location.search);
  var randomAddress = urlParams.get("url");

  // "접속하기" 버튼에 이벤트 리스너 추가하여 버튼 클릭 시 서버와 통신
  var loginButton = document.getElementById("login");

  // 이름 입력값이 null인지 확인
  if (loginButton) {
    loginButton.addEventListener("click", function () {
      var userName = document.getElementById("userName").value;
      var userPassword = document.getElementById("userPassword").value;

      // 이름 입력하지 않으면 alert 띄우기
      if (!userName) {
        alert("이름을 입력해주세요.");
        return;
      }

      // 요청할 데이터
      var requestData = {
        id: userName,
        password: userPassword || "", // 입력한 비밀번호가 없으면 빈 문자열로 설정
        url: randomAddress,
      };

      const baseURL = "https://localhost/signup"; //실제 API의 url로 변경해야함

      // 데이터가 올바르게 생성되었는지 확인
      console.log("Request Data:", requestData);

      // 서버로 POST 요청 보내기
      fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          // 요청이 성공하면 todo.html로 이동
          window.location.href = `todo.html?url=${randomAddress}&projectName=${projectName}`;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
  //API 코드 끝.
};
