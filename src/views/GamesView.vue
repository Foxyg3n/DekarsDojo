<template>
    <header>
        <h1>Dekar's Dojo</h1>
        <form class="searchbar" @submit="searchGames">
            <input v-model="search" type="text">
            <button type="submit" class="fas fa-search"></button>
        </form>
        <button class="show-add-game" v-if="loggedIn" @click="toggleAddGame">+</button>
    </header>
    <div :class="['add-game-container', showAddGame ? 'show' : '']">
        <form class="add-game" @submit="addGame">
            <div class="form-control">
                <label for="matchId">Match ID</label>
                <input placeholder="KR_7074430688" v-model="matchId" type="text">
            </div>
            <div class="form-control">
                <label for="streamId">Stream ID</label>
                <input placeholder="2147944779" v-model="streamId" type="text">
            </div>
            <div class="form-control time-inputs">
                <label for="time">Timestamp</label>
                <div>
                    <input placeholder="5h" v-model="time.hours" type="text">
                    <input placeholder="3m" v-model="time.minutes" type="text">
                    <input placeholder="42s" v-model="time.seconds" type="text">
                </div>
            </div>
            <button type="submit">Add</button>
        </form>
    </div>
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
    emits: ['login'],
    data() {
        return {
            matchId: '',
            streamId: '',
            time: {
                hours: '',
                minutes: '',
                seconds: ''
            },
            showAddGame: false,
            search: '',
            allGames: [],
            games: []
        }
    },
    watch: {
        loggedIn() {
            if(!this.loggedIn) this.showAddGame = false;
        }
    },
    methods: {
        searchGames(e) {
            e.preventDefault();
            this.games = this.allGames.filter(game => game.enemyProfile.champion.toLowerCase().includes(this.search.toLowerCase()));
        },
        toggleAddGame() {
            this.showAddGame = !this.showAddGame;
        },
        addGame() {
            const gameQuery = {
                matchId: this.matchId,
                streamId: parseInt(this.streamId),
                timestamp: (parseInt(this.time.hours) * 3600) + (parseInt(this.time.minutes) * 60) + parseInt(this.time.seconds)
            }

            if(!gameQuery.matchId || !gameQuery.streamId || !gameQuery.timestamp) return console.log('Please fill all fields');

            fetch('api/games', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameQuery)
            })
            .then(res => res.json())
            .then(data => {
                this.allGames.push(data);
                this.games = this.allGames;
                this.matchId = '';
                this.streamId = '';
                this.time = {
                    hours: '',
                    minutes: '',
                    seconds: ''
                };
                this.showAddGame = false;
            });
        },
        async fetchGames() {
            const res = await fetch('api/games');
            const data = await res.json();
            console.log(data);
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
}

main {
    padding: 30px 0;
}

.show-add-game {
    font-size: 1.5em;
    width: 40px;
    height: 40px;
    background: #42b983;
    border-radius: 50%;
}

.add-game-container {
    display: flex;
    justify-content: center;
    background: #0e0f13;
    height: 0;
    overflow: hidden;
    transition: height 0.5s ease-in-out;

    &.show {
        height: 45vh;
    }

    .add-game {
        margin: 20px;
        width: 500px;
        display: flex;
        flex-direction: column;
        color: #42b983;
        background: #18161f;
        border-radius: 10px;
        padding: 20px;
        height: fit-content;

        .time-inputs div {
            display: flex;
            justify-content: space-between;
            column-gap: 10px;
        }

        .form-control {
            margin: 10px 0;
        }

        .form-control label {
            display: block;
        }

        .form-control input {
            width: 100%;
            height: 40px;
            margin: 5px 0;
            padding: 3px 7px;
            outline: none;
            border-radius: 50px;
            border: none;
            font-size: 0.8em;
        }

        .form-control-check {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .form-control-check label {
            flex: 1;
        }

        .form-control-check input {
            flex: 2;
            height: 20px;
        }

        button {
            font-family: inherit;
            width: 100%;
            height: 40px;
            background: #42b983;
            border: none;
            border-radius: 50px;
            color: #0e0f13;
            font-size: 1em;
            cursor: pointer;
            margin-top: 10px;
            transition: background 0.3s;
        }
    }
}

.games {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    row-gap: 40px;
}
</style>