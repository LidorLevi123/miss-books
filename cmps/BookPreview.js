export default {
    props: ['book'],

    template: `
        <article @click="goToDetailsPage" class="book-preview">
            <img :src="book.thumbnail" alt="">
        </article>
    `,

    methods: {
        goToDetailsPage() {
            this.$router.push(`/books/${this.book.id}`)
        }
    }
}