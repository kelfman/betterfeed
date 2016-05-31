import alt from '../alt.js';
import config from '../../config.js';
import request from 'superagent';


class PostActions {

    loadAllPosts(cb) {
        request.get(config.baseUrl+'/ajax/posts', (err,response) => {
            this.actions.updatePosts(response.body);
            if (cb) cb();
        });
    }

    loadSinglePost(id, cb) {
        request.get(config.baseUrl+'/ajax/post/'+id, (err,response) => {
            this.actions.updateCurrentPost(response.body);
            if (cb) cb();
        });
    }

    updatePosts(posts) {
        this.dispatch(posts);
    }

    updateCurrentPost(post) {
        this.dispatch(post);
    }

}


module.exports = alt.createActions(PostActions);
