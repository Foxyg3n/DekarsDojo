<template>
    <header>
        <h1>Dekar's Dojo</h1>
        <form>
            <input v-model="search" type="text">
            <button class="fas fa-search"></button>
        </form>
    </header>
    <main class="games">
        <Game v-for="game in games" :key="game.matchId" :game="game" />
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
    watch: {
        search() {
            this.games = this.allGames.filter(game => game.againstChamp.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    created() {
        this.games = [
            {
                "matchId": "KR_7074430688",
                "streamId": 2147944779,
                "timestamp": {
                    "time": 22746
                },
                "against": "cqtoo",
                "againstChamp": "XinZhao",
                "runes": [
                    {
                        "id": 8021,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png"
                    },
                    {
                        "id": 9111,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png"
                    },
                    {
                        "id": 9104,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png"
                    },
                    {
                        "id": 8014,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png"
                    },
                    {
                        "id": 8138,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png"
                    },
                    {
                        "id": 8106,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png"
                    }
                ]
            },
            {
                "matchId": "KR_7077545974",
                "streamId": 2149833962,
                "timestamp": {
                    "time": 1587
                },
                "against": "cqtoo",
                "againstChamp": "Nocturne",
                "runes": [
                    {
                        "id": 8021,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png"
                    },
                    {
                        "id": 9111,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png"
                    },
                    {
                        "id": 9104,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png"
                    },
                    {
                        "id": 8014,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png"
                    },
                    {
                        "id": 8138,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png"
                    },
                    {
                        "id": 8106,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png"
                    }
                ]
            },
            {
                "matchId": "KR_7077584551",
                "streamId": 2149833962,
                "timestamp": {
                    "time": 3386
                },
                "against": "LSLovesMorello",
                "againstChamp": "Lillia",
                "runes": [
                    {
                        "id": 8021,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png"
                    },
                    {
                        "id": 9111,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png"
                    },
                    {
                        "id": 9104,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png"
                    },
                    {
                        "id": 8014,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png"
                    },
                    {
                        "id": 8138,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png"
                    },
                    {
                        "id": 8106,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png"
                    }
                ]
            },
            {
                "matchId": "KR_7081059333",
                "streamId": 2152531294,
                "timestamp": {
                    "time": 324
                },
                "against": "Heya",
                "againstChamp": "Viego",
                "runes": [
                    {
                        "id": 8021,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png"
                    },
                    {
                        "id": 9111,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png"
                    },
                    {
                        "id": 9104,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png"
                    },
                    {
                        "id": 8014,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png"
                    },
                    {
                        "id": 8138,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png"
                    },
                    {
                        "id": 8106,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png"
                    }
                ]
            },
            {
                "matchId": "KR_7081060861",
                "streamId": 2152531294,
                "timestamp": {
                    "time": 2334
                },
                "against": "역천리",
                "againstChamp": "Karthus",
                "runes": [
                    {
                        "id": 8021,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png"
                    },
                    {
                        "id": 9111,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png"
                    },
                    {
                        "id": 9104,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png"
                    },
                    {
                        "id": 8014,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png"
                    },
                    {
                        "id": 8138,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png"
                    },
                    {
                        "id": 8106,
                        "img": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png"
                    }
                ]
            }
        ]
        this.allGames = this.games;
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