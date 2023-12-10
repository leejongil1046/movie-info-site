function restrictAccessToNotLoggedinUsers() {
  const likeIcon = document.querySelector("#like-label i");
  const ratingStar = document.querySelector(".rating");
  const submitButton = document.querySelector("#submit-review");
  const reviewTextarea = document.querySelector("#review-text");
  const emailInput = document.querySelector("#email");

  likeIcon.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action
    alert("Please log in to like movies.");
    emailInput.focus();
  });

  ratingStar.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action
    alert("Please log in to rate movies.");
    emailInput.focus();
  });

  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action
    alert("Please log in to submit reviews.");
    emailInput.focus();
  });

  reviewTextarea.disabled = true;
  reviewTextarea.placeholder = "Please log in to write a review.";
}

export { restrictAccessToNotLoggedinUsers };
