import Moment from 'moment';
import 'moment/locale/pt-br';

Moment.locale('pt-BR');


export default class VideoService {

    constructor(resource) {
        this._resource = resource;
    }

    searchVideos(params) {
        var url = "https://www.googleapis.com/youtube/v3/search?",
            params = Object.assign({
                "part": "snippet",
                "type": "video",
                "channelId": "UClu474HMt895mVxZdlIHXEA",
                "order": "date",
                "key": "ADICIONE SUA CHAVE AQUI"
            }, params),
            resource = this._resource(url, params);
        return resource.get();
    }

    getVideos(params) {
        var url = "https://www.googleapis.com/youtube/v3/videos?",
            params = Object.assign({
                "part": "snippet,statistics",
                "key": "ADICIONE SUA CHAVE AQUI"
            }, params),
            resource = this._resource(url, params);
        return resource.get();
    }

    getVideosList(params) {
        return this.searchVideos(params)
            .then(response => response.json())
            .then(response => {
                var ids = response.items.map(item => {
                        return item.id.videoId;
                    }),
                    nextPageToken = response.nextPageToken;

                return this.getVideos({ "id": ids.join(',') })
                    .then(response => response.json())
                    .then(response => {
                        response.items.forEach(item => item.snippet.publishedAt = Moment(item.snippet.publishedAt).format('LLL'));
                        response.nextPageToken = nextPageToken;
                        return response;
                    });
            })
    }

}