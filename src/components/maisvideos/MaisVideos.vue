<template>
  
<div class="home">

  <dialog class="mdl-dialog">
        <div class="mdl-dialog__content">
                    <div class="mdl-dialog__actions">
                    <button type="button" class="modal-close mdl-button--colored"> <i class="material-icons">close</i></button>
                    </div>
                <main-video :video="videoOpened" v-if="videoOpened.snippet">
                </main-video>
       </div>
  </dialog>

<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <main class="mdl-layout__content">
    <div class="page-content">
        <div class="mdl-grid">
            <div v-if="videos.length > 0 && $route.query.search">Resultados encotrados para: "<span v-html="search"></span>"</div>
            <div v-if="videos.length == 0">Nenhum resultado encotrado para: "<span v-html="search"></span>"</div>
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-phone mdl-cell--12-col-tablet">                
                <div class="box-margin-video">   
                    <h5>+ Vídeos</h5>          
                    <div>   
                        <div class="roll-for" v-for="video of videos"  @click="clickVideo(video)">  
                        <mini-video :video="video" >
                        </mini-video>
                        </div>
                      <button  class="mdl-button mdl-button--raised btn-loader" v-if="videos.length >= numberMaxResults" @click="loadMoreVideos(nextPageToken)">
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
    import MiniVideo from '../shared/MiniVideo.vue';
    import MainVideo from '../shared/MainVideo.vue';
    import Loader from '../shared/Loader.vue';
    import VideoService from '../shared/VideoService.js';
    import Navbar from '../shared/Navbar.vue'; 

    export default {
        components: {
            'mini-video': MiniVideo,
            'main-video': MainVideo,
            'navbar': Navbar
        },

        data() {
            return {
                videos: [],
                message: '',
                nextPageToken: '',
                numberMaxResults: 12,
                videoPlay: '',
                videoOpened: {},
                search: this.$route.query.search,
                loading: true
            }
        },
        created() {
            this.videos = [];
            this.searchVideoList(null, this.search, 12).then(() => {
                this.open(this.videos[0]);
            });
        },

        watch: {           
            '$route.query': function(query) {
                this.search = query.search;
                this.videos = [];
                this.searchVideoList(null, this.search, 12);
            },
        },
        methods: {
            clickVideo: function(video) {
                this.openModal();
                video.autoPlay = true;
                this.videoOpened = video;
            },
            open: function(video) {
                this.videoOpened = video;
            },
            getVideoList: function(nextPageToken) {
                return new VideoService(this.$resource).getVideosList({
                        "pageToken": nextPageToken
                    }).then(response => {
                        this.videos = this.videos.concat(response.items);
                        this.nextPageToken = response.nextPageToken;
                    })
                    .catch(e => {
                        alert('Serviço Indisponível');
                    });
            },
            searchVideoList: function(nextPageToken, query, numberMaxResults) {
                return new VideoService(this.$resource).getVideosList({
                        "pageToken": nextPageToken,
                        "q": query,
                         "maxResults": numberMaxResults
                    }).then(response => {
                        this.videos = this.videos.concat(response.items);
                        this.nextPageToken = response.nextPageToken;
                    })
                    .catch(e => {;
                        alert('Serviço Indisponível');
                    });
            },
                loadMoreVideos: function(nextPageToken) {
                this.searchVideoList(nextPageToken,null,12);
            },
            openModal: function() {
                var dialog = document.querySelector('dialog');
                var showDialogButton = document.querySelector('#show-dialog');
                if (!dialog.showModal) {
                    dialogPolyfill.registerDialog(dialog);
                }
                dialog.showModal();
                dialog.querySelector('.modal-close').addEventListener('click', function() {               
                    dialog.querySelector('#player').src = '';
                    dialog.close();
                });
            }         
        }
    }
</script>

<style lang="scss" scoped>
     @import '../../assets/css/MaisVideos.scss'; 
</style>