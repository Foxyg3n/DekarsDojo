<template>
    <div class="game">
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
        game: {
            type: Object,
            default: {
                againstChamp: 'Unknown',
                against: 'Unknown'
            }
        }
    },
    methods: {
        toStringFormat(timestamp) {
            const hours = Math.floor(timestamp / 3600);
            const minutes = Math.floor((timestamp % 3600) / 60);
            const seconds = timestamp % 60;
            return `${hours}h ${minutes}m ${seconds}s`;
        }
    },
    mounted() {
        const twitchOptions = {
            width: 650,
            height: 400,
            video: this.game.streamId,
            time: this.toStringFormat(this.game.timestamp),
            autoplay: false,
            parent: ["localhost"]
        };
        new Twitch.Player(this.game.id, twitchOptions);
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
    background: #0e0f13;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
}

.vod {
    margin: 10px;
}
</style>