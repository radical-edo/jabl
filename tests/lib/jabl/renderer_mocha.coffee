Renderer = require "#{__rootdir}/lib/jabl/renderer"

describe 'lib/jabl/renderer', ->
  [renderer, post] = [null, null]

  beforeEach ->
    post = Factory.build 'post', tags: ['dude']

  describe '#render', ->
    context 'node + attribute', ->
      nodeSchema =
        id: "/nodeSchema"
        type: "object"
        properties:
          id: type: "integer"
          content: type: 'string'
          title: type: 'string'
          tags:
            type: 'array'
            items: type: 'string'
        required: ['id', 'tags', 'title', 'content']

      beforeEach ->
        renderer = new Renderer 'node/return_property', [post]

      it 'creates json array', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData).to.be.an.Array
          done()

      it 'has one object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData.length).to.equal 1
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(validate.errors).to.deep.equal []
          done()

    context 'node', ->
      nodeSchema =
        id: "/nodeSchema"
        type: "object"
        properties:
          id: type: "integer"
          tags:
            type: 'array'
            items: type: 'string'
        required: ['id', 'tags']

      beforeEach ->
        renderer = new Renderer 'node/just_node', [post]

      it 'creates json array', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData).to.be.an.Array
          done()

      it 'has one object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData.length).to.equal 1
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(validate.errors).to.deep.equal []
          done()

    context 'attributes', ->
      nodeSchema =
        id: "/attributesSchema"
        type: "object"
        properties:
          id: type: "integer"
          title: type: "string"
          content: type: "string"
        required: ["id", "title", "content"]

      beforeEach ->
        renderer = new Renderer 'attributes/single_line', [post]

      context 'function as attribute', ->
        beforeEach ->
          post = Factory.build 'post', title: -> 'Meow'
          renderer = new Renderer 'attributes/single_line', [post]

        it 'title is Meow', (done) ->
          renderer.render (data) ->
            jsData = JSON.parse data
            expect(jsData[0].title).to.equal 'Meow'
            done()

      it 'creates json array', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData).to.be.an.Array
          done()

      it 'has one object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData.length).to.equal 1
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(validate.errors).to.deep.equal []
          done()
