Jabl = require "#{__rootdir}/lib/jabl"

describe 'lib/jabl', ->
  jabl = post = null
  before ->
    Jabl.searchPaths.push 'tests/fixtures/templates'
  beforeEach ->
    post = Factory.build 'post'
    jabl = new Jabl 'posts/index', [post]
  describe '#render', ->
    it 'returns JSON', (done) ->
      jabl.render (data) ->
        expect(data).to.eq JSON.stringify [post]
        done()
