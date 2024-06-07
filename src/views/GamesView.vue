<template>
    <header>
        <h1>Dekar's Dojo</h1>
        <form class="searchbar" @submit="onSubmit">
            <input v-model="search" type="text">
            <button type="submit" class="fas fa-search"></button>
        </form>
        <form class="add-game" v-if="loggedIn">
            <button>+</button>
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
    props: {
        loggedIn: Boolean
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
        this.allGames = await this.fetchGames();
        this.games = this.allGames;
    }
}
</script>

<style lang="scss" scoped>
header {
    background: #0e0f13;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 50vh;

    h1 {
        color: #42b983;
        font-size: 4em;
        font-weight: 800;
    }
}

form button {
    width: 40px;
    height: 40px;
    cursor: pointer;
    background: #42b983;
    border: none;
    font-size: 1em;
    border-radius: 50%;
}

.searchbar {
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
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
    }
}

.add-game {
    margin-top: 20px;
}

.games {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>