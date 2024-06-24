import { Router } from "express";
import prisma from "../config/prisma";
import { UserRequest } from "../types";
import ApiResponse from "../utils/ApiResponse";
import { handleErrorResponse } from "../utils/errorHandler";
import { postSchema } from "../validations/schemas";

const PostRouter = Router();

PostRouter.get("/", async (req: UserRequest, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to fetch all posts' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },
    });
    const newPosts = posts.map((post) => {
      const isMine = post.authorId === req.user?.id;
      return { ...post, isMine };
    });
    res
      .status(200)
      .json(new ApiResponse(newPosts, "Posts fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

PostRouter.get("/byId/:id", async (req, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description =''Fetch Post by Id' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!post)
      return res
        .status(404)
        .json(new ApiResponse(null, "Post not found", false));
    res
      .status(200)
      .json(new ApiResponse(post, "Post fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

PostRouter.post("/", async (req: UserRequest, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to create a new post' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const { content, title, image, videoUrl } = req.body;
    console.log(req.body);
    await postSchema.parseAsync({ content, title, image: image, videoUrl });
    const post = await prisma.post.create({
      data: {
        content,
        title,
        image,
        videoUrl,
        authorId: req.user.id,
      },
    });
    res
      .status(201)
      .json(new ApiResponse(post, "Post created successfully", true));
  } catch (error: any) {
    console.log(error);
    handleErrorResponse(res, error);
  }
});

// delete post (check if user is the author)
PostRouter.delete("/:id", async (req: UserRequest, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to delete a post' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        comments: true,
        author: true,
      },
    });
    if (!post)
      return res
        .status(404)
        .json(new ApiResponse(null, "Post not found", false));
    if (post.authorId !== req.user.id)
      return res
        .status(403)
        .json(
          new ApiResponse(
            null,
            "You are not authorized to delete this post",
            false
          )
        );
    await prisma.comment.deleteMany({
      where: {
        postId: req.params.id,
      },
    });
    await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(null, "Post deleted successfully", true));
  } catch (error: any) {
    console.log("ERRRR", error);

    handleErrorResponse(res, error);
  }
});

// update post (check if user is the author)
PostRouter.put("/:id", async (req: UserRequest, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to update a post' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const { content, title, image, videoUrl } = req.body;
    await postSchema.parseAsync({ content, title });
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!post)
      return res
        .status(404)
        .json(new ApiResponse(null, "Post not found", false));
    if (post.authorId !== req.user.id)
      return res
        .status(403)
        .json(
          new ApiResponse(
            null,
            "You are not authorized to update this post",
            false
          )
        );
    const updatedPost = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        content,
        title,
        image,
        videoUrl,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(updatedPost, "Post updated successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

// get my posts
PostRouter.get("/my-posts", async (req: UserRequest, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to fetch all posts of the logged in user' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.user.id,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(posts, "Posts fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

// get post comments /:id/comments
PostRouter.get("/:id/comments", async (req, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to fetch all comments for a post' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.params.id,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(comments, "Comments fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

// get posts by user /byUser/:id
PostRouter.get("/byUser/:id", async (req, res) => {
  /* #swagger.tags = ['Post'] */
  /* #swagger.description = 'Endpoint to fetch all posts of a user' */
  /* #swagger.security = [{
            "authToken": []
    }] */
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.params.id,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(posts, "Posts fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

export default PostRouter;
