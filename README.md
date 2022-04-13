# social-media

Backend api for scoial media for create new post, comment on post, like on post, like on comment

Register user
http://localhost:8080/api/authsystem/register
method: post data:json
{
"username":"Vishal",
"firstName":"Vishal",
"email":"vishal@gmail.com",
"password":"vishaldesai"
}

Upload Post
http://localhost:8080/api/posts/uploadpost
method: post data:json
{
"author":"625517b70dde673bd09eda53",
"title":"My seconf Post",
"content":"traveling in mumbai"
}

get home page posts:
http://localhost:8080/api/posts/feed
method: post data:json

{
"userId":"62551697714f7c0df848fd68"
}
