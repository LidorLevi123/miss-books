import { bookService } from '../services/book.service.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <img :src="book.thumbnail" alt="">
            <div class="details">
                <h1>{{ book.title }}</h1>
                <h2>{{ book.subtitle }}</h2>
                <h3>Categories: {{ bookCategories }}</h3>
                <hr>
                <p>{{ book.description }}</p>
            </div>
            <div class="price">
                <span>Price: $\{{ book.listPrice.amount }}</span>
            </div>
            <!-- <RouterLink to="/books">Back to List</RouterLink> -->
        </section>
    `,

    data() {
        return {
            book: null
        }
    },

    computed: {
        bookCategories() {
            return this.book.categories.join(', ')
        }
    },

    created() {
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => {
                this.book = book
            })
            .catch(err => {
                alert('Cannot load book')
                this.$router.push('/books')
            })
    },
}