// import z from "zod";

// const createtravallerValidationSchema = z.object({
//     password: z.string(),
//     travaller: z.object({
//         name: z.string().nonempty("Name is required"),
//         email: z.string().nonempty("Email is required"),
//         address: z.string().optional()
//     })
// });
// export const UserValidation = {
//     createtravallerValidationSchema
// }

import z from "zod";

const createTravallerValidationSchema = z.object({
    password: z.string(),
    travaller: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().nonempty("Email is required"),
        address: z.string().optional(),
        bio: z.string().optional(),
        travelInterests: z.string().optional(),
        visitedCountries: z.string().optional(),
        currentLocation: z.string().optional(),
        
    })
});

const createAdminValidationSchema = z.object({
    password: z.string({
        error: "Password is required"
    }),
    admin: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "Email is required!"
        }),
        contactNumber: z.string({
            error: "Contact Number is required!"
        })
    })
});



export const UserValidation = {
    createTravallerValidationSchema,
    createAdminValidationSchema,

}