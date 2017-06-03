<template>
    <div class="box-minivideo" id="mini-video-card">
        <div class="box-thumb">
            <img :src="video.snippet.thumbnails.default.url" :width="video.snippet.thumbnails.default.width" alt="">
         </div>
          <div class="box-video-title"><span>{{ video.snippet.title | mini}}</span></div>
          <div class="eye-icon">
            <div class="icon material-icons">remove_red_eye</div>
            <span v-html="viewsCount"></span><span> views</span>
          </div>
           
    </div>
</template>

<script>
    export default {
        props: ['video'],
   
    computed: {
            viewsCount: function() {

                  var x = this.video.statistics.viewCount;
                  var v = x.toString().split(".");
                  v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  return v.join(".");
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/MiniVideo.scss';   
</style>