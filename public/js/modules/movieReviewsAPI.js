import {
  starRatingInput,
  createStarRatingElement,
} from "/js/modules/starRating.js";

import {
  calucAvgRating,
  resetReviewForm,
  changeButton,
} from "/js/modules/reviewUtilities.js";

let allReviews = [];
let reviewsPerPage = 4;
let currentPage = 1;

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
  let totalPages = Math.ceil(totalReviews / reviewsPerPage);
  if (totalPages === 0) totalPages = 1;
  const paginationContainer = document.querySelector(
    "#reviews-pagination-container"
  );
  paginationContainer.innerHTML = ""; // 페이지네이션 초기화

  // 좌우 화살표 및 페이지 정보 추가
  paginationContainer.innerHTML = `
    <button id="prev-review"><i class="fa-solid fa-angle-left"></i></button>
    <span>${currentPage} / ${totalPages}</span>
    <button id="next-review"><i class="fa-solid fa-angle-right"></i></button>
  `;

  // 이전 페이지 버튼 이벤트 리스너
  document.getElementById("prev-review").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayReviews(currentPage);
    }
  });

  // 다음 페이지 버튼 이벤트 리스너
  document.getElementById("next-review").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayReviews(currentPage);
    }
  });
}

function makeNewReveiw(movieId, username, rating, reviewText) {
  // 별점과 사용자 이름을 담을 컨테이너
  const topContainer = document.createElement("div");
  topContainer.style.display = "flex"; // 가로 배치
  topContainer.style.alignItems = "center"; // 세로 중앙 정렬
  topContainer.style.gap = "10px"; // 아이템 간 간격 설정

  const ratingSpan = document.createElement("span");
  ratingSpan.id = `${username}-rating`;
  ratingSpan.textContent = rating;
  ratingSpan.style.display = "none";

  // 사용자 이름 요소 생성
  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = `by ${username}`;
  usernameSpan.style.fontSize = "15px"; // 사용자 이름 크기 설정
  usernameSpan.style.marginTop = "8px";
  usernameSpan.style.color = "#999";

  // 새로운 deleteIcon 생성 및 이벤트 핸들러 추가
  const deleteIcon = document.createElement("span");
  deleteIcon.id = `${username}-delete`;
  deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteIcon.style.fontSize = "15px";
  deleteIcon.style.marginTop = "9px";
  deleteIcon.style.marginLeft = "5px";
  deleteIcon.style.color = "#eee";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.display = "none";

  deleteIcon.addEventListener("click", function (event) {
    event.preventDefault();
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      fetchDeleteReview(movieId, username);
    }
  });

  const starRatingElement = createStarRatingElement(rating);

  // 별점과 사용자 이름 컨테이너에 추가
  topContainer.appendChild(starRatingElement);
  topContainer.appendChild(ratingSpan);
  topContainer.appendChild(usernameSpan);
  topContainer.appendChild(deleteIcon);

  // 리뷰 텍스트 요소 생성
  const textDiv = document.createElement("div");
  textDiv.id = `${username}-review-text`;
  textDiv.textContent = reviewText;
  textDiv.style.fontSize = "20px"; // 텍스트 크기 설정
  textDiv.style.marginTop = "10px"; // 위쪽 여백 추가
  textDiv.style.marginBottom = "25px";

  // 최종 리뷰 컨테이너 생성
  const newReview = document.createElement("div");
  newReview.id = `${username}-review`;
  newReview.appendChild(topContainer); // 별점과 사용자 이름 컨테이너 추가
  newReview.appendChild(textDiv); // 리뷰 텍스트 추가

  // 리뷰 목록에 최종 리뷰 컨테이너 추가
  document.querySelector("#reviews-list").appendChild(newReview);

  // 새 리뷰 추가 및 표시
  addReview(newReview);

  // 입력 필드 초기화
  document.querySelector("#review-text").value = "";
}

function modifyReview(username, rating, reviewText) {
  // username을 기반으로 해당 리뷰 엘리먼트 찾기
  const reviewElement = document.querySelector(`#${username}-review`);

  if (reviewElement) {
    // 해당 리뷰 엘리먼트가 존재하는 경우 수정
    const ratingElement = reviewElement.querySelector(".rating_star");
    ratingElement.style.width = `${rating * 10}%`;

    const reviewTextElement = reviewElement.querySelector(
      `#${username}-review-text`
    );
    reviewTextElement.textContent = reviewText;

    // allReviews 배열에서 해당 리뷰 찾아서 업데이트
    const reviewIndex = allReviews.findIndex(
      (review) => review.id === `${username}-review`
    );
    if (reviewIndex !== -1) {
      const reviewToUpdate = allReviews[reviewIndex];

      // ratingSpan 요소 업데이트 (평점 정보를 저장하는 방식에 따라 변경할 수 있음)
      const ratingSpan = reviewToUpdate.querySelector('[id$="-rating"]');
      if (ratingSpan) {
        ratingSpan.textContent = rating;
      }

      // reviewText 요소 업데이트
      const reviewTextSpan = reviewToUpdate.querySelector(
        `#${username}-review-text`
      );
      if (reviewTextSpan) {
        reviewTextSpan.textContent = reviewText;
      }
    }
  }
}

