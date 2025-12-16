import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { TravelPlanService } from "./travelPlan.service";
import sendResponse from "../../shared/sendResponse";


const createTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.createTravelPlan(req.body);
  

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Travel plan created successfully!",
    data: result,
  });
});

const getAllTravelPlans = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.getAllTravelPlans();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel plans fetched successfully!",
    data: result,
  });
});

const getSingleTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.getSingleTravelPlan(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single travel plan fetched successfully!",
    data: result,
  });
});

const updateTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.updateTravelPlan(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel plan updated successfully!",
    data: result,
  });
});

const deleteTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.deleteTravelPlan(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel plan deleted successfully!",
    data: result,
  });
});

export const TravelPlanController = {
  createTravelPlan,
  getAllTravelPlans,
  getSingleTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
};
