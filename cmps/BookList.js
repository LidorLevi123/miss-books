import BookPreview from '../cmps/BookPreview.js'

export default {
    props: ['books'],

    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books">
                    <button class="btn-remove" @click="onRemoveBook(book.id)">X</button>
                    <BookPreview :book="book"/>
                </li>
            </ul>
        </section>
    `,

    methods: {
        onRemoveBook(bookId) {
            this.$emit('remove', bookId)
        }
    },

    components: {
        BookPreview,
    }
}