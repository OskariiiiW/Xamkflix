'use client'

import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import { useState } from "react";

export const config = {
    matcher : [
        '/((?!login|favicon.ico|_next).*)'
    ]
}

//const [session, setSession] = useState<Boolean>(false);

export async function middleware(req : NextRequest) : Promise<NextResponse> {

    const res : NextResponse = NextResponse.next();

    const supabase = createMiddlewareClient({req, res});

    const {data} = await supabase.auth.getSession();

    //lisaa register ja resetpassword sivut sallittujen listalle
    if (req.nextUrl.pathname.startsWith('/register') 
        || req.nextUrl.pathname.startsWith('/resetpassword') 
        || req.nextUrl.pathname.startsWith('/admin')) {

        //setSession(true);
        return res;

    } else if (!data.session) {

        //setSession(false);
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";

        return NextResponse.redirect(loginUrl);

    } else {

        return res;

    }
}

/* 
export const sessionState = () => {

    return session;

}*/