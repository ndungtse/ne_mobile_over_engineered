import { Router } from "express";
import AuthRouter from "./controllers/auth.controller";
import userRouter from "./controllers/user.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import PostRouter from "./controllers/post.controller";
import CommentRouter from "./controllers/comment.controller";

const router = Router();

router.use("/api/auth", AuthRouter);
router.use("/api/user", authMiddleware, userRouter);
router.use("/api/posts", authMiddleware, PostRouter);
router.use("/api/comments", authMiddleware, CommentRouter);

export default router;
