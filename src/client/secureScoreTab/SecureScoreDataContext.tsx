import * as React from "react";

export interface iScores {
    yourScore: number,
    teamScore: number,
    orgScore: number,
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

export interface iSecureScoreContextData {
    isLoading: boolean;
    userInfo: iUserInfo | undefined;
    scores: iScores | undefined;
    tests: iTest[];
    fetchData: (upn: string) => void;
}

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

export const userContextDefaultValue: iSecureScoreContextData = {
    isLoading: false,
    userInfo: { displayName: "", userPrincipalName: "", imagePath: "", jobTitle: "", contactNumber: "", userType: "" },
    scores: { yourScore: 0, teamScore: 0, orgScore: 0 },
    tests: [],
    fetchData: (upn: string) => null
};

export const SecureScoreContext = React.createContext<iSecureScoreContextData>(userContextDefaultValue);
