function restrictAccessToNotLoggedinUsers() {
  const likeIcon = document.querySelector("#like-label i"); // '좋아요' 아이콘 선택
  const ratingStar = document.querySelector(".rating"); // 평점 별 선택
  const submitButton = document.querySelector("#submit-review"); // 리뷰 제출 버튼 선택
  const reviewTextarea = document.querySelector("#review-text"); // 리뷰 작성 영역 선택
  const emailInput = document.querySelector("#email"); // 이메일 입력 필드 선택

  // '좋아요' 아이콘에 클릭 이벤트 리스너 추가
  likeIcon.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 행동 방지
    alert("Please log in to 'like' the movie."); // 로그인 안내 알림
    emailInput.focus(); // 이메일 입력 필드로 포커스 이동
  });

  // 평점 별에 클릭 이벤트 리스너 추가
  ratingStar.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 행동 방지
    alert("Please log in to rate the movie."); // 로그인 안내 알림
    emailInput.focus(); // 이메일 입력 필드로 포커스 이동
  });

  // 리뷰 제출 버튼에 클릭 이벤트 리스너 추가
  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 행동 방지
    alert("Please log in to submit a review."); // 로그인 안내 알림
    emailInput.focus(); // 이메일 입력 필드로 포커스 이동
  });

  // 리뷰 작성 영역 비활성화 및 안내 메시지 설정
  reviewTextarea.disabled = true;
  reviewTextarea.placeholder = "Please log in to write a review.";

  // 리뷰 제출 버튼 스타일 변경
  submitButton.style.backgroundColor = "#444";
  submitButton.style.color = "#999";
}

export { restrictAccessToNotLoggedinUsers }; // 함수를 다른 모듈에서 사용할 수 있도록 export