function deleteUserReview(username) {
  // username을 기반으로 해당 리뷰 엘리먼트 찾기 및 삭제
  const reviewElement = document.querySelector(`#${username}-review`);
  if (reviewElement) {
    reviewElement.remove();
    // allReviews 배열에서 해당 리뷰 제거
    allReviews = allReviews.filter(
      (review) => review.id !== `${username}-review`
    );
  }

  // 현재 페이지가 총 페이지 수보다 클 경우 조정
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  if (currentPage > totalPages) {
    currentPage = totalPages > 0 ? totalPages : 1;
  }

  // 리뷰 목록 및 페이지네이션 업데이트
  displayReviews(currentPage);
  updatePagination(allReviews.length, reviewsPerPage);
}

function displayReviewsOnPage(reviews, loggedInUsername) {
  allReviews = []; // 전역 리뷰 목록 초기화

  reviews.forEach((review) => {
    makeNewReveiw(
      review.movie_id,
      review.username,
      review.rating,
      review.review
    );

    const numberOfReviews = document.querySelector("#review-title");
    numberOfReviews.textContent = `Reviews (${allReviews.length})`;

    // Check if the review belongs to the logged-in user
    if (loggedInUsername !== null && review.username === loggedInUsername) {
      const submitButton = document.querySelector("#submit-review");
      const modifyButton = document.querySelector("#modify-review");
      const deleteIcon = document.querySelector(`#${review.username}-delete`);
      if (deleteIcon) {
        submitButton.style.display = "none";
        modifyButton.style.display = "block";
        deleteIcon.style.display = "block";
      }
    }
  });

  displayReviews(1); // 첫 페이지의 리뷰를 표시
}

// 페이지 로드 시 서버에서 리뷰 데이터 가져오는 함수
async function fetchReviews(movieId, username) {
  try {
    const response = await fetch(`/api/movie/${movieId}/reviews`);
    const data = await response.json();
    if (response.ok) {
      // 리뷰 데이터를 페이지에 표시
      calucAvgRating(data.averageRating);
      if (data.reviews) displayReviewsOnPage(data.reviews, username);
      currentPage = 1;
      displayReviews(currentPage);
    } else {
      // 서버에서 오류 메시지를 반환한 경우
      console.error("Error fetching reviews. Please try again.", error);
    }
  } catch (error) {
    // 네트워크 오류나 서버 오류 발생 시
    console.error("Error fetching reviews. Please try again.", error);
  }
}

// 리뷰 제출 시 서버에 데이터 보내는 함수
async function fetchSubmitReview(movieId, username, rating, reviewText) {
  try {
    const response = await fetch(`/api/movie/review/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, username, rating, reviewText }),
    });
    const data = await response.json();

    if (response.ok) {
      calucAvgRating(data.averageRating);
      makeNewReveiw(movieId, username, rating, reviewText);
      resetReviewForm();
      changeButton(username);
      const numberOfReviews = document.querySelector("#review-title");
      numberOfReviews.textContent = `Reviews (${allReviews.length})`;
    } else {
      // 오류 응답 처리 및 로깅
      console.error("Failed to submit review.");
    }
  } catch (error) {
    // 에러 처리 및 로깅
    console.error("Something went wrong:", error);
  }
}

// 리뷰 수정 시 서버에 요청 보내는 함수
async function fetchModifyReview(movieId, username, rating, reviewText) {
  try {
    const response = await fetch(
      `/api/movie/review/${movieId}/user/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId, username, rating, reviewText }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      calucAvgRating(data.averageRating);
      modifyReview(username, rating, reviewText);
      resetReviewForm();
    } else {
      // 오류 응답 처리 및 로깅
      console.error("Network response was not ok");
    }
  } catch (error) {
    // 에러 처리 및 로깅
    console.error("Something went wrong:", error);
  }
}

// 리뷰 삭제 시 서버에 요청 보내는 함수
async function fetchDeleteReview(movieId, username) {
  try {
    // HTTP DELETE 요청을 서버에 보냄
    const response = await fetch(
      `/api/movies/review/${movieId}/user/${username}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    // 서버 응답 처리
    if (response.ok) {
      calucAvgRating(data.averageRating);
      deleteUserReview(username);
      changeButton(username);
      const numberOfReviews = document.querySelector("#review-title");
      numberOfReviews.textContent = `Reviews (${allReviews.length})`;
    } else {
      // 서버 오류 응답 처리
      console.error(`Failed to delete the review`);
    }
  } catch (error) {
    // 네트워크 오류나 서버 오류 발생 시 처리
    console.error(`Error when trying to delete rhe review:`, error);
  }
}

function reviewButtonHandler(movieId, username) {
  starRatingInput();

  const submitButton = document.querySelector("#submit-review");
  submitButton.addEventListener("click", async function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    const confirmModify = confirm(
      "Are you sure you want to submit this review?"
    );
    if (confirmModify) {
      const rating = document.querySelector(".rating input").value;
      const reviewText = document.querySelector("#review-text").value;

      await fetchSubmitReview(movieId, username, rating, reviewText);
    }
  });

  const modifyButton = document.querySelector("#modify-review");
  modifyButton.addEventListener("click", async function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    // Ask the user for confirmation to modify the review
    const confirmModify = confirm(
      "Are you sure you want to modify this review?"
    );
    if (confirmModify) {
      const rating = document.querySelector(".rating input").value;
      const reviewText = document.querySelector("#review-text").value;

      await fetchModifyReview(movieId, username, rating, reviewText);
    }
  });
}

export { fetchReviews, reviewButtonHandler };
