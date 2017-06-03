<template>
    <div id="app" class="corpo">
        <navbar>
            <i class="material-icons" slot="icon" @click="searchIcon();" >search</i>
            <input v-model="searchValue" slot="top" @keyup.enter="search(nextPageToken,query,maxResults)" 
                            @input="query = $event.target.value"  
                            placeholder="Pesquisar" 
                            class="mdl-textfield__input" type="text" name="sample"
                            id="fixed-header-drawer-exp">
            <li slot="bottom" class="mdl-menu__item li-route" v-for="route in routes">
                <router-link class="a-block" :to="route.path ? route.path : '/'">{{route.title}}</router-link>
            </li>
        </navbar>
        <router-view></router-view>
    </div>
</template>


<script>
    import {
        routes
    } from './routes';

    import Navbar from './components/shared/Navbar.vue';
    export default {
        components: {
            'navbar': Navbar
        },
        data() {
            return {
                routes,
                nextPageToken: '',
                maxResults: 12,
                query: '',
                searchValue: ''
            }
        },
        methods: {
            search: function(nextPageToken, query) {
                let route = Object.assign({
                    query: {
                        search: query           
                    }
                }, routes[1]);
                this.$router.push(route);
                this.searchValue = "";
            },
              searchIcon: function() {
               this.searchValue.length > 0 ? this.search(this.nextPageToken,this.query,this.maxResults) : null
            }
        }
    }
</script>

<style lang="scss" scoped>
 @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
 @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
 @import './assets/css/App.scss'; 
</style>