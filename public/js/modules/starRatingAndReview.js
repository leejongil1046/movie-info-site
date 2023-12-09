let selectedRating = 0; // 선택된 별점 점수를 저장할 전역 변수
let allReviews = [];
let reviewsPerPage = 5;
let currentPage = 1;

function starRating() {
  const rating_input = document.querySelector(".rating input");
  const rating_star = document.querySelector(".rating_star");

  rating_input.addEventListener("input", () => {
    const ratingValue = rating_input.value;
    selectedRating = ratingValue; // 선택된 별점 저장
    rating_star.style.width = `${ratingValue * 10}%`;
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
  rating.style.color = "#eee";
  rating.style.fontSize = "30px";
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

function displayReviews(page) {
  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const reviewsToShow = allReviews.slice(startIndex, endIndex);

  const reviewsContainer = document.querySelector("#reviews-list");
  reviewsContainer.innerHTML = ""; // 기존 리뷰 목록 제거

  reviewsToShow.forEach((review) => {
    reviewsContainer.appendChild(review);
  });

  // 페이지네이션 업데이트
  updatePagination(allReviews.length, reviewsPerPage);
}

function addReview(reviewElement) {
  allReviews.push(reviewElement); // 리뷰 목록에 추가
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  currentPage = totalPages; // 마지막 페이지로 설정
  displayReviews(currentPage); // 리뷰 목록 업데이트
  updatePagination(allReviews.length, reviewsPerPage); // 페이지네이션 업데이트
}

function updatePagination(totalReviews, reviewsPerPage) {
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const paginationContainer = document.querySelector(
    "#reviews-pagination-container"
  );
  paginationContainer.innerHTML = ""; // 페이지네이션 초기화

  // 좌우 화살표 및 페이지 정보 추가
  paginationContainer.innerHTML = `
    <button id="prev-page"><i class="fa-solid fa-angle-left"></i></button>
    <span>${currentPage} / ${totalPages}</span>
    <button id="next-page"><i class="fa-solid fa-angle-right"></i></button>
  `;

  // 이전 페이지 버튼 이벤트 리스너
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayReviews(currentPage);
    }
  });

  // 다음 페이지 버튼 이벤트 리스너
  document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayReviews(currentPage);
    }
  });
}

function reviewContainer() {
  document
    .getElementById("review-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 폼 기본 제출 동작 방지

      const text = document.getElementById("review-text").value;
      const starRatingElement = createStarRatingElement(selectedRating);
      // 리뷰와 함께 별점 표시
      const newReview = document.createElement("p");
      newReview.appendChild(starRatingElement);

      document.getElementById("reviews-list").appendChild(newReview);

      addReview(newReview); // 새 리뷰 추가 및 표시

      // 입력 필드 초기화
      document.getElementById("review-score").value = ""; // 이 부분은 이제 필요 없을 수도 있음
      document.getElementById("review-text").value = "";
    });
}

export { starRating, reviewContainer };
