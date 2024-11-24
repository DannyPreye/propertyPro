import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";


const publicRoutes = [
    "/auth/sign-in",
    "/",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/about",
    "/blog",
    "/contact",
    "/properties"
];


const roleBase = {
    admin: [ '/admin' ],
    tenant: [ '/tenant' ]
};

export default withAuth(async function middleware(req: NextRequest)
{
    // @ts-ignore
    const token = req?.nextAuth?.token;
    const pathname = req.nextUrl.pathname;

    console.log("This is the token", token);
    console.log("This is the pathname", pathname);


    const tenantId = pathname.split(`/`)[ 1 ];

    // Allow public routes
    if (publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // GeT the user organization
    const userOrg = token.user.organization;

    // If the user does not have an organization, redirect back to login
    if (!userOrg) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Check if the user is trying to access the correct organization
    if (tenantId !== userOrg.slug) {
        // redirect them to the correct slug
        return NextResponse.redirect(new URL(`/${userOrg.slug}`, req.url));
    }


    // Handle the RBAC
    const userRole = token.user.role;

    if (userRole) {
        if (pathname.startsWith('/admin') && userRole !== "admin") {
            return NextResponse.redirect(new URL(`/${tenantId}`, req.url));
        }

        if (pathname.includes('/tenant') && ![ 'admin', 'tenant' ].includes(userRole)) {
            return NextResponse.redirect(new URL(`/${tenantId}`, req.url));
        }
    }

    return NextResponse.next();

}, {
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: [
        "/:path*/admin/:path*",
        "/:path*/tenant/:path*",
    ],
};
