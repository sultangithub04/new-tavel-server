import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ReviewService } from "./review.service";
import sendResponse from "../../shared/sendResponse";


const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully!",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews fetched successfully!",
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getSingleReview(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review fetched successfully!",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.updateReview(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully!",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.deleteReview(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully!",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
