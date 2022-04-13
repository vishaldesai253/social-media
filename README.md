## Social-Media

Backend api for scoial media for create new Post, comment on Post, like on Post, like on comment

### Register user

http://localhost:8080/api/authsystem/register

Method: Post Data : Json

```http
{
  "username":"Vishal",
  "firstName":"Vishal",
  "email":"vishal@gmail.com",
  "password":"vishaldesai"
}
```

### Upload Post

http://localhost:8080/api/Posts/uploadPost

Method: Post Data : Json

```http
{
  "author":"625517b70dde673bd09eda53",
  "title":"My First Post",
  "content":"traveling in mumbai"
}
```

### Get home page Posts:

http://localhost:8080/api/Posts/feed

Method: Post Data : Json

```http
{
  "userId":"62551697714f7c0df848fd68"
}
```

## Like on post

http://localhost:8080/api/posts/625645a66c5e1a1e84d3de6f/likepost/

```http
{
"userId":"62556665f1a99c3b2ca137b7"
}
```

## Comment on post

http://localhost:8080/api/posts/62559708c22f6134347d0dd8/comment/

```http
{
    "comment":"congratulations",
    "author":"62556665f1a99c3b2ca137b7"
}
```

### Do like on comment

http://localhost:8080/api/posts/comment/62563688d9a0a941d8dd4619/like

```http
{
    "userId":"62556635f1a99c3b2ca137b5"
}
```

### Get comments of posts:

http://localhost:8080/api/posts/62559708c22f6134347d0dd8/getcomments

Here 62559708c22f6134347d0dd8 is post id

### Get likes of post

http://localhost:8080/api/posts/62559708c22f6134347d0dd8/getlikes

### Get likes of comment

http://localhost:8080/api/posts/comment/62563688d9a0a941d8dd4619/getlikes

=======
