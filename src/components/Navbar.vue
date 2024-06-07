<template>
    <nav>
        <router-link to="/">Games</router-link> |
        <router-link to="/about">About</router-link> |
        <a href="#" @click="logout" v-if="loggedIn">Logout</a>
        <router-link v-else to="/login">Login</router-link>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        loggedIn: Boolean
    },
    methods: {
        logout(e) {
            e.preventDefault();
            localStorage.removeItem('token');
            this.$emit('logout');
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    background: #0e0f13;
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
        color: #42b983;
        }
    }
}
</style>