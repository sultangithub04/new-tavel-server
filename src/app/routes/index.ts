import express from 'express';
import { userRoute } from '../modules/user/user.route';


import { authRoutes } from '../modules/auth/auth.routes';
import { MetaRoutes } from '../modules/meta/meta.routes';
import { TravelPlanRoutes } from '../modules/plan/travelPlan.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { PaymentRoutes } from '../modules/payment/payment.route';



const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/travel-plans',
        route: TravelPlanRoutes
    },
    {
        path: '/reviews',
        route: ReviewRoutes
    },
    {
        path: '/payments',
        route: PaymentRoutes
    },
    {
        path: '/meta',
        route: MetaRoutes
    },

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;