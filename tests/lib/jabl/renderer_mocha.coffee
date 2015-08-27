Renderer = require "#{__rootdir}/lib/jabl/renderer"

describe 'lib/jabl/renderer', ->
  [renderer, post] = [null, null]

  beforeEach ->
    post = Factory.build 'post', tags: ['dude']
    renderer = new Renderer 'posts/index', [post]

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

      it 'creates json object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData).to.be.an.Array
          done()

      it 'has one object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData.length).to.eql 1
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(validate.errors).to.eql []
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

      it 'creates json array', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData).to.be.an.Array
          done()

      it 'has one object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData.length).to.eql 1
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(validate.errors).to.eql []
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

      context 'function as attribute', ->
        beforeEach ->
          post = Factory.build 'post', title: -> 'Meow'
          renderer = new Renderer 'posts/index', [post]

        it 'title is Meow', (done) ->
          renderer.render (data) ->
            jsData = JSON.parse data
            expect(jsData[0].title).to.eql 'Meow'
            done()

      it 'creates json array', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData).to.be.an.Array
          done()

      it 'has one object', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          expect(jsData.length).to.eql 1
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          jsData = JSON.parse data
          validate = json.validate(jsData[0], nodeSchema)
          expect(validate.errors).to.eql []
          done()
