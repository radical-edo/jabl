_ = require 'lodash'
require './comments'
require './users'

module.exports =
  Factory.define('post')
    .attr 'author', -> Factory.build 'user'
    .sequence 'id'
    .sequence 'title', (n) -> "Whatever_##{n}"
    .attr 'comments', ['comments'], (comments = _.range 1) ->
      comments.map -> Factory.build 'comment'
    .attr 'content', 'Meh'

