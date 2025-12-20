import Stripe from "stripe";
import { stripe } from "../../helper/stripe";
import { prisma } from "../../shared/prisma";
import { v4 as uuidv4 } from 'uuid';
import { PaymentStatus } from "@prisma/client";


export const createPayment = async (payload: any) => {
  console.log(payload);

  // 1️⃣ Create payment record in database
  const payment = await prisma.payment.create({
    data: payload
  });

  // 2️⃣ Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: payload.email,
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: `Subscribe by ${payload.name}`,
          },
          unit_amount: payload.amount * 100, // amount in smallest currency unit
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        paymentId: payment.id,
        userId: payload.travelPlanId,

      },
    },
    // metadata: {
    //   paymentId: payment.id, // link to DB payment
    //   userId: payload.travelPlanId,

    // },
    success_url: `https://fontnew.vercel.app/success`,
    cancel_url: `https://fontnew.vercel.app/cancel`,
  });
  console.log(session);
  // 3️⃣ Return Stripe session URL to frontend
  return session.url;
};

const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: { traveller: true },
  });
};

const getSinglePayment = async (id: string) => {
  return prisma.payment.findUnique({
    where: { id: Number(id) },
    include: { traveller: true },
  });
};

const updatePayment = async (id: string, payload: any) => {
  return prisma.payment.update({
    where: { id: Number(id) },
    data: payload,
  });
};

const deletePayment = async (id: string) => {
  return prisma.payment.delete({
    where: { id: Number(id) },
  });
};
// pament
const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  console.log("🔥 Webhook Event Type:", event.type);
  console.log("📦 Metadata:", event.data.object);
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;

      const paymentIntent = await stripe.paymentIntents.retrieve(session.metadata);
      const subscriberId = paymentIntent.metadata?.userId;
      const paymentId = paymentIntent.metadata?.paymentId;

      await prisma.travelPlan.update({
        where: {
          id: Number(subscriberId)
        },
        data: {
          status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID
        }
      })
      await prisma.payment.update({
        where: {
          id: Number(paymentId)
        },
        data: {
          status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,

        }
      })

      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }
};

export const PaymentService = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment, handleStripeWebhookEvent
};
