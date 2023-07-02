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
    // .then(books => {
    //     if (gFilterBy.txt) {
    //         const regex = new RegExp(gFilterBy.txt, 'i')
    //         books = books.filter(book => regex.test(book.vendor))
    //     }
    //     if (gFilterBy.minSpeed) {
    //         books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
    //     }
    //     if (gPageIdx !== undefined) {
    //         const startIdx = gPageIdx * PAGE_SIZE
    //         books = books.slice(startIdx, startIdx + PAGE_SIZE)
    //     }
    //     if (gSortBy.maxSpeed !== undefined) {
    //         books.sort((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed)
    //     } else if (gSortBy.vendor !== undefined) {
    //         books.sort((c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor)
    //     }

    //     return books
    // })
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
        description: '',
        thumbnail: '',
        listPrice: {
            amount: price,
            currencyCode: '',
            isOnSale: false
        }
    }

}

function getFilterBy() {
    return { ...gFilterBy }
}

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

// function getBookCountBySpeedMap() {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             const bookCountBySpeedMap = books.reduce((map, book) => {
//                 if (book.maxSpeed < 120) map.slow++
//                 else if (book.maxSpeed < 200) map.normal++
//                 else map.fast++
//                 return map
//             }, { slow: 0, normal: 0, fast: 0 })
//             return bookCountBySpeedMap
//         })
// }

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