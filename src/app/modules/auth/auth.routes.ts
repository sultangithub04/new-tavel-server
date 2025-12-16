import express, { NextFunction, Request, Response } from 'express'
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import { multerUpload } from '../../../config/multer.config';


const router = express.Router();

router.get(
    "/me",
    AuthController.getMe
)
router.get(
    "/alluser",
    AuthController.getAllUser
)

router.post("/register", multerUpload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createTravallerValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createTravaller(req, res, next)
    }
)


router.post(
    "/login",
    AuthController.login
)


router.post(
    '/refresh-token',
    AuthController.refreshToken
)

router.post(
    '/change-password',
    auth(
        UserRole.ADMIN,
        UserRole.TRAVELLER

    ),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    AuthController.forgotPassword
);

router.post(
    '/reset-password',
    AuthController.resetPassword
)


export const authRoutes = router;