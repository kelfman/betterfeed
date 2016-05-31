var React = require('react');
var Link = require('react-router').Link;
var PostActions = require('../actions/PostActions');

var Header = React.createClass({

    showAllPosts : function(e){
        e.preventDefault();
        PostActions.loadAllPosts((function(){
            console.log("DEBUG: posts loaded");
           // this.context.router.transitionTo('postListView');
        }).bind(this));
    },

    render : function() {
        return (
            <div className="header">
                <h1><a href="#" onClick={this.showAllPosts}>React Isomorphic Blog</a></h1>
            </div>
        )
    }
});

module.exports = Header;
