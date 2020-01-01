/* Настройка табов */

const toReadBtn        = document.querySelector(".toggles__btn--to-read");
const toReadContainer  = document.querySelector(".to-read-container");
const archiveBtn       = document.querySelector(".toggles__btn--archive");
const archiveContainer = document.querySelector(".archive-container");
const togglesBtns      = document.querySelectorAll(".toggles__btn");

for (let toogleBtn of togglesBtns) {
    toogleBtn.onclick = function() {
        for (let toggleRemove of togglesBtns) {
            toggleRemove.classList.remove("toggles__btn--active");
        }
        toogleBtn.classList.add("toggles__btn--active");
        if (toReadBtn.classList.contains("toggles__btn--active")) {
            toReadContainer.classList.remove("invisible");
            archiveContainer.classList.add("invisible");
        }
        if (archiveBtn.classList.contains("toggles__btn--active")) {
            archiveContainer.classList.remove("invisible");
            toReadContainer.classList.add("invisible");
        }
    }
}

/* Отрисовка списка книг из массива */

let toReadList = [];

const toReadTable = function() {
    const booksContainer = document.querySelector(".books-container");
    let bookItem = "";
    for (let i = 0; i < toReadList.length; i++) {
        let counterId = i+1;
        bookItem += 
            `<div class='book' draggable='true' id='book${counterId}'>
                <div class='book__drag-block'>
                    <i class='book__drag-icon fas fa-grip-lines'></i>
                </div>
                <div class='book-description'>
                    <h2 class='book-description__title'>${toReadList[i].name}</h2>
                    <p class='book-description__text'>${toReadList[i].description}</p>
                </div>
                <button class='book__read-btn button' data-book-name='${toReadList[i].name}'>Прочитано</button>
            </div>`
    }
    booksContainer.innerHTML = bookItem;
    alreadyRead();
}

/* Добавление новой книги с список */

const newBook = function(newBookName, newBookDescription) {
    const newBookItem = {
        name: newBookName,
        description: newBookDescription,
    }
    return newBookItem;
}

const addBtn          = document.querySelector(".book-add__btn");
const bookName        = document.getElementById("book-add__name");
const bookDescription = document.getElementById("book-add__description");

addBtn.onclick = function(event) {
    if (bookName.value.length > 0 && bookDescription.value.length > 0) {
        event.preventDefault();

        toReadList.push(newBook(bookName.value, bookDescription.value));
        toReadTable();

        bookName.value = "";
        bookDescription.value = "";
    }
}

/* Удаление книги из списка и добавление в архив */

let archiveList = [];

const alreadyRead = function() {
    const removeBtns = document.querySelectorAll(".book__read-btn");
    for (let removeBtn of removeBtns) {
        removeBtn.onclick = function(event) {
            event.preventDefault();
            const removeBookName = removeBtn.getAttribute("data-book-name");
            for (let i = 0; i < toReadList.length; i++) {
                if (removeBookName === toReadList[i].name) {
                    archiveList.push(toReadList[i]);
                    toReadList.splice(i, 1);
                }
            }
            toReadTable();
            archiveTable();
        }
    }
}

/* Отрисовка архива книг из массива */

const archiveTable = function() {
    const booksArchiveContainer = document.querySelector(".archive-books");
    let bookArchiveItem = "";
    if (archiveList.length === 0) {
        const noBook = `<p><br>Пока что прочитанных книг нет</p>`;
        booksArchiveContainer.innerHTML = noBook;
    } else {
        for (let book of archiveList) {
            bookArchiveItem +=
                `<div class='book-description book-description--archive'>
                    <h2 class='book-description__title'>${book.name}</h2>
                    <p class='book-description__text'>${book.description}</p>
                </div>`
        }
        booksArchiveContainer.innerHTML = bookArchiveItem;
    }
}
archiveTable();

/* Drag'n'Drop книг в списке */

let isFirstDrop = false;

document.ondragstart = function(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

document.ondragenter = function(event) {
    event.preventDefault();
    const first = document.querySelector(".books-container").firstElementChild;

    const isFirstElementAbove = event.pageY < first.getBoundingClientRect().y;
    const isTargetFirstElement = first === event.target;

    if (isFirstElementAbove && isTargetFirstElement && event.target.classList.contains("book")) {
        event.target.classList.add("book--drag-target-first");
        isFirstDrop = true;
    } else if (event.target.classList.contains("book")) {
        event.target.classList.add("book--drag-target");
        isFirstDrop = false;
    }
}

document.ondragleave = function(event) {
    event.target.classList.remove("book--drag-target");
    event.target.classList.remove("book--drag-target-first");
}

document.ondragover = function(event) {
    if (event.target.classList.contains("book")) {
        event.preventDefault();
    };
    event.dataTransfer.dropEffect = "copy";
}

document.ondrop = function(event) {
    event.preventDefault();
    event.target.classList.remove("book--drag-target");
    event.target.classList.remove("book--drag-target-first");

    const data = event.dataTransfer.getData("text/plain");
    const book = document.getElementById(data);

    book.classList.add("drag-start");
    book.classList.remove("drag-start");

    if (isFirstDrop) {
        event.target.before(book);
        isFirstDrop = false;
    } else {
        event.target.after(book);
    }
}