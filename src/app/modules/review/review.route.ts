import express from "express";
import { ReviewController } from "./review.controller";


const router = express.Router();

router.post("/", ReviewController.createReview);//8
router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getSingleReview);
router.patch("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

export const ReviewRoutes = router;
