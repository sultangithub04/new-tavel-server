import express from "express";
import { TravelPlanController } from "./travelPlan.controller";


const router = express.Router();

router.post("/", TravelPlanController.createTravelPlan);//5
router.get("/", TravelPlanController.getAllTravelPlans);//6
router.get("/match", TravelPlanController.getAllTravelPlans);//7
router.get("/:id", TravelPlanController.getSingleTravelPlan);
router.patch("/:id", TravelPlanController.updateTravelPlan);
router.delete("/:id", TravelPlanController.deleteTravelPlan);

export const TravelPlanRoutes = router;
