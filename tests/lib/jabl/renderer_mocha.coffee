Renderer = require "#{__rootdir}/lib/jabl/renderer"

describe 'lib/jabl/renderer', ->
  renderer = null

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
        renderer = new Renderer 'node/return_property', [post]
      it 'returns JSON', (done) ->
        renderer.render (data) ->
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
        renderer = new Renderer 'attributes/single_line', [post]
      it 'returns JSON', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], attributesSchema)
          expect(jsData).to.be.an.Array
          expect(jsData.length).to.equal 1
          expect(validate.errors).to.deep.equal []
          done()
    
