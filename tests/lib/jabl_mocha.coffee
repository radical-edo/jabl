Jabl = require "#{__rootdir}/lib/jabl"

describe 'lib/jabl', ->
  jabl = post = null
  before ->
    Jabl.searchPaths.push 'tests/fixtures/templates'
  beforeEach ->
  describe '#render', ->
    it 'returns JSON', (done) ->
      jabl.render (data) ->
        expect(data).to.eq JSON.stringify [post]
        done()
    context 'attributes', ->
      attributesSchema =
        id: "/attributesSchema"
        type: "object"
        properties:
          id: type: "integer"
          title: type: "string"
          content: type: "string"
        required: ["id", "title", "content"]
      beforeEach ->
        post = Factory.build 'post'
        jabl = new Jabl 'posts/attributes', [post]
      it 'returns JSON', (done) ->
        jabl.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], attributesSchema)
          expect(jsData).to.be.an.Array
          expect(jsData.length).to.equal 1
          expect(validate.errors).to.deep.equal []
          done()
