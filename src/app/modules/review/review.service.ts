import { prisma } from "../../shared/prisma";


const createReview = async (payload: any) => {
  const result = await prisma.review.create({
    data: {
      reviewerId: payload.reviewerId,
      revieweeId: payload.revieweeId,
      planId: payload.planId,
      rating: payload.rating,
      comment: payload.comment || null,
    },
  });

  return result;
};

const getAllReviews = async () => {
  return prisma.review.findMany({
    include: {
      reviewer: true,
      reviewee: true,
      travelPlan: true,
    },
  });
};

const getSingleReview = async (id: string) => {
  return prisma.review.findUnique({
    where: { id: Number(id) },
    include: {
      reviewer: true,
      reviewee: true,
      travelPlan: true,
    },
  });
};

const updateReview = async (id: string, payload: any) => {
  return prisma.review.update({
    where: { id: Number(id) },
    data: payload,
  });
};

const deleteReview = async (id: string) => {
  return prisma.review.delete({
    where: { id: Number(id) },
  });
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
