import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { MatchRequestService } from "./matchRequest.service";
import sendResponse from "../../shared/sendResponse";


const createMatchRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchRequestService.createMatchRequest(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Match request created successfully!",
    data: result,
  });
});

const getAllMatchRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchRequestService.getAllMatchRequests();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Match requests fetched successfully!",
    data: result,
  });
});

const getSingleMatchRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchRequestService.getSingleMatchRequest(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Match request fetched successfully!",
    data: result,
  });
});

const updateMatchRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchRequestService.updateMatchRequest(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Match request updated successfully!",
    data: result,
  });
});

const deleteMatchRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchRequestService.deleteMatchRequest(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Match request deleted successfully!",
    data: result,
  });
});

export const MatchRequestController = {
  createMatchRequest,
  getAllMatchRequests,
  getSingleMatchRequest,
  updateMatchRequest,
  deleteMatchRequest,
};
