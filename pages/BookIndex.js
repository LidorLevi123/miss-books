import { bookService } from '../services/book.service.js'

import BookList from '../cmps/BookList.js'

export default {
    template: `
        <section class="book-index">
            <BookList :books="books"/>
        </section>
    `,
    data() {
        return {
            books: null,
        }
    },
    methods: {

    },
    computed: {
        // filteredBooks() {
        //     const regex = new RegExp(this.filterBy.txt, 'i')
        //     return this.books.filter(book => regex.test(book.title))
        // }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookList,
    }
}