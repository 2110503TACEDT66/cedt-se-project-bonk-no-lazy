import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            companyID: string
            _id: string,
            name: string,
            tel: string,
            email: string,
            role: string,
            profile_picture: string,
            createdAt: string,
            token: string
        }
    }
}