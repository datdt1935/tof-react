import React from "react";

export enum PUBLIC_ROUTES {
    Login = "/login",
}

export enum PRIVATE_ROUTES {
    Home = "/",
}

export const SIDE_BAR = [
    {
        keyi18n: "home",
        linkTo: PRIVATE_ROUTES.Home,
        isCheckRole: true,
    },
];
