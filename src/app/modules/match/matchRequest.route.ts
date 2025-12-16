import express from "express";
import { MatchRequestController } from "./matchRequest.controller";


const router = express.Router();

router.post("/", MatchRequestController.createMatchRequest);
router.get("/", MatchRequestController.getAllMatchRequests);
router.get("/:id", MatchRequestController.getSingleMatchRequest);
router.put("/:id", MatchRequestController.updateMatchRequest);
router.delete("/:id", MatchRequestController.deleteMatchRequest);

export const MatchRequestRoutes = router;
