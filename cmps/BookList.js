import BookPreview from '../cmps/BookPreview.js'

export default {
    props: ['books'],

    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books">
                    <BookPreview :book="book"/>
                </li>
            </ul>
        </section>
    `,

    methods: {

    },

    components: {
        BookPreview,
    }
}