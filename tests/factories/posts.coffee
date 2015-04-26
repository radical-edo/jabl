Post = Factory.define('post')
  .sequence 'id'
  .sequence 'title', (n) -> "Whatever_##{n}"
  .attr 'content', 'Meh'

module.exports = Post

