import { Router } from "express";
import prisma from "../config/prisma";
import { UserRequest } from "../types";
import ApiResponse from "../utils/ApiResponse";
import { handleErrorResponse } from "../utils/errorHandler";
import { commentSchema } from "../validations/schemas";

const CommentRouter = Router();

CommentRouter.get("/:postId", async (req, res) => {
  /* #swagger.tags = ['Comment'] */
  /* #swagger.description = 'Endpoint to fetch all comments for a post' */
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.params.postId,
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });
    res
      .status(200)
      .json(new ApiResponse(comments, "Comments fetched successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

CommentRouter.post("/", async (req: UserRequest, res) => {
  /* #swagger.tags = ['Comment'] */
  /* #swagger.description = 'Endpoint to create a new comment' */
  try {
    const { content, postId } = req.body;
    await commentSchema.parseAsync({ content, postId });
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.user.id,
      },
    });
    res
      .status(201)
      .json(new ApiResponse(comment, "Comment created successfully", true));
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
});

export default CommentRouter;
