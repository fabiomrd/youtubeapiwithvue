<template>
    <div class="box-mainvideo">
        <iframe id="player" :src="'https://www.youtube.com/embed/' + v.id + v.autoPlay" allowfullscreen="allowfullscreen" controls=2  frameborder="0"></iframe>
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h5 class="mdl-card__title-text">{{v.snippet.title}}</h5>
                <tooltip placement="bottom-right" mode="hover">
                    <div slot="outlet"><div class="icon material-icons">remove_red_eye</div></div>
                    <div slot="tooltip" v-html="v.statistics.viewCount + ' views'"></div>
                </tooltip>
                <tooltip placement="bottom-right" mode="hover">
                    <div slot="outlet"><div class="icon material-icons">access_time</div></div>
                    <div slot="tooltip" v-html="v.snippet.publishedAt"></div>
                </tooltip>    
            </div>
            <div class="mdl-card__supporting-text card-description " v-bind:class="{ micro: !descriptionOpened }" @click="openDescription()">
                {{v.snippet.description}}
                <div id="sombra"  v-if="!descriptionOpened">
                </div>
            </div>
            <div class="mdl-card__menu">
                <div class="sombra"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            video: {
                default: {
                    id: "",
                    snippet: {
                        title: "",
                        description: "",
                        autoPlay: false
                    },
                    descriptionOpened: false
                }
            }
        },
        data() {
            return {
                descriptionOpened: false
            }
        },
        computed: {
            v: function() {
                var v = Object.assign({}, this.video);
                v.autoPlay = (this.video.autoPlay) ? "?autoplay=1" : "";
                v.descriptionOpened = false;
                return v;
            }
        },
        methods: {
            openDescription() {
                this.descriptionOpened = !this.descriptionOpened;
            }
        }
    }
</script>

<style lang="scss" scoped>    
     @import '../../assets/css/MainVideo.scss';   
</style>