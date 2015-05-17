Jabl = require "#{__rootdir}/lib/jabl"

describe 'lib/jabl', ->
  jabl = post = null
  beforeEach ->
  describe '#render', ->
    context 'node', ->
      nodeSchema =
        id: "/nodeSchema"
        type: "object"
        properties:
          id: type: "integer"
          title: type: "string"
          content: type: "string"
          tags:
            type: 'array'
            items: type: 'string'
        required: ["id", "title", "content"]
      beforeEach ->
        post = Factory.build 'post', tags: ['dude']
        jabl = new Jabl 'posts/node', [post]
      it 'returns JSON', (done) ->
        jabl.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(jsData).to.be.an.Array
          expect(jsData.length).to.equal 1
          expect(validate.errors).to.deep.equal []
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
