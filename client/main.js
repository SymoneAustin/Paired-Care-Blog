//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

import Butter from 'buttercms';

import './home.html';
const butter = Butter('bf3ea2b96a8e21e4a9df381d4d987edf42810492');

Router.route('/', function() {
  this.render("summary")
});

Router.route('/blog', function() {
  let that = this;

  butter.post.list({page: 1, page_size: 4}).then(function(response) {
    that.render('blog', {data: {posts: response.data.data}});
  });
});

Router.route('/blog/:slug', function() {
  let slug = this.params.slug;
  let that = this;

  butter.post.retrieve(slug).then(function(response) {
    let post = response.data.data;

    that.render('Post', {data: {post: post}});
  });
});
