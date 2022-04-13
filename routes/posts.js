const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

// upload new post=> [/api/posts/uploadpost]
router.post("/uploadPost", async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    if (user == null) throw "user id or author not found";
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    //update user's latest activity
    const activity = {
      category: "post",
      referenceId: savedPost._id,
      parentId: null,
    };
    await user.updateOne({ $push: { activity: activity } });
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update like, dislike on post => [/api/posts/:id/likepost]]
router.post("/:id/likePost", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user == null) throw "user id or author not found";

    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      //update likes of post
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked");

      //update user latest activity
      const activity = {
        category: "like",
        referenceId: post._id,
        parentId: null,
      };
      await user.updateOne({ $push: { activity: activity } });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post unliked");

      //remove unliked post from users activity
      for (const activity of user.activity) {
        if (
          activity.referenceId.toString() === post._id.toString() &&
          activity.category.toString() === "like"
        ) {
          // console.log("true condition");
          await user.updateOne({ $pull: { activity: activity } });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add comment on post=> [/api/posts/:id/comment]
router.post("/:id/comment", async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    if (user == null) throw "user id or author not found";

    const post = await Post.findById(req.params.id);
    if (post == null) throw "tring to comment on incorrect post";

    req.body["parentId"] = req.params.id;
    const comment = new Comment(req.body);
    await comment.save();
    await post.updateOne({ $push: { comments: comment } });

    //update user activity, commented on posts
    const activity = {
      category: "comment",
      referenceId: comment._id,
      parentId: post._id,
    };
    await user.updateOne({ $push: { activity: activity } });

    res.status(200).json("commented on post success");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// like on comments => [/api/posts/comment/:id/like]
router.post("/comment/:id/like", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user == null) throw "user id or author not found";

    const comment = await Comment.findById(req.params.id);
    if (comment == null) throw "comment not found";

    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("comment liked");

      const activity = {
        category: "like",
        referenceId: comment._id,
        parentId: comment.parentId,
      };

      await user.updateOne({ $push: { activity: activity } });
    } else {
      //remove from posts comment like
      await comment.updateOne({ $pull: { likes: req.body.userId } });

      //remove unliked post from users activity
      for (const activity of user.activity) {
        if (
          activity.referenceId.toString() === comment._id.toString() &&
          activity.parentId.toString() === comment.parentId.toString() &&
          activity.category.toString() === "like"
        ) {
          // console.log("true condition");
          await user.updateOne({ $pull: { activity: activity } });
        }
      }

      res.status(200).json("comment unliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//all feed posts=> [/api/feed]
router.post("/feed", async (req, res) => {
  try {
    //users self posts
    const user = await User.findById(req.body.userId);
    if (user == null) throw "User id or author not found";

    const userPosts = await Post.find({ author: user._id });
    if (userPosts == null) throw "User dont have posts";

    //followings members posts
    if (user.followings !== undefined) {
      followersPost = await Promise.all(
        user.followings.map((followerId) => {
          return Post.find({ author: followerId });
        })
      );
    }

    //mix all posts
    const allPosts = userPosts.concat(...followersPost);
    if (allPosts.length !== 0) {
      res.json(allPosts);
    } else {
      res.status(200).send("No post to shows, follow some friends");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get users liking my post=> [/api/post/id:/getlikes]
router.get("/:id/getlikes", async (req, res) => {
  try {
    const postId = req.params.id;
    const userPost = await Post.findById(postId);

    // get users data from user ids
    allUsers = await Promise.all(
      userPost.likes.map(async (userId) => {
        const userData = await User.findById(userId);
        return {
          userId: userData._id,
          username: userData.username,
          firstName: userData.firstName,
        };
      })
    );
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get users liking my comments on any post=> [/api/post/comment/:id/getlikes]
router.get("/comment/:id/getlikes", async (req, res) => {
  try {
    const commentId = req.params.id;
    const userComment = await Comment.findById(commentId);
    if (userComment == null) throw "comment not found";

    // get users data from user ids
    allUsers = await Promise.all(
      userComment.likes.map(async (userId) => {
        const userData = await User.findById(userId);
        return {
          userId: userData._id,
          username: userData.username,
          firstName: userData.firstName,
        };
      })
    );
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json("comment not found");
  }
});

//get users commenting on my post=> [/api/post/:id/getcomments]
router.get("/:id/getcomments", async (req, res) => {
  try {
    const postId = req.params.id;

    const userPost = await Post.findById(postId);
    if (userPost == null) throw "User dont have post";

    //get all comments data from comment ids
    allComments = await Promise.all(
      userPost.comments.map(async (commentId) => {
        const commentData = await Comment.findById(commentId);
        return commentData;
      })
    );
    res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
    res.status(500).json("Incorrect post");
  }
});

module.exports = router;
