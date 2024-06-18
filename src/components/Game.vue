<template>
    <div class="game">
        <button v-if="loggedIn" @click="deleteGame" class="delete">
            <i class="fas fa-x"></i>
        </button>
        <h3>Rengar vs {{ game.enemyProfile.champion }} | {{ game.enemyProfile.name }}</h3>
        <div class="champion-profiles">
            <ChampionProfile float="left" :championInfo="game.profile"></ChampionProfile>
            <ChampionProfile float="right" :championInfo="game.enemyProfile"></ChampionProfile>
        </div>
        <div :id="game.id" class="vod"></div>
    </div>
</template>

<script>
import ChampionProfile from './ChampionProfile.vue';

export default {
    name: 'Game',
    components: {
        ChampionProfile
    },
    props: {
        game: Object,
        loggedIn: Boolean
    },
    methods: {
        toStringFormat(timestamp) {
            const hours = Math.floor(timestamp / 3600);
            const minutes = Math.floor((timestamp % 3600) / 60);
            const seconds = timestamp % 60;
            return `${hours}h${minutes}m${seconds}s`;
        },
        deleteGame() {
            this.$emit('delete', this.game.id);
        }
    },
    mounted() {
        const twitchOptions = {
            width: "100%",
            height: document.querySelector(`#${this.game.id}`).getBoundingClientRect().width * 9 / 16 || 450,
            video: this.game.streamId,
            time: this.toStringFormat(this.game.timestamp),
            autoplay: false,
            parent: ["localhost"]
        };
        const twitchPlayer = new Twitch.Player(this.game.id, twitchOptions);
        twitchPlayer.disableCaptions();
    }
}
</script>

<style scoped lang="scss">
.champion-profiles {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
}

.game {
    position: relative;
    background: #0e0f13;
    padding: 10px;
    border-radius: 10px;
    color: #fff;

    .delete {
        font-size: 0.8em;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 10px;
        right: 10px;
        background: #C62828;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 50%;
    }

    .vod {
        margin: 10px;
    }
}
</style>