import { createContext } from "react";

export interface iScores {
    userSecurityScore: number,
    teamSecurityScore: number,
    orgSecurityScore: number,
}

export interface iTest {
    title: string,
    status: boolean,
    tag: string
}

export interface iUserInfo {
    displayName: string,
    userPrincipalName: string,
    imagePath: string,
    jobTitle: string,
    contactNumber: string,
    userType: string
}

export interface iData {
    userInfo: iUserInfo,
    scores: iScores,
    tests: iTest[]
}

/**
export interface iData {
    displayName: string,
    userPrincipalName: string,
    contactNumber: string,
    jobTitle: string,
    imagePath: string,
    userType: string,
    userSecurityScore: number,
    hasSsprRegistered: string,
    hasMfaRegistered: string,
    hasOutlookMailClient: string,
    hasAuthMethods: string,
    hasDeviceLimit: string,
    hasValidMobileOsVersion: string,
    hasValidAuthAppVersion: string,
    hasAcceptedPolicy: string,
    teamSecurityScore: number,
    orgSecurityScore: number
}
*/

const contextDefaultValue: iData = {
    userInfo: {
        displayName: "Paul Rebelo",
        userPrincipalName: "paul.rebelo@empired.com",
        contactNumber: "",
        jobTitle: "",
        imagePath: "",
        userType: ""
    },
    scores: {
        userSecurityScore: 0,
        teamSecurityScore: 0,
        orgSecurityScore: 0
    },
    tests: [
        { title: "Capable", status: true, tag: "" },
        { title: "MFA Registered", status: false, tag: "" },
        { title: "Registered", status: true, tag: "" },
        { title: "Auth Methods", status: true, tag: "" },
        { title: "Maximum Device Limit", status: true, tag: "" },
        { title: "Enabled", status: true, tag: "" },
        { title: "Mobile Version", status: true, tag: "" },
        { title: "Microsoft Authenticator App version", status: true, tag: "" },
        { title: "Acceptible use policies reviewed", status: true, tag: "" }
    ]
};

export const SecureScoreContext = createContext<iData | null>(contextDefaultValue);
