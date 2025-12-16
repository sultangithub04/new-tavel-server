import { prisma } from "../../shared/prisma";


const createTravelPlan = async (payload: any) => {
  const result = await prisma.travelPlan.create({
    data: {
      travellerId: payload.travellerId,
      title: payload.title,
      destination: payload.destination,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      budgetMin: Number(payload.budgetMin) ?? null,
      budgetMax: Number(payload.budgetMax) ?? null,
      travelType: payload.travelType,
      description: payload.description || null,
    },
  });

  return result;
};

const getAllTravelPlans = async () => {
  const result = await prisma.travelPlan.findMany({
    include: {
      traveller: true,
      reviews: true,
      matchRequests: true,

    },
  });

  return result;
};

const getSingleTravelPlan = async (id: string) => {
  const result = await prisma.travelPlan.findUnique({
    where: { id: Number(id) },
    include: {
      traveller: true,
      reviews: true,
      matchRequests: true,


    },
  });

  return result;
};

const updateTravelPlan = async (id: string, payload: any) => {
  const result = await prisma.travelPlan.update({
    where: { id: Number(id) },
    data: {

      title: payload.title,
      destination: payload.destination,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      budgetMin: payload.budgetMin ?? null,
      budgetMax: payload.budgetMax ?? null,
      travelType: payload.travelType,
      description: payload.description || null,
    },
  });

  return result;
};

const deleteTravelPlan = async (id: string) => {
  const result = await prisma.travelPlan.delete({
    where: { id: Number(id) },
  });

  return result;
};

export const TravelPlanService = {
  createTravelPlan,
  getAllTravelPlans,
  getSingleTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
};
