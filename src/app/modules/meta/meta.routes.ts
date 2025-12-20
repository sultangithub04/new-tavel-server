import express from 'express';
import { MetaController } from './meta.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.TRAVELLER, UserRole.ADMIN),
    MetaController.fetchDashboardMetaData
)


export const MetaRoutes = router;