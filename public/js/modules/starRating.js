function starRatingInput() {
  const rating_input = document.querySelector(".rating input"); // 별점 입력 필드 선택
  const rating_star = document.querySelector(".rating_star"); // 별점 표시를 위한 요소 선택

  // 별점 입력 이벤트 리스너
  rating_input.addEventListener("input", () => {
    const ratingValue = rating_input.value; // 별점 값 가져오기
    rating_star.style.width = `${ratingValue * 10}%`; // 별점 표시 업데이트
  });
}

function createStarRatingElement(ratingValue) {
  // 별점 컨테이너 생성
  const ratingBox = document.createElement("div");
  ratingBox.className = "rating_box";
  ratingBox.style.display = "flex";

  // 별점 요소 생성
  const rating = document.createElement("div");
  rating.className = "rating";
  rating.style.position = "relative";
  rating.style.color = "#444";
  rating.style.fontSize = "20px";
  rating.style.textAlign = "center";
  rating.textContent = "★★★★★"; // 기본 별점

  // 별점을 나타내는 span 요소 생성
  const ratingStar = document.createElement("span");
  ratingStar.className = "rating_star";
  ratingStar.style.width = `${ratingValue * 10}%`;
  ratingStar.style.position = "absolute";
  ratingStar.style.left = "0";
  ratingStar.style.top = "0";
  ratingStar.style.overflow = "hidden";
  ratingStar.style.whiteSpace = "nowrap";
  ratingStar.style.color = "yellow"; // 선택된 별점 색상
  ratingStar.textContent = "★★★★★"; // 선택된 별점

  // 별점 요소에 span 추가
  rating.appendChild(ratingStar);
  ratingBox.appendChild(rating);

  return ratingBox;
}

export { starRatingInput, createStarRatingElement }; // 함수들을 다른 모듈에서 사용할 수 있도록 export
