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

export { calucAvgRating, resetReviewForm, changeButton };
