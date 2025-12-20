import { PaymentStatus, UserRole } from "@prisma/client";
import { prisma } from "../../shared/prisma";


const getAdminMetaData = async () => {
    const appointmentCount = await prisma.admin.count();
    const travellerCount = await prisma.traveller.count();
    const travelPlanCount = await prisma.travelPlan.count();
    const paymentCount = await prisma.payment.count();

    

    const totalRevenue = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
            status: PaymentStatus.PAID
        }
    });

    // const barChartData = await getBarChartData();
    // const pieCharData = await getPieChartData();

    return { appointmentCount, travellerCount, travelPlanCount, paymentCount, totalRevenue}
}

// const getDoctorMetaData = async (user: IAuthUser) => {
//     const travellerData = await prisma.traveller.findUniqueOrThrow({
//         where: {
//             email: user?.email
//         }
//     });

//     const appointmentCount = await prisma.travelPlan.count({
//         where: {
//             doctorId: doctorData.id
//         }
//     });

//     const patientCount = await prisma.payment.groupBy({
//         by: ['patientId'],
//         _count: {
//             id: true
//         }
//     });

//     const reviewCount = await prisma.review.count({
//         where: {
//             doctorId: doctorData.id
//         }
//     });

//     const totalRevenue = await prisma.payment.aggregate({
//         _sum: {
//             amount: true
//         },
//         where: {
//             appointment: {
//                 doctorId: doctorData.id
//             },
//             status: PaymentStatus.PAID
//         }
//     });

//     const appointmentStatusDistribution = await prisma.appointment.groupBy({
//         by: ['status'],
//         _count: { id: true },
//         where: {
//             doctorId: doctorData.id
//         }
//     });

//     const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(({ status, _count }) => ({
//         status,
//         count: Number(_count.id)
//     }))

//     return {
//         appointmentCount,
//         reviewCount,
//         patientCount: patientCount.length,
//         totalRevenue,
//         formattedAppointmentStatusDistribution
//     }
// }

// const getPatientMetaData = async (user: IAuthUser) => {
//     const patientData = await prisma.patient.findUniqueOrThrow({
//         where: {
//             email: user?.email
//         }
//     });

//     const appointmentCount = await prisma.appointment.count({
//         where: {
//             patientId: patientData.id
//         }
//     });

//     const prescriptionCount = await prisma.prescription.count({
//         where: {
//             patientId: patientData.id
//         }
//     });

//     const reviewCount = await prisma.review.count({
//         where: {
//             patientId: patientData.id
//         }
//     });

//     const appointmentStatusDistribution = await prisma.appointment.groupBy({
//         by: ['status'],
//         _count: { id: true },
//         where: {
//             patientId: patientData.id
//         }
//     });

//     const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(({ status, _count }) => ({
//         status,
//         count: Number(_count.id)
//     }))

//     return {
//         appointmentCount,
//         prescriptionCount,
//         reviewCount,
//         formattedAppointmentStatusDistribution
//     }
// }

// const getBarChartData = async () => {
//     const appointmentCountByMonth: { month: Date, count: bigint }[] = await prisma.$queryRaw`
//         SELECT DATE_TRUNC('month', "createdAt") AS month,
//         CAST(COUNT(*) AS INTEGER) AS count
//         FROM "TravelPlan"
//         GROUP BY month
//         ORDER BY month ASC
//     `

//     return appointmentCountByMonth;
// };

// const getPieChartData = async () => {
//     const appointmentStatusDistribution = await prisma.travelPlan.groupBy({
//         by: ['status'],
//         _count: { id: true }
//     });

//     const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(({ status, _count }) => ({
//         status,
//         count: Number(_count.id)
//     }));

//     return formattedAppointmentStatusDistribution;
// }

export const MetaService = {
    getAdminMetaData
}