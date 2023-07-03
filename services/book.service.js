import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import booksJson from '../assets/json/books.json' assert {type: 'json'};

const BOOK_KEY = 'bookDB'

var gFilterBy = { txt: '', minSpeed: 0 }
// var gSortBy = { vendor: 1 }
// var gPageIdx

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    // setFilterBy,
}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0) {
    return {
    id: '',
    title,
    subtitle: '',
    authors: [],
    publishedDate: 0,
    description: '',
    pageCount: 0,
    categories: [],
    thumbnail: 'http://coding-academy.org/books-photos/17.jpg',
    language: 'sp',
    listPrice: {
      amount: price,
      currencyCode: 'USD',
      isOnSale: true
    }
  }

}

function getFilterBy() {
    return { ...gFilterBy }
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksJson
        // books.push(_createBook('Harry Potter', 300))
        // books.push(_createBook('Lord of the Rings', 120))
        // books.push(_createBook('Pride and Prejudice', 100))
        // books.push(_createBook('The Great Gatsby', 150))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price = 250) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}