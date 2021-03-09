const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const booksmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// show modal, primeiro input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// construindo bookmarks DOM
function buildBookmarks() {
  // remover elementos
  booksmarksContainer.textContent = "";
  // criando items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // item
    const item = document.createElement("div");
    item.classList.add("item");
    // fechar ícone
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBoomark('${url}')`);
    // Favicon container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // colocando no container bookmarks
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    booksmarksContainer.appendChild(item);
  });
}

// fetch bookmarks
function fetchBookmarks() {
  //pegar bookmarks em local storage se disponíveis
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    //criar array de bookmarks no local storage
    bookmarks = [
      {
        name: "Tau Ribas",
        url: "https://jovemnerd.com.br",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// deletar items
function deleteBoomark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // atualizar bookmarks array e DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// dados do formulário
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// validar formulário
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Por favor, preencha os dois campos");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("por favor, insira um endereço válido");
    return false;
  }
  return true;
}

//modal event listeners
modalShow.addEventListener("click", showModal);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// event listener
bookmarkForm.addEventListener("submit", storeBookmark);

// ao carregar a página, rodar o fetch
fetchBookmarks();
