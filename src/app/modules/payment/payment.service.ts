import Stripe from "stripe";
import { stripe } from "../../helper/stripe";
import { prisma } from "../../shared/prisma";
import { v4 as uuidv4 } from 'uuid';
import { PaymentStatus } from "@prisma/client";


// export const createPayment = async (payload: any) => {
//   console.log(payload);

//   // 1️⃣ Create payment record in database
//   const payment = await prisma.payment.create({
//     data: payload
//   });

//   // 2️⃣ Create Stripe checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     customer_email: payload.email,
//     line_items: [
//       {
//         price_data: {
//           currency: "bdt",
//           product_data: {
//             name: `Subscribe by ${payload.name}`,
//           },
//           unit_amount: payload.amount * 100, // amount in smallest currency unit
//         },
//         quantity: 1,
//       },
//     ],
//     payment_intent_data: {
//       metadata: {
//         paymentId: payment.id,
//         userId: payload.travelPlanId,

//       },
//     },
//     // metadata: {
//     //   paymentId: payment.id, // link to DB payment
//     //   userId: payload.travelPlanId,

//     // },
//     success_url: `https://fontnew.vercel.app/success`,
//     cancel_url: `https://fontnew.vercel.app/cancel`,
//   });
//   console.log(session);
//   // 3️⃣ Return Stripe session URL to frontend
//   return session.url;
// };
export const createPayment = async (payload: any) => {
  const payment = await prisma.payment.create({
    data: payload,
  });

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
          unit_amount: payload.amount * 100,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        paymentId: String(payment.id),
        travelPlanId: String(payload.travelPlanId),
      },
    },
    success_url: "https://fontnew.vercel.app/success",
    cancel_url: "https://fontnew.vercel.app/cancel",
  });

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
// const handleStripeWebhookEvent = async (event: Stripe.Event) => {
//   console.log("🔥 Webhook Event Type:", event.type);
//   console.log("📦 Metadata:", event.data.object);
//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object as any;


//       const subscriberId = session.metadata?.travelPlanId;
//       const paymentId = session.metadata?.paymentId;

//       await prisma.travelPlan.update({
//         where: {
//           id: Number(subscriberId)
//         },
//         data: {
//           status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID
//         }
//       })
//       await prisma.payment.update({
//         where: {
//           id: Number(paymentId)
//         },
//         data: {
//           status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,

//         }
//       })

//       break;
//     }

//     default:
//       console.log(`ℹ️ Unhandled event type: ${event.type}`);
//   }
// };
// const handleStripeWebhookEvent = async (event: Stripe.Event) => {
//   console.log("🔥 Webhook Event Type:", event.type);

//   if (event.type !== "checkout.session.completed") {
//     console.log(`ℹ️ Unhandled event type: ${event.type}`);
//     return;
//   }

//   const session = event.data.object as Stripe.Checkout.Session;

//   // ✅ payment_intent ID MUST be string
//   if (!session.payment_intent || typeof session.payment_intent !== "string") {
//     console.error("❌ Missing payment_intent on session");
//     return;
//   }

//   // ✅ Retrieve PaymentIntent correctly
//   const paymentIntent = await stripe.paymentIntents.retrieve(
//     session.payment_intent
//   );

//   const paymentId = paymentIntent.metadata?.paymentId;
//   const travelPlanId = paymentIntent.metadata?.travelPlanId;

//   if (!paymentId || !travelPlanId) {
//     console.error("❌ Missing metadata:", paymentIntent.metadata);
//     return;
//   }

//   // ✅ Idempotency check
//   const existingPayment = await prisma.payment.findUnique({
//     where: { id: Number(paymentId) },
//   });

//   if (!existingPayment) {
//     console.error("❌ Payment not found:", paymentId);
//     return;
//   }

//   if (existingPayment.status === PaymentStatus.PAID) {
//     console.log("ℹ️ Payment already processed");
//     return;
//   }

//   // ✅ Atomic update
//   await prisma.$transaction([
//     prisma.payment.update({
//       where: { id: Number(paymentId) },
//       data: { status: PaymentStatus.PAID },
//     }),
//     prisma.travelPlan.update({
//       where: { id: Number(travelPlanId) },
//       data: { status: PaymentStatus.PAID },
//     }),
//   ]);

//   console.log("✅ Payment & TravelPlan updated successfully");
// };

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  console.log("🔥 Webhook Event Type:", event.type);

  switch (event.type) {

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const paymentId = paymentIntent.metadata?.paymentId;
      const travelPlanId = paymentIntent.metadata?.travelPlanId;

      if (!paymentId || !travelPlanId) {
        console.error("❌ Missing metadata:", paymentIntent.metadata);
        return;
      }

      const existingPayment = await prisma.payment.findUnique({
        where: { id: Number(paymentId) },
      });

      if (!existingPayment) {
        console.error("❌ Payment not found:", paymentId);
        return;
      }

      if (existingPayment.status === PaymentStatus.PAID) {
        console.log("ℹ️ Already processed");
        return;
      }

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: Number(paymentId) },
          data: { status: PaymentStatus.PAID },
        }),
        prisma.travelPlan.update({
          where: { id: Number(travelPlanId) },
          data: { status: PaymentStatus.PAID },
        }),
      ]);

      console.log("✅ Payment processed successfully");
      break;
    }

    case "payment_intent.created":
      console.log("ℹ️ PaymentIntent created");
      break;

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
