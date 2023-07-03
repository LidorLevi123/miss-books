export default {
    props: ['book'],

    template: `
        <article class="book-preview">
            <img :src="book.thumbnail" alt="">
        </article>
    `,
}