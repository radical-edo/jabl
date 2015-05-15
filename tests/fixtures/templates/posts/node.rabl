collection posts

attributes :id, :title, :content

node :tags, (post) => {
  post.tags
}
