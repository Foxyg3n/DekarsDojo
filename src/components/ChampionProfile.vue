<template>
    <div :class="['champion-profile', float == 'left' ? 'champion-profile-left' : 'champion-profile-right']">
        <div class="first">
            <div class="top">
                <img :src="championInfo.icon" alt="Champion Icon">
                <div class="summoner-spells">
                    <img :src="championInfo.spell1" alt="Summoner Spell 1">
                    <img :src="championInfo.spell2" alt="Summoner Spell 2">
                </div>
                <div class="kda">
                    <div class="kda-stats">
                        <span class="kda-kills">{{ championInfo.kills }}</span>/<span class="kda-deaths">{{ championInfo.deaths }}</span>/<span class="kda-assists">{{ championInfo.assists }}</span>
                    </div>
                    <span>{{ ((championInfo.kills + championInfo.assists) / championInfo.deaths).toFixed(2) }} KDA</span>
                </div>
            </div>
            <div class="bottom">
                <div class="items">
                    <img v-for="item in championInfo.items" :src="item" alt="Item">
                </div>
            </div>
        </div>
        <div class="second">
            <div class="runes">
                <img class="main-rune" :src="championInfo.runes.primaryRunes[0]" alt="">
                <div class="minor-runes">
                    <div class="primary-runes">
                        <img v-for="rune in championInfo.runes.primaryRunes.slice(1)" :src="rune" alt="">
                    </div>
                    <div class="secondary-runes">
                        <img v-for="rune in championInfo.runes.secondaryRunes" :src="rune" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChampionProfile',
    props: {
        championInfo: Object,
        float: String
    }
}
</script>

<style scoped lang="scss">
.champion-profile {
    display: flex;
    border-radius: 5px;
    padding: 7px;
    margin: 5px;
    background: #18161f;
    column-gap: 0.5em;

    .first {
        display: flex;
        flex-direction: column;
        row-gap: 0.5em;

        .top {
            display: flex;
            align-items: center;
            column-gap: 1em;
            background: #0e0f13;
            border-radius: 2px;

            img {
                width: 55px;
            }

            .summoner-spells {
                display: flex;
                flex-direction: column;
                row-gap: 4px;

                img {
                    width: 23.5px;
                    height: 23.5px;
                    border-radius: 3px;
                }
            }
        }

        .bottom .items {
            display: flex;
            column-gap: 4px;
            padding: 2px;
            background: #0e0f13;
            border-radius: 2px;

            img {
                width: 27.5px;
                height: 27.5px;
                border-radius: 3px;

                &:nth-child(7) {
                    margin-left: 10px;
                }
            }
        }
    }

    .second {
        display: flex;
        justify-content: center;
        align-items: center;

        .runes {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background: #0e0f13;
            border-radius: 2px;
            padding: 0 5px;

            .main-rune {
                width: 60px;
                height: 60px;
            }

            .minor-runes {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                row-gap: 4px;

                .primary-runes, .secondary-runes {
                    display: flex;
                    column-gap: 4px;

                    img {
                        width: 28px;
                        height: 28px;
                        border-radius: 3px;
                    }
                }
            }
        }
    }

    &.champion-profile-left {
        flex-direction: row;
    }

    &.champion-profile-right {
        flex-direction: row-reverse;

        .first {
            .top {
                flex-direction: row-reverse;
            }

            .bottom .items {
                flex-direction: row-reverse;

                img:nth-child(7) {
                    margin-left: 0;
                    margin-right: 10px;
                }
            }
        }

        .second .runes {
            flex-direction: row-reverse;

            .primary-runes, .secondary-runes {
                flex-direction: row-reverse;
            }
        }
    }
}
</style>