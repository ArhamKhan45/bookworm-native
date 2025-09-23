import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  createBook,
  getAllBooks,
  getUserBooks,
  deleteBook,
} from "../controllers/book.js";

const router = express.Router();

router.post("/", protectRoute, createBook);
router.get("/", protectRoute, getAllBooks);
router.get("/user", protectRoute, getUserBooks);
router.delete("/:id", protectRoute, deleteBook);

export default router;
