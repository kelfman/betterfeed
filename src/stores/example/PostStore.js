import alt from '../alt.js';
import PostActions from '../actions/PostActions.js';

class PostStore {

    constructor() {
        this.bindListeners({
            updateCurrentPost: PostActions.UPDATE_CURRENT_POST,
            updatePosts:  PostActions.UPDATE_POSTS
        });

        this.on('init', () => {
            this.posts = [];
            this.currentPost = null;
        });
    }

    updateCurrentPost(post) {
        this.currentPost = post;
    }

    updatePosts(posts) {
        this.posts = posts;
    }

}

module.exports = alt.createStore(PostStore, 'PostStore');
