import Home from './components/Home.vue';
import MaisVideos from './components/maisvideos/MaisVideos.vue';

export const routes = [
    { path: '', component: Home, title: 'Home' },
    { name: 'videos', path: '/videos', component: MaisVideos, title: 'Mais vídeos' }
];