module.exports =
  Factory.define 'comment'
    .sequence 'id'
    .sequence 'content', (n) -> "Op! #{n}"

