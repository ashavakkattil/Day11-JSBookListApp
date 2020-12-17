//Book Class - to store books
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}
//UI Class - to handle UI events
class UI {

    //function to display list of added books
    static displayBooks() {
        let books = [
            {
                title: 'Book 1',
                author: 'Asha',
                isbn: '12213231312'
            },
            {
                title: 'Book 2',
                author: 'Monica',
                isbn: '76876876'
            }
        ]
        books.forEach(book => {
            UI.addBook(book);
        })
    }
    //function to add a new book
    static addBook(book) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete" >X</a></td>`
        document.querySelector('#book-list').appendChild(row)
    }

    // function to remove book
    static removeBook() {
        console.log(this)
    }

    //Alert
    static showAlert(message, status) {
        const div = document.querySelector('.heading')
        const msg = document.createElement('div')
        msg.innerHTML = message
        msg.classList.add('message', status)
        div.after(msg)

        //clear after 3 seconds
        setTimeout(() => msg.remove(), 3000)
    }
}

//Store Class - for local storage

//Events

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
        UI.addBook(book)
        let message = 'Book added'
        UI.showAlert(message, 'success')
    }

})

/* Remove book */

