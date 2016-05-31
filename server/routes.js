var express = require('express');
var router = express.Router();
var data = require('./data/index');

router.route('/').get(data.showAllPosts);

router.route('/ajax/posts').get(data.loadPostsViaAjax);

router.route('/post/:id/:slug').get(data.showSinglePost);

router.route('/ajax/post/:id').get(data.loadSinglePostViaAjax);

module.exports = router;
