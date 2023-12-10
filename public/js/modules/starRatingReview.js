let selectedRating = 0; // 선택된 별점 점수를 저장할 전역 변수
let allReviews = [];
let reviewsPerPage = 4;
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

function reviewContainer(username) {
  document
    .getElementById("review-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 폼 기본 제출 동작 방지
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const text = document.getElementById("review-text").value;
      // const username = `by username (${formattedDateTime})`;
      const starRatingElement = createStarRatingElement(selectedRating);

      // 별점과 사용자 이름을 담을 컨테이너
      const topContainer = document.createElement("div");
      topContainer.style.display = "flex"; // 가로 배치
      topContainer.style.alignItems = "center"; // 세로 중앙 정렬
      topContainer.style.gap = "10px"; // 아이템 간 간격 설정

      // 사용자 이름 요소 생성
      const usernameSpan = document.createElement("span");
      usernameSpan.textContent = `by ${username} (${formattedDateTime})`;
      // usernameSpan.textContent = username;
      usernameSpan.style.fontSize = "15px"; // 사용자 이름 크기 설정
      usernameSpan.style.marginTop = "8px";

      const deleteIcon = document.createElement("span");
      deleteIcon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      deleteIcon.style.fontSize = "15px";
      deleteIcon.style.marginTop = "11px";
      deleteIcon.style.marginLeft = "5px";
      deleteIcon.style.color = "red";

      // 별점과 사용자 이름 컨테이너에 추가
      topContainer.appendChild(starRatingElement);
      topContainer.appendChild(usernameSpan);
      topContainer.appendChild(deleteIcon);

      // 리뷰 텍스트 요소 생성
      const textDiv = document.createElement("div");
      textDiv.textContent = text;
      textDiv.style.fontSize = "20px"; // 텍스트 크기 설정
      textDiv.style.marginTop = "10px"; // 위쪽 여백 추가
      textDiv.style.marginBottom = "25px";

      // 최종 리뷰 컨테이너 생성
      const newReview = document.createElement("div");
      newReview.appendChild(topContainer); // 별점과 사용자 이름 컨테이너 추가
      newReview.appendChild(textDiv); // 리뷰 텍스트 추가

      // 리뷰 목록에 최종 리뷰 컨테이너 추가
      document.getElementById("reviews-list").appendChild(newReview);

      // 새 리뷰 추가 및 표시
      addReview(newReview);

      // 입력 필드 초기화
      document.getElementById("review-text").value = "";
    });
}

export { starRating, reviewContainer };
