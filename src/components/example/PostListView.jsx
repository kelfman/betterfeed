var React = require('react');
var Link = require('react-router').Link;
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');
var PostPreview = require('./PostPreview.jsx');

var PostListView = React.createClass({

    getInitialState : function() {
        return PostStore.getState();
    },

    componentDidMount : function() {
        PostStore.listen(this._onChange);
    },

    componentWillUnmount : function() {
        PostStore.unlisten(this._onChange);
    },

    _onChange : function(state){
        this.setState(state);
    },

    render : function() {
        var posts = this.state.posts.map(function(post){
           return (
               <PostPreview key={post.id} post={post} />
           )
        });
        return (
            <div>
                {posts}
            </div>
        )
    }
});

module.exports = PostListView;
