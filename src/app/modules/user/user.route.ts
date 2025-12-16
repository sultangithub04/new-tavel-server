import express, { NextFunction, Request, Response } from "express"
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";

import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerUpload } from "../../../config/multer.config";
const router = express.Router()

router.get('/me', auth(UserRole.ADMIN, UserRole.TRAVELLER), UserController.getMyProfile)
router.post("/create-traveler", multerUpload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createTravallerValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createTravaller(req, res, next)
    }
)
router.post("/create-admin",auth(UserRole.ADMIN), multerUpload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createAdmin(req, res, next)
    }
)

router.get("/", UserController.getAllFromDB)
router.get("/travaller/:id", UserController.getTravallerById)
router.get("/:email", UserController.getUserByEmail)
router.get( '/:id', UserController.getMyProfile);//3
router.patch('/:id',  UserController.changeProfileStatus);//4


router.patch(
    '/:id/status',
    auth(UserRole.ADMIN),
    UserController.changeProfileStatus
);

router.patch(
    "/update-my-profile",
    auth(UserRole.ADMIN, UserRole.TRAVELLER),
    multerUpload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        return UserController.updateMyProfie(req, res, next)
    }
);
export const userRoute = router;