const myLibrary = [];

const dialog = document.querySelector("dialog");
const cardsDiv = document.querySelector(".cards");
const submitBtn = document.querySelector(".submitButton");
const addBookBtn = document.querySelector(".addBook");
const closeBtn = document.querySelector(".closeButton");
submitBtn.addEventListener("click", () => formHandler());
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
closeBtn.addEventListener("click", () => {
  dialog.close();
})

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
  addBookToLibrary(title, author, pages, hasRead);
}

function addBookToLibrary (title, author, pages, hasRead) {
  myLibrary.push(new Book(title, author, pages, hasRead));
  displayBooks();
}

function displayBooks () {
  cardsDiv.innerHTML='';

  for (book of myLibrary) {
    const card = document.createElement("div");
    card.classList.add("card");

    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookStatus = document.createElement("p");
    const removeBtn = document.createElement("button");
    bookTitle.innerText = `Title: ${book.title}`;
    bookAuthor.innerText = `Author: ${book.author}`;
    bookPages.innerText = `Pages: ${book.pages}`;
    if (book.hasRead) {
      bookStatus.innerText = `Status: Read`;
    } else {
      bookStatus.innerText = `Status: Not Read`;
    }

    removeBtn.innerText = "Remove Book";
    removeBtn.dataset.id = `${book.id}`;

    removeBtn.addEventListener("click", () => {
      let index = 0;
      for (let book of myLibrary) {
        if (book.id === removeBtn.dataset.id) {
          console.log(`${index}: ${book.id}`)
          myLibrary.splice(index, 1);
          displayBooks();
          break;
        }
        index++;
          }
    })  

    card.dataset.id = `${book.id}`;
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookStatus);
    card.appendChild(removeBtn);
    cardsDiv.appendChild(card);
  }
}

 


