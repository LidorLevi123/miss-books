export default {
    props: ['book'],

    template: `
        <article @click="goToEditPage" class="book-preview">
            <img :src="book.thumbnail" alt="">
        </article>
    `,

    methods: {
        goToEditPage() {
            this.$router.push(`/books/${this.book.id}`)
        }
    }
}