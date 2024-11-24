import WebsiteLayout from "@/components/layouts/websiteLayout";
import { NextPage } from "next";
import React from "react";

interface Props {
    children: React.ReactNode;
}
const layout: NextPage<Props> = ({ children }) => {
    return <WebsiteLayout>{children}</WebsiteLayout>;
};

export default layout;
