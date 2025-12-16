import { Request, Response } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";

import { paginationHelper } from "../../helper/paginationHelper";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import { multerUpload } from "../../../config/multer.config";





const createTravaller = async (req: Request) => {
    if (req.file) {
        // const uploadResult = await fileUploader.uploadToCludinary(req.file)
        req.body.travaller.profilePhoto = req.file?.path

    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.travaller.email,
                password: hashPassword
            }
        });
        return await tnx.traveller.create({
            data: req.body.travaller
        })
    })
    return result;

}
const createAdmin = async (req: Request) => {
    if (req.file) {
        
        req.body.admin.profilePhoto = req.file?.path

    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.admin.email,
                password: hashPassword,
                role: UserRole.ADMIN
            }
        });
        return await tnx.admin.create({
            data: req.body.admin
        })
    })
    return result;

}

const getAllFromDB = async (params: any, option: any) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(option)
    const { searchTerm, ...filterData } = params;
    const andCondition: Prisma.TravellerWhereInput[] = [];
    if (searchTerm) {
        andCondition.push({
            OR: ["email"].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }
    const whereConditions: Prisma.TravellerWhereInput = andCondition.length > 0 ? {
        AND: andCondition
    } : {}
    const result = await prisma.traveller.findMany({
        skip,
        take: limit,
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        },
        include:{
           
           
                    travelPlans:true
          
            
        }
    });



    const total = await prisma.traveller.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}
const getMyProfile = async (user: IJWTPayload) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        },


    })

    let profileData;

    if (userInfo.role === UserRole.TRAVELLER) {
        profileData = await prisma.traveller.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }

    else if (userInfo.role === UserRole.ADMIN) {
        profileData = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }

    return {
        ...userInfo,
        ...profileData
    };

};

const changeProfileStatus = async (id: string, payload: { status: UserStatus }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const updateUserStatus = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })

    return updateUserStatus;
};
const getUserByEmail = async (email: string) => {
    const result= await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }, 
        include:{
            traveller: {
                include: {
                    travelPlans: true,
                    reviewsGiven:true,
                    reviewsReceived: true
                    
                },
            
            },
            
            
 

        }
    })
    return result
};
const getTravallerById = async (id: string) => {
    const result= await prisma.traveller.findUniqueOrThrow({
        where: {
            id: id
        }, 
  
    })
    return result
};



const updateMyProfie = async (user: IJWTPayload, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    const file = req.file;
    if (file) {
    
        req.body.profilePhoto = file?.path;
    }

    let profileInfo;

    if (userInfo.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === UserRole.TRAVELLER) {
        profileInfo = await prisma.traveller.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }

    return { ...profileInfo };
}
export const UserService = {
    createTravaller,getTravallerById,
     getAllFromDB, getUserByEmail, createAdmin, getMyProfile, updateMyProfie, changeProfileStatus
}