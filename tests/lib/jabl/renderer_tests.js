'use strict';
const Renderer = require('../../../lib/jabl/renderer');

describe('lib/jabl/renderer', function() {
  var [renderer, post] = [null, null];

  beforeEach(function() {
    post = Factory.build('post', {tags: ['dude']});
    return renderer = new Renderer('posts/index', [post]);});

  describe('#render', function() {
    context('when an error occurs', function() {
      beforeEach(() => renderer = new Renderer('posts', post));

      it('should thrown a "ENOENT" file error', () =>
        renderer.render().catch(err => expect(err.code).to.eql('ENOENT'))
      );
    });

    context('glue', function() {
      beforeEach(function () {
        renderer = new Renderer('posts/show', post)
      });

      it('has numnber_of_likes', function () {
        return renderer.render().then(function(data) {
          expect(data.number_of_likes).to.eql(2);
        })
      });
    });
        
    context('partial', function() {
      beforeEach(function () {
        renderer = new Renderer('posts/show', post)
      });

      var userSchema = {
        id: "/userSchema",
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: 'string' }
        },
        required: ['id', 'name']
      };

      context('options', function () {
        context('locals', function () {
          it("doesn't have hiddenFoo property", function () {
            return renderer.render().then(function(post) {
              expect(post.author).not.to.have.property('hiddenFoo');
            });
          });
        });
      });
            

      it('adds an object to the root object', function () {
        return renderer.render().then(function(data) {
          expect(Object.prototype.toString.call(data.author)).to.eql('[object Object]');
        })
      });

      it('has all the required fields', function () {
        return renderer.render().then(function(data) {
          var validate = json.validate(data.author, userSchema);
          expect(validate.errors).to.eql([]);
        });
      });
    });

    context('child', function () {
      var commentSchema = {
        id: "/commentSchema",
        type: "object",
        properties: {
          id: { type: "integer" },
          content: { type: 'string' }
        },
        required: ['id', 'content']
      };

      beforeEach(function () {
        renderer = new Renderer('posts/show', post)
      });

      it('has comments array', function () {
        return renderer.render().then(function (data) {
          expect(data.comments).to.be.an(Array);
        });
      });

      it('has no errors', function () {
        return renderer.render().then(function (data) {
          var validate = json.validate(data.comments[0], commentSchema);
          expect(validate.errors).to.eql([]);
        });
      });
    });

    context('assumes not a collection by default', function () {
      var nodeSchema = {
        id: "/nodeSchema",
        type: "object",
        properties: {
          id: { type: "integer" },
          content: { type: 'string' },
          title: { type: 'string' },
          foo: { type: 'string' },
          tags: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        required: ['id', 'tags', 'title', 'body', 'foo']
      };

      beforeEach(function () {
        post = Factory.build('post', {tags: ['dude']});
        renderer = new Renderer('posts/show', post);
      });

      it('returns just a object', function () {
        return renderer.render().then(function (data) {
          expect(data).not.to.be.an(Array);
        });
      });

      context('takes', function () {
        context('options', function () {
          context('locals', function () {
            it("doesn't have hiddenFoo property", function () {
              return renderer.render().then(function (data) {
                expect(data).not.to.have.property('hiddenFoo');
              });
            });
          });
        });
          
        it('adds a custom node even after #takes has finished', function () {
          return renderer.render().then(function (data) {
            expect(data.foo).to.eql('bar');
          });
        });
      });

      it('has no errors', function () {
        return renderer.render().then(function (data) {
          var validate = json.validate(data, nodeSchema);
          expect(validate.errors).to.eql([]);
        });
      });
    });

    context('node + attribute', function () {
      var nodeSchema = {
        id: "/nodeSchema",
        type: "object",
        properties: {
          id: { type: "integer" },
          content: { type: 'string' },
          title: { type: 'string' },
          foo: { type: 'string' },
          tags: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        required: ['id', 'tags', 'title', 'body', 'foo']
      };

      it('creates json object', function () {
        return renderer.render().then(function (data) {
          expect(data).to.be.an.Array;
        });
      });

      it('has one object', function () {
        return renderer.render().then(function (data) {
          expect(data.length).to.eql(1);
        })
      });

      return it('has no errors', function () {
        return renderer.render().then(function (data) {
          var validate = json.validate(data[0], nodeSchema);
          expect(validate.errors).to.eql([]);
        });
      });
    });

    context('node', function () {
      var nodeSchema = {
        id: "/nodeSchema",
        type: "object",
        properties: {
          id: { type: "integer" },
          tags: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        required: ['id', 'tags']
      };

      it('creates json array', function () {
        return renderer.render().then(function (data) {
          expect(data).to.be.an.Array;
        });
      });

      it('has one object', function () {
        return renderer.render().then(function (data) {
          expect(data.length).to.eql(1);
        });
      });

      it('has no errors', function () {
        return renderer.render().then(function (data) {
          var validate = json.validate(data[0], nodeSchema);
          expect(validate.errors).to.eql([]);
        });
      });
    });

    context('attributes', function () {
      var nodeSchema = {
        id: "/attributesSchema",
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          content: { type: "string" }
        },
        required: ["id", "title", "body"]
      };

      context('when "post.content" is "undefined"', function () {
        beforeEach(function () {
          post = Factory.build('post', { content: undefined });
          renderer = new Renderer('posts/index', [post]);
        });

        it('should have "body" set as "null", because "content" has been mapped as "body"', function () {
          return renderer.render().then(function (data) {
            expect(data[0].body).to.be(null);
          });
        });
      });

      context('function as attribute', function () {
        beforeEach(function () {
          post = Factory.build('post', { title() { return 'Meow'; }});
          renderer = new Renderer('posts/index', [post]);
        });

        it('title is Meow', function () {
          return renderer.render().then(function (data) {
            expect(data[0].title).to.eql('Meow');
          });
        });
      });

      it('creates json array', function () {
        return renderer.render().then(function (data) {
          expect(data).to.be.an.Array;
        });
      });

      it('has one object', function () {
        renderer.render().then(function (data) {
          expect(data.length).to.eql(1);
        });
      });

      it('has no errors', function () {
        return renderer.render().then(function (data) {
          var validate = json.validate(data[0], nodeSchema);
          expect(validate.errors).to.eql([]);
        });
      });
    });
  });
});
