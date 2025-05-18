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
  dialog.querySelector("form").reset();
})

function Book (title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.changeStatus = function () {
  this.hasRead = !this.hasRead;
}

function formHandler () {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector('#pages').value;
  const hasRead = document.querySelector('#status').checked; 
  addBookToLibrary(title, author, pages, hasRead);
  dialog.querySelector("form").reset();
  dialog.close();
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
    const statusBtn = document.createElement("button");

    bookTitle.innerText = `${book.title}`;
    bookAuthor.innerText = `by ${book.author}`;
    bookPages.innerText = `${book.pages} Pages`;
    if (book.hasRead) {
      bookStatus.innerText = "Read";
      statusBtn.innerText = "Mark as Unread";
    } else {
      bookStatus.innerText = "Unread";
      statusBtn.innerText ="Mark as Read"
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

    statusBtn.dataset.id = `${book.id}`
    statusBtn.addEventListener("click", () => {
       let index = 0;
      for (let book of myLibrary) {
        if (book.id === statusBtn.dataset.id) {
          book.changeStatus();
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
    card.appendChild(statusBtn);
    card.appendChild(removeBtn);
    cardsDiv.appendChild(card);
  }
}

 


