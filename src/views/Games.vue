<template>
    <header>
        <h1>Dekar's Dojo</h1>
        <form>
            <input v-model="search" type="text">
        </form>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            search: ''
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    background: #0e0f13;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
</style>