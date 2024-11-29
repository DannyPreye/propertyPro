import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";
import { Organization } from "@/payload-types";

interface UserCredentials
{
    email: string;
    password: string;
}



interface User
{
    id: string;
    firstName: string;
    lastName: string;
    organization: Organization;
    phone: string;
    role: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    collection: string;
    loginAttempts: number;
}

interface AuthResponse
{
    message: string;
    exp: number;
    token: string;
    user: User;
}

interface RefreshTokenResponse
{
    token: string;
    exp: number;
}

declare module "next-auth" {
    interface Session
    {
        user: User & {
            token: string;
            exp: number;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT
    {
        user: User & {
            token: string;
            exp: number;
        };
    }
}

// Function to check if the token needs refresh
const shouldRefreshToken = (exp: number): boolean =>
{
    // Refresh if less than 5 minutes remaining
    const fiveMinutes = 5 * 60;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return exp - currentTimestamp < fiveMinutes;
};

// Function to refresh the token
const refreshToken = async (token: string): Promise<RefreshTokenResponse> =>
{
    try {
        const { data } = await axios.post<RefreshTokenResponse>(
            `${process.env.NEXTAUTH_URL}/api/users/refresh-token`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            }
        );
        return data;
    } catch (error: any) {
        console.error("Token refresh failed:", error?.response?.data);
        throw error;
    }
};

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req)
            {
                try {
                    if (!credentials) {
                        throw new Error("No credentials provided");
                    }

                    const { email, password } = credentials as UserCredentials;

                    const { data } = await axios.post<AuthResponse>(
                        `${process.env.NEXTAUTH_URL}/api/users/login?depth=1`,
                        { email, password }
                    );

                    console.log("This is ther user data", data);
                    if (data && data.user) {
                        const user = {
                            ...data.user,
                            organization: {
                                id: data.user.organization.id,
                                name: data.user.organization.name,
                                slug: data.user.organization.slug,

                            }
                        };
                        return {
                            ...user,
                            token: data.token,
                            exp: data.exp,
                        };
                    }

                    return null;
                } catch (error: any) {
                    console.error("Authorization error:", error);

                    const errors = error?.response?.data?.errors;
                    throw new Error(errors?.[ 0 ]?.message || error?.message || "Authentication failed");
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user })
        {
            if (user) {
                // Initial sign in
                token.user = user as any;
                return token;
            }

            // On subsequent calls, check if we need to refresh the token
            if (token.user && shouldRefreshToken(token.user.exp)) {
                try {
                    const { token: newToken, exp } = await refreshToken(token.user.token);
                    token.user.token = newToken;
                    token.user.exp = exp;
                } catch (error) {
                    // If refresh fails, return the original token
                    // The user might need to re-authenticate
                    console.error("Failed to refresh token:", error);
                    return token;
                }
            }

            return token;
        },
        async session({ session, token })
        {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        }
    },
    events: {
        async signOut({ token })
        {
            // Optionally handle any cleanup needed on sign out
            try {
                await axios.post(
                    `${process.env.NEXTAUTH_URL}/api/users/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token?.user?.token}`,
                        },
                    }
                );
            } catch (error) {
                console.error("Logout error:", error);
            }
        },
    },
    debug: process.env.NODE_ENV === "development",

    secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;

export const serverSession = (...args:
    | [ GetServerSidePropsContext[ "req" ], GetServerSidePropsContext[ "res" ] ]
    | [ NextApiRequest, NextApiResponse ]
    | []) =>
{
    return getServerSession(...args, authOptions);
};
