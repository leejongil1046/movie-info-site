// let selectedRating = 0; // 선택된 별점 점수를 저장할 전역 변수
let allReviews = [];
let reviewsPerPage = 4;
let currentPage = 1;

function starRating() {
  const rating_input = document.querySelector(".rating input");
  const rating_star = document.querySelector(".rating_star");

  rating_input.addEventListener("input", () => {
    const ratingValue = rating_input.value;
    // selectedRating = ratingValue; // 선택된 별점 저장
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
  let totalPages = Math.ceil(totalReviews / reviewsPerPage);
  if (totalPages === 0) totalPages = 1;
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

  const deleteIcon = document.createElement("span");
  deleteIcon.id = `${username}-delete`;
  deleteIcon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteIcon.style.fontSize = "15px";
  deleteIcon.style.marginTop = "11px";
  deleteIcon.style.marginLeft = "5px";
  deleteIcon.style.color = "red";
  deleteIcon.style.display = "none";
  deleteIcon.addEventListener("click", async function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    await deleteReview(movieId, username);
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

function updateReview(username, rating, reviewText) {
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
  // username을 기반으로 해당 리뷰 엘리먼트 찾기
  const reviewElement = document.querySelector(`#${username}-review`);
  console.log(reviewElement);
  if (reviewElement) {
    // 해당 리뷰 엘리먼트가 존재하는 경우 수정
    reviewElement.remove();

    // allReviews 배열에서 해당 리뷰 제거
    allReviews = allReviews.filter(
      (review) => review.id !== `${username}-review`
    );
  }
}

// 가져온 리뷰 데이터로 페이지에 리뷰 목록을 표시하는 함수
function displayReviewsOnPage(reviews) {
  allReviews = []; // 전역 리뷰 목록 초기화
  reviews.forEach((review) => {
    makeNewReveiw(
      review.movieId,
      review.username,
      review.rating,
      review.review
    );
  });
  displayReviews(1); // 첫 페이지의 리뷰를 표시
}

function modifyAvgRating() {
  let totalRating = 0;
  let avgRating = 0;

  // allReviews 배열을 순회하며 각 리뷰의 평점 합산
  allReviews.forEach((reviewElement) => {
    // ratingSpan에서 평점을 가져옴
    const ratingSpan = reviewElement.querySelector('[id$="-rating"]'); // id가 '-rating'으로 끝나는 요소
    const ratingValue = parseFloat(ratingSpan.textContent); // 평점 값을 숫자로 변환
    totalRating += ratingValue;
  });

  // 평균 평점 계산
  if (allReviews.length > 0) {
    avgRating = totalRating / allReviews.length;
  }

  // 소수점 둘째 자리까지 반올림
  avgRating = avgRating.toFixed(1);

  // 평균 평점을 표시할 엘리먼트 찾기 및 업데이트
  const avgRatingElement = document.querySelector("#avg-rating");
  if (avgRatingElement) {
    avgRatingElement.innerHTML = `&nbsp;&nbsp;${avgRating}/10`;
  }
}

function calucAvgRating(avgRating) {
  let newAvgRating = 0;

  // avgRating이 숫자 타입인지 확인하고, 숫자가 아닌 경우 숫자로 변환
  const parsedAvgRating =
    typeof avgRating === "number" ? avgRating : parseFloat(avgRating);

  if (parsedAvgRating === 0) {
    newAvgRating = 0; // 정확히 0인 경우
  } else {
    newAvgRating = parseFloat(parsedAvgRating.toFixed(1)); // 소수점 첫 번째 자리까지 반올림
  }

  const avgRatingElement = document.querySelector("#avg-rating");
  avgRatingElement.innerHTML = `&nbsp;&nbsp;${newAvgRating}/10`;
}

// 페이지 로드 시 서버에서 리뷰 데이터 가져오는 함수
async function fetchReviews(movieId) {
  try {
    const response = await fetch(`/api/movie/${movieId}/reviews`);
    const data = await response.json();
    if (response.ok) {
      // 리뷰 데이터를 페이지에 표시
      calucAvgRating(data.averageRating);
      if (data.reviews) displayReviewsOnPage(data.reviews);
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
async function submitReview(movieId, username, rating, reviewText) {
  try {
    const response = await fetch(`/api/movie/review/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, username, rating, reviewText }),
    });

    if (response.ok) {
      console.log("Before submit = ", allReviews);
      makeNewReveiw(movieId, username, rating, reviewText);
      modifyAvgRating();
      resetReviewForm();
      changeButton(username);
      console.log("After submit = ", allReviews);
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
async function modifyReview(movieId, username, rating, reviewText) {
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

    if (response.ok) {
      console.log("Before modify = ", allReviews);
      updateReview(username, rating, reviewText);
      modifyAvgRating();
      resetReviewForm();
      console.log("After modify = ", allReviews);
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
async function deleteReview(movieId, username) {
  try {
    // HTTP DELETE 요청을 서버에 보냄
    const response = await fetch(
      `/api/movies/review/${movieId}/user/${username}`,
      {
        method: "DELETE",
      }
    );

    // 서버 응답 처리
    if (response.ok) {
      console.log("Before delete = ", allReviews);
      deleteUserReview(username);
      modifyAvgRating();
      changeButton(username);
      console.log("After modify = ", allReviews);
      // 성공적으로 삭제된 경우, 페이지에서 해당 리뷰를 제거하거나 사용자에게 알림
      // console.log(`The review has been successfully deleted.`);
    } else {
      // 서버 오류 응답 처리
      console.error(`Failed to delete the review`);
    }
  } catch (error) {
    // 네트워크 오류나 서버 오류 발생 시 처리
    console.error(`Error when trying to delete rhe review:`, error);
  }
}

function resetReviewForm() {
  // 별점 입력창 초기화 (예시로 '.rating input' 선택자 사용)
  const ratingInput = document.querySelector(".rating input");
  if (ratingInput) {
    ratingInput.value = 0;
    const ratingStar = document.querySelector(".rating_star");
    if (ratingStar) {
      ratingStar.style.width = `0%`;
    }
  }

  // 텍스트 입력창 초기화 (예시로 '#review-text' ID 사용)
  const reviewTextInput = document.querySelector("#review-text");
  if (reviewTextInput) {
    reviewTextInput.value = "";
  }
}

function changeButton(username) {
  const submitButton = document.querySelector("#submit-review");
  const modifyButton = document.querySelector("#modify-review");
  const deleteIcon = document.querySelector(`#${username}-delete`);
  if (deleteIcon) {
    submitButton.style.display = "none";
    modifyButton.style.display = "block";
    deleteIcon.style.display = "block";
  } else {
    submitButton.style.display = "block";
    modifyButton.style.display = "none";
  }
}

function reviewContainer(movieId, username) {
  const submitButton = document.querySelector("#submit-review");
  submitButton.addEventListener("click", async function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    const rating = document.querySelector(".rating input").value;
    const reviewText = document.querySelector("#review-text").value;

    await submitReview(movieId, username, rating, reviewText);
  });

  const modifyButton = document.querySelector("#modify-review");
  modifyButton.addEventListener("click", async function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    const rating = document.querySelector(".rating input").value;
    const reviewText = document.querySelector("#review-text").value;

    await modifyReview(movieId, username, rating, reviewText);
  });

  const deleteIcon = document.querySelector(`#${username}-delete`);
  if (deleteIcon) {
    submitButton.style.display = "none";
    modifyButton.style.display = "block";
    deleteIcon.style.display = "block";
    deleteIcon.addEventListener("click", async function (event) {
      event.preventDefault(); // 폼 기본 제출 동작 방지

      await deleteReview(movieId, username);
    });
  }
}

export { fetchReviews, starRating, reviewContainer };
