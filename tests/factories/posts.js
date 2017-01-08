'use strict';
const _ = require('lodash');

Factory.define('post')
  .attr('author', () => Factory.build('user'))
  .sequence('id')
  .sequence('title', (n) => `Whatever_#${n}`)
  .attr('comments', ['comments'], (comments = _.range(1)) => comments.map(() => Factory.build('comment')))
  .attr('content', 'Meh')
  .attr('likes', ['likes'], (likes = _.range(2)) => likes.map(() => Factory.build('like')));

