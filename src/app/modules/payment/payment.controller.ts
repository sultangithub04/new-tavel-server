import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../shared/sendResponse";
import { stripe } from "../../helper/stripe";
import config from "../../../config";


const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPayment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Payment created successfully!",
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payments fetched successfully!",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getSinglePayment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment fetched successfully!",
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.updatePayment(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment updated successfully!",
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.deletePayment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment deleted successfully!",
    data: result,
  });
});
// webhook
const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {

    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = config.stripeWebHookSecret as string;

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const result = await PaymentService.handleStripeWebhookEvent(event);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Webhook req send successfully',
        data: result,
    });
});
export const PaymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,handleStripeWebhookEvent
};
