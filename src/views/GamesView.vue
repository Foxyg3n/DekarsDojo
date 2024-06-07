<template>
    <header>
        <h1>Dekar's Dojo</h1>
        <form @submit="onSubmit">
            <input v-model="search" type="text">
            <button type="submit" class="fas fa-search"></button>
        </form>
    </header>
    <main class="games">
        <Game v-for="game in games" :key="game.id" :game="game" />
    </main>
</template>

<script>
import Game from '@/components/Game.vue'

export default {
    name: 'Games',
    components: {
        Game
    },
    data() {
        return {
            search: '',
            allGames: [],
            games: []
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            this.games = this.allGames.filter(game => game.againstChamp.toLowerCase().includes(this.search.toLowerCase()));
        },
        async fetchGames() {
            const res = await fetch('api/games');
            const data = await res.json();
            return data;
        }
    },
    async created() {
        this.games = await this.fetchGames();
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

form {
    position: relative;

    input {
        outline: none;
        width: 250px;
        border-radius: 50px;
        border: none;
        padding: 1em;
        font-size: 1em;
    }

    button {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        background: #42b983;
        border: none;
        font-size: 1em;
        border-radius: 50%;
    }
}

.games {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>