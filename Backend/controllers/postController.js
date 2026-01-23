import Notification from "../models/notificationModel.js";
import Post from "../models/postModel.js";

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: { $in: [...req.user.connections, req.user._id] },
    })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getFeedPosts controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    let newPost = new Post({
      author: req.user._id,
      content,
      image,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log("Error in createPost controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if the current user is the author of the posts
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post Delete Sucessfully" });
  } catch (err) {
    console.log("Error in deletePost controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");
    res.status(200).json(post);
  } catch (err) {
    console.log("Error in getPostById controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { user: req.user._id, content } },
      },
      { new: true },
    ).populate("author", "name email username headline profilePicture");

    // create a notification if the comment owner is not the post owner
    if (post.author._id.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comment",
        relatedUser: req.user._id,
        relatedPost: postId,
      });
      await newNotification.save();
    }

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getPostById controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      // unlike the post
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      // like the post
      post.likes.push(userId);
      //create a notification if the post owner is not the user who liked
      if (post.author.toString() !== userId.toString()) {
        const newNotification = new Notification({
          recipient: post.author,
          type: "like",
          relatedUser: userId,
          reletedPost: postId,
        });
        await newNotification.save();
      }
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in likePost controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
