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

=======
