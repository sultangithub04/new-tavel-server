import { prisma } from "../../shared/prisma";


const createMatchRequest = async (payload: any) => {
  return prisma.matchRequest.create({
    data: {
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      planId: payload.planId,
      status: payload.status || "PENDING",
    },
  });
};

const getAllMatchRequests = async () => {
  return prisma.matchRequest.findMany({
    include: {
      sender: true,
      receiver: true,
      travelPlan: true,
    },
  });
};

const getSingleMatchRequest = async (id: string) => {
  return prisma.matchRequest.findUnique({
    where: { id: Number(id) },
    include: {
      sender: true,
      receiver: true,
      travelPlan: true,
    },
  });
};

const updateMatchRequest = async (id: string, payload: any) => {
  return prisma.matchRequest.update({
    where: { id: Number(id) },
    data: payload,
  });
};

const deleteMatchRequest = async (id: string) => {
  return prisma.matchRequest.delete({
    where: { id: Number(id) },
  });
};

export const MatchRequestService = {
  createMatchRequest,
  getAllMatchRequests,
  getSingleMatchRequest,
  updateMatchRequest,
  deleteMatchRequest,
};
