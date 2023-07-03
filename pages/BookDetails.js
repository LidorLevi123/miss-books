import { bookService } from '../services/book.service.js'

export default {
    template: `
        <RouterLink to="/books">Back to List</RouterLink>
        <section class="book-details" v-if="book">
            <img :src="book.thumbnail" alt="">
            <div class="details">
                <img v-if="book.listPrice.isOnSale" src="assets/img/sale.png" alt="">
                <h1>{{ bookTitle }} by {{ book.authors[0] }}</h1>
                <h2>{{ book.subtitle }}</h2>
                <h3>Categories: {{ bookCategories }}</h3>
                <hr>
                <p>{{ book.description }}</p>
                <p>Pages: {{ bookPageCount }}</p>
                <p>Publish Date: {{ bookPublishDate }}</p>
            </div>
            <div class="price">
                <span :class="priceClass">Price: $\{{ book.listPrice.amount }}</span>
            </div>
        </section>
    `,

    data() {
        return {
            book: null
        }
    },

    computed: {
        bookTitle() {
            return this.book.title.charAt(0).toUpperCase() + this.book.title.slice(1)
        },
        bookCategories() {
            return this.book.categories.join(', ')
        },
        bookPageCount() {
            let readingLvl = ''
            let pageCount = this.book.pageCount

            if(pageCount > 500) readingLvl = 'Serious'
            else if(pageCount > 200) readingLvl = 'Descent'
            else readingLvl = 'Light'

            return pageCount + ` | ${readingLvl} Reading`
        },
        bookPublishDate() {
            let currYear = new Date().getFullYear()
            let bookYear = this.book.publishedDate
            let yearDiff = currYear - bookYear

            let bookState = ''
            if(yearDiff > 10) bookState = 'Vintage'
            else if(yearDiff < 1) bookState = 'New'
            else bookState = 'Basic'

            return bookYear + ` | ${bookState}`
        },
        priceClass() {
            let bookPrice = this.book.listPrice.amount
            return {
                red: bookPrice > 150,
                green: bookPrice < 20,
                orange: bookPrice >= 20 && bookPrice <= 150
            }
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