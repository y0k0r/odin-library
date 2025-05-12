const myLibrary = [];

const cardsDiv = document.querySelector(".cards");
const btn = document.querySelector("button");
btn.addEventListener("click", () => formHandler());

function Book (title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function formHandler () {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector('#pages').value;
  const hasRead = document.querySelector('#status').checked; 
  addBookToLibrary(title, author, pages, hasRead)
}

function addBookToLibrary (title, author, pages, hasRead) {
  myLibrary.push(new Book(title, author, pages, hasRead));
  console.log(myLibrary)
}

function displayBooks () {
  for (book of myLibrary) {
    const div = document.createElement("div");
    div.classList.add("card");
    cardsDiv.appendChild(div);
  }
}

