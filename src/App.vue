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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Tiny5&display=swap');

* {
    box-sizing: border-box;
}

body {
    margin: 0;
}

input {
    font-family: 'Poppins', sans-serif;
}

button {
    font-size: 1em;
    background: none;
    border: none;
    cursor: pointer;
}

#app {
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
}

main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
