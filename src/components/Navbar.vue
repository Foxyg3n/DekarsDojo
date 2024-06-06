<template>
  <nav>
    <router-link to="/">Games</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style lang="scss" scoped>
nav {
    background: #0e0f13;
}
</style>