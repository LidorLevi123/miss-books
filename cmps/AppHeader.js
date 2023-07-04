export default {
    template: `
        <header class="app-header">
            <h1 class="logo"><RouterLink to="/">Miss Books</RouterLink></h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/books">Books</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </header>
    `,
}