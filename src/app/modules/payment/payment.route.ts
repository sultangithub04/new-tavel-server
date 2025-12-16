import express from "express";
import { PaymentController } from "./payment.controller";


const router = express.Router();

router.post("/create-intent", PaymentController.createPayment);//10
router.get("/", PaymentController.getAllPayments);
router.get("/:id", PaymentController.getSinglePayment);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);

export const PaymentRoutes = router;
