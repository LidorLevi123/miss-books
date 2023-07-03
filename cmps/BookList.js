import BookPreview from '../cmps/BookPreview.js'

export default {
    props: ['books'],

    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books">
                    <section class="actions">
                        <button title="Edit Book" class="btn-edit" @click="onEditBook(book.id)">🖊</button>
                        <button title="Remove Book" class="btn-remove" @click="onRemoveBook(book.id)">✖</button>
                    </section>
                    <BookPreview :book="book"/>
                </li>
            </ul>
        </section>
    `,

    methods: {
        onRemoveBook(bookId) {
            this.$emit('remove', bookId)
        },
        onEditBook(bookId) {
            this.$router.push(`/books/edit/${bookId}`)
        }
    },

    components: {
        BookPreview,
    }
}