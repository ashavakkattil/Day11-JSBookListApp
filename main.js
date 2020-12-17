//Book Class - to store books
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//Store Class - for local storage. Local storage stores items as strings and not as objects 
//so everytime we save the json we need to stringy it and while retrieving we need to parse the string 
//back to json
class Store {
    static getBooks() {
        let books
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static addBook(book) {
        let books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn) {
        let books = Store.getBooks()
        books.forEach((b, index) => {
            if (b.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}


//UI Class - to handle UI events
class UI {

    static displayBooks() {
        const books = Store.getBooks()
        books.forEach(book => {
            UI.addBookToList(book);
        })
    }
    static addBookToList(book) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete" >X</a></td>`
        document.querySelector('#book-list').appendChild(row)
        UI.clearFields()
    }

    static removeBook(e) {
        if (e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
            let message = 'Book removed'
            UI.showAlert(message, 'success')
        }
    }

    static showAlert(message, status) {
        const div = document.querySelector('.heading')
        const msg = document.createElement('div')
        msg.innerHTML = message
        msg.classList.add('message', status)
        div.after(msg)

        //clear after 3 seconds
        setTimeout(() => msg.remove(), 3000)
    }
    static clearFields() {
        document.querySelector("#title").value = ''
        document.querySelector("#author").value = ''
        document.querySelector("#isbn").value = ''
    }
}

/* Display all the books that have been added, on document load */
document.addEventListener('DOMContentLoaded', UI.displayBooks)

/* Add new book  */
document.querySelector("#my-form").addEventListener('submit', (e) => {
    e.preventDefault()
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let isbn = document.querySelector("#isbn").value
    let book = new Book(title, author, isbn)
    if (title === '' || author === '' || isbn === '') {
        let message = 'Please fill all the fields'
        UI.showAlert(message, 'error')
    } else {
        UI.addBookToList(book)
        Store.addBook(book);
        let message = 'Book added'
        UI.showAlert(message, 'success')
    }

})

/* Remove book */
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
})