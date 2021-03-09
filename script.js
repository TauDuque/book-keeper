const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookMarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const booksmarksConstainer = document.getElementById("bookmarks-container");

// show modal, primeiro input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// dados do formulário
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
}

// validar formulário
/* function validate(nameValue, urlValue) {
  const expression = 
} */

//modal event listeners
modalShow.addEventListener("click", showModal);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// event listener
bookMarkForm.addEventListener("submit", storeBookmark);
