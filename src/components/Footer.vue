<template>
    <footer>
        <a class="author" href="https://github.com/Foxyg3n" target="_blank" rel="author">Foxyg3n</a>
        <p>- Copyright &copy; 2024</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped lang="scss">
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    padding: 1em;

    p {
        margin: 0;
    }

    .author {
        color: #42b983;
        font-weight: bold;
    }
}
</style>