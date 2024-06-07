<template>
  <Navbar @logout="onLogout" :loggedIn="loggedIn" />
  <router-view @login="onLogin" :loggedIn="loggedIn" />
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'App',
    components: {
        Footer,
        Navbar
    },
    data() {
        return {
            loggedIn: false
        }
    },
    methods: {
        onLogin() {
            this.loggedIn = true;
        },
        onLogout() {
            this.loggedIn = false;
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        if(token) {
            this.loggedIn = true;
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

body {
    margin: 0;
    min-height: 100vh;
}

#app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
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
