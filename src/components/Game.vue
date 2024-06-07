<template>
    <div :id="game.id" class="game">
        <h3>Rengar vs {{ game.againstChamp }} | {{ game.against }}</h3>
        <div class="game"></div>
    </div>
</template>

<script>
export default {
    name: 'Game',
    props: {
        game: {
            type: Object,
            default: {
                againstChamp: 'Unknown',
                against: 'Unknown'
            }
        }
    },
    mounted() {
        function toStringFormat(timestamp) {
            const hours = Math.floor(timestamp.time / 3600);
            const minutes = Math.floor((timestamp.time % 3600) / 60);
            const seconds = timestamp.time % 60;
            return `${hours}h ${minutes}m ${seconds}s`;
        }

        const twitchOptions = {
            width: 650,
            height: 400,
            video: this.game.streamId,
            time: toStringFormat(this.game.timestamp),
            autoplay: false,
            parent: ["localhost"]
        };
        new Twitch.Player(this.game.id, twitchOptions);
    }
}
</script>