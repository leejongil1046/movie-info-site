// 좋아요 상태 초기화 및 토글 기능
async function updateLikeStatus(movieId, username) {
  try {
    // 현재 좋아요 상태 확인
    const response = await fetch(`/api/likes/${movieId}/${username}`);
    const data = await response.json();

    // 좋아요 아이콘 설정
    const likeIcon = document.querySelector("#like-label i");
    likeIcon.className = data.like
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";

    // 좋아요 토글 이벤트 리스너 추가
    likeIcon.addEventListener("click", async () => {
      const newLikeStatus = likeIcon.classList.contains("fa-regular");
      try {
        const updateResponse = await fetch(
          `/api/toggle-like/${movieId}/${username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ like: newLikeStatus }),
          }
        );

        if (updateResponse.ok) {
          likeIcon.classList.toggle("fa-regular");
          likeIcon.classList.toggle("fa-solid");
        }
        displayTotalLikes(movieId);
      } catch (error) {
        console.error("Error updating like status:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching like status:", error);
  }
}

// 좋아요 총합 표시
async function displayTotalLikes(movieId) {
  try {
    const response = await fetch(`/api/total-likes/${movieId}`);
    const data = await response.json();
    const totalLikes = data.totalLikes || 0; // 만약 값이 없다면 0으로 설정

    const totalLikeElement = document.querySelector("#total-like");
    totalLikeElement.innerHTML = `&nbsp;&nbsp;${totalLikes}`; // 공백을 추가하여 아이콘과의 간격을 조정
  } catch (error) {
    console.error("Error fetching total likes:", error);
  }
}

export { updateLikeStatus, displayTotalLikes };
