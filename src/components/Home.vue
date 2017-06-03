<template>
  <div class="home">
  
<div class="mdl-layout mdl-js-layout
            mdl-layout--fixed-header">
  
  <main id="main-content" class="mdl-layout__content">
    <div class="page-content">

<div class="mdl-grid">

            <div class="mdl-cell mdl-cell--6-col-desktop  mdl-cell--12-col-phone mdl-cell--12-col-tablet">
                <h5>Vídeo em destaque</h5>
                <main-video :video="videoOpened" v-if="videoOpened.snippet">
                </main-video>
            </div>

            <div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--12-col-phone mdl-cell--12-col-tablet">
              <div class="box-margin-video">   
              <h5>+ Vídeos</h5>

        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
   
            <div class="roll">
                <div class="rolagem" v-for="video of videos" @click="clickVideo(video)">  
                <mini-video :video="video" >
                </mini-video>
                </div>
            </div>

        <button  class="mdl-button mdl-button--raised btn-loader" @click="loadMoreVideos(nextPageToken)">
            <p v-if="loading"> Carregar Mais Vídeos...</p>
            <loader v-else="loading"></loader>
        </button>


</div>
 
</div>
  </div>
</div>


    </div>
  </main>
</div>

</div>
</template>

<script>
    import MiniVideo from './shared/MiniVideo.vue';
    import MainVideo from './shared/MainVideo.vue';
    import Navbar from './shared/Navbar.vue';
    import Loader from './shared/Loader.vue';
    import VideoService from './shared/VideoService.js';

    export default {

        components: {
            'mini-video': MiniVideo,
            'main-video': MainVideo,
            'navbar': Navbar,
            'loader': Loader
        },

        data() {
            return {
                videos: [],
                nextPageToken: '',
                query: this.$route.params.query,
                videoOpened: [],
                loading: true,
                timeout: ''
            }
        },
        created() {
            this.getVideoList().then(() => {
                this.open(this.videos[0]);
            });
        },

        methods: {
            clickVideo: function(video) {
                this.videoOpened = video;
                video.autoPlay = true;
                this.scrollToTop();
            },
            scrollToTop: function() {
                let el = document.getElementById('main-content');
                el.scrollTop = 0;
            },
            open: function(video) {
                this.videoOpened = video;
            },
            buscarVideo: function(nextPageToken, query) {
                nextPageToken = '';

                this.searchVideoList(nextPageToken, query);

            },
            loadMoreVideos: function(nextPageToken) {
                this.getVideoList(nextPageToken);
            },
            getVideoList: function(nextPageToken, query) {
                this.loading = false;

                return new VideoService(this.$resource).getVideosList({
                        "pageToken": nextPageToken,
                        "q": query
                    }).then(response => {
                        this.loading = true;
                        this.videos = this.videos.concat(response.items);
                        this.nextPageToken = response.nextPageToken;

                    })
                    .catch(e => {
                        alert('Serviço Indisponível');
                    });
            },
            searchVideoList: function(nextPageToken, query) {
                return new VideoService(this.$resource).getVideosList({
                        "pageToken": nextPageToken,
                        "q": query
                    }).then(response => {
                        this.videos = response.items;
                        this.nextPageToken = response.nextPageToken;
                    })
                    .catch(e => {
                        alert('Serviço Indisponível');
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/css/Home.scss';
</style>