import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { NextPage } from "next";

interface Props {
    children: React.ReactNode;
}
const WebsiteLayout: NextPage<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className='min-h-screen'>{children}</main>
            <Footer />
        </>
    );
};

export default WebsiteLayout;
