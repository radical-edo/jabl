_ = require 'lodash'
require './comments'

module.exports =
  Factory.define('post')
    .sequence 'id'
    .sequence 'title', (n) -> "Whatever_##{n}"
    .attr 'comments', ['comments'], (comments = _.range 1) ->
      comments.map -> Factory.build 'comment'
    .attr 'content', 'Meh'

