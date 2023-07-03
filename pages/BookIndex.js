import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

export default {
    template: `
        <section class="book-index">
            <BookFilter @filter="setFilterBy"/>
            <BookList 
                :books="filteredBooks"
                @remove="removeBook"/>
        </section>
    `,

    data() {
        return {
            books: [],
            filterBy: null
        }
    },

    computed: {
        filteredBooks() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.books.filter(book => regex.test(book.title))
        }
    },

    created() {
        bookService.query()
            .then(books => this.books = books)
    },

    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)    
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg('book removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove book')
                })
        },

        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },

    components: {
        BookFilter,
        BookList,
    }
}