export default {
    props: ['book'],

    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle}}</h3>
            <p>{{ book.listPrice.amount }}$</p>
        </article>
    `,
}