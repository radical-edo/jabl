Renderer = require "#{__rootdir}/lib/jabl/renderer"

describe 'lib/jabl/renderer', ->
  [renderer, post] = [null, null]

  beforeEach ->
    post = Factory.build 'post', tags: ['dude']
    renderer = new Renderer 'posts/index', [post]

  describe '#render', ->
    context 'glue', ->
      beforeEach ->
        renderer = new Renderer 'posts/show', post

      it 'has numnber_of_likes', (done) ->
        renderer.render (data) ->
          data = JSON.parse data
          expect(data.number_of_likes).to.eql 2
          done()
        
    context 'partial', ->
      beforeEach ->
        renderer = new Renderer 'posts/show', post

      userSchema =
        id: "/userSchema"
        type: "object"
        properties:
          id: type: "integer"
          name: type: 'string'
        required: ['id', 'name']

      it 'adds an object to the root object', (done) ->
        renderer.render (data) ->
          data = JSON.parse data
          expect(Object::toString.call data.author).to.eql '[object Object]'
          done()

      it 'has all the required fields', (done) ->
        renderer.render (data) ->
          validate = json.validate JSON.parse(data).author, userSchema
          expect(validate.errors).to.eql []
          done()

    context 'child', ->

      beforeEach ->
        renderer = new Renderer 'posts/show', post

      commentSchema =
        id: "/commentSchema"
        type: "object"
        properties:
          id: type: "integer"
          content: type: 'string'
        required: ['id', 'content']

      it 'has comments array', (done) ->
        renderer.render (data) ->
          expect(JSON.parse(data).comments).to.be.an Array
          done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          validate = json.validate JSON.parse(data).comments[0], commentSchema
          expect(validate.errors).to.eql []
          done()

    context 'assumes not a collection by default', ->
      nodeSchema =
        id: "/nodeSchema"
        type: "object"
        properties:
          id: type: "integer"
          content: type: 'string'
          title: type: 'string'
          foo: type: 'string'
          tags:
            type: 'array'
            items: type: 'string'
        required: ['id', 'tags', 'title', 'content', 'foo']

      beforeEach ->
        post = Factory.build 'post', tags: ['dude']
        renderer = new Renderer 'posts/show', post

      it 'returns just a object', (done) ->
        renderer.render (data) ->
          data = JSON.parse data
          expect(data).not.to.be.an Array
          done()

      context 'takes', ->
        it 'adds a custom node even after #takes has finished', (done) ->
          renderer.render (data) ->
            data = JSON.parse data
            expect(data.foo).to.eql 'bar'
            done()

      it 'has no errors', (done) ->
        renderer.render (data) ->
          validate = json.validate JSON.parse(data), nodeSchema
          expect(validate.errors).to.eql []
          done()

    context 'node + attribute', ->
      nodeSchema =
        id: "/nodeSchema"
        type: "object"
        properties:
          id: type: "integer"
          content: type: 'string'
          title: type: 'string'
          foo: type: 'string'
          tags:
            type: 'array'
            items: type: 'string'
        required: ['id', 'tags', 'title', 'content', 'foo']

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
