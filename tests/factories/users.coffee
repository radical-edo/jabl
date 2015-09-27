module.exports =
  Factory.define 'user'
    .sequence 'id'
    .sequence 'name', (n) -> "User name ##{n}"

