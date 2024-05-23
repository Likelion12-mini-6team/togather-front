document.getElementById("createTodoList").addEventListener("click", function() {
    var projectName = document.getElementById("projectName").value;

    // 프로젝트 이름을 입력하지 않으면 alert 띄우기
    if (!projectName) {
        alert("프로젝트 이름을 입력해주세요.");
        return;
    }

    // 프로젝트 이름 저장
    localStorage.setItem("projectName", projectName);

    // 랜덤 주소 생성
    var randomAddress = Math.random().toString(36).substring(2, 15);

    // 요청할 데이터
    var requestData = {
        teamName: projectName,
        url: randomAddress
    };

    // 데이터가 올바르게 생성되었는지 확인
    console.log('Request Data:', requestData);

    // 서버로 POST 요청 보내기 (서버 요청 없이 페이지 넘기려면 이 부분 주석 처리 해야함)
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // 요청이 성공하면 second.html로 이동
        window.location.href = "second.html?url=" + randomAddress;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

    //서버 요청 없이도 세컨드 페이지로 이동하는 코드 (테스트용)
    // setTimeout(() => {
    //     window.location.href = "second.html?url=" + randomAddress;
    // }, 5000); // 5초 딜레이 후 이동 (콘솔 출력 확인용)
});
