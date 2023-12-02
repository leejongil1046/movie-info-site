// 검색 기능, 댓글 기능 등에 필요한 JavaScript 코드
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".search-container button");
  searchButton.addEventListener("click", function () {
    const searchTerm = document.querySelector(".search-container input").value;
    console.log(`검색어: ${searchTerm}`);
    // 검색 기능 구현
  });
});
