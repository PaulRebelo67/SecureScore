import * as React from "react";
import { Provider, Flex, Segment, Divider } from "@fluentui/react-northstar";
import { useState, useEffect, useCallback, useContext } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Compare } from "./Compare";
import { Scores } from "./Scores";
import { iUserInfo, iScores, iTest, iSecureScoreContextData, SecureScoreContext, userContextDefaultValue } from "./SecureScoreDataContext";

function useSecureScoreContextValue(): iSecureScoreContextData {
    const [isLoading, setIsLoading] = useState(false);
    const [scores, setScores] = useState<iScores | undefined>(undefined);
    const [tests, setTests] = useState<iTest[]>([]);
    const [userInfo, setUserInfo] = useState<iUserInfo | undefined>(undefined);

    const fetchData = useCallback(() => {
        let userDashBoardDataURL: any = process.env.EP_USER_DASHBOARD;
        userDashBoardDataURL = userDashBoardDataURL.replace("{upn}", process.env.EP_NOTINTEAMS_UPN);

        setIsLoading(true);
        fetch(userDashBoardDataURL)
            .then(response => response.json())
            .then((fetchedData) => {
                setUserInfo({
                    displayName: fetchedData.userDisplayName,
                    userPrincipalName: fetchedData.userPrincipalName,
                    imagePath: fetchedData.userImagePath,
                    jobTitle: fetchedData.userJobTitle,
                    contactNumber: fetchedData.userContactNumber,
                    userType: fetchedData.userType
                });
                setScores({
                    yourScore: fetchedData.userSecurityScore,
                    teamScore: fetchedData.teamSecurityScore,
                    orgScore: fetchedData.orgSecurityScore
                });
                setTests([
                    { title: "Capable", status: fetchedData.hasSsprRegistered, tag: "" },
                    { title: "MFA Registered", status: fetchedData.hasMfaRegistered, tag: "" },
                    { title: "Registered", status: fetchedData.hasOutlookMailClient, tag: "" },
                    { title: "Auth Methods", status: fetchedData.hasAuthMethods, tag: "" },
                    { title: "Maximum Device Limit", status: fetchedData.hasDeviceLimit, tag: "" },
                    { title: "Enabled", status: fetchedData.hasSsprRegistered, tag: "" },
                    { title: "Mobile Version", status: fetchedData.hasValidMobileOsVersion, tag: "" },
                    { title: "Microsoft Authenticator App version", status: fetchedData.hasValidAuthAppVersion, tag: "" },
                    { title: "Acceptable use polocies reviewed", status: fetchedData.hasAcceptedPolicy, tag: "" }
                ]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [setUserInfo, setScores, setTests]);

    return { isLoading, userInfo, scores, tests, fetchData };
}

const Home = () => {
    const [{ inTeams, theme, context }] = useTeams();

    return (
        <>
            <SecureScoreContext.Provider value={ userContextDefaultValue }>
                <Provider theme={theme}>
                    <Scores />
                    <Flex gap="gap.small" padding="padding.medium">
                        <Flex.Item size="size.half">
                            <Segment>
                                <div>Person Card</div>
                            </Segment>
                        </Flex.Item>
                    </Flex>
                    <Flex gap="gap.small" padding="padding.medium">
                        <Flex.Item size="size.half">
                            <Segment>
                                <div>Security Score Metric...</div>
                            </Segment>
                        </Flex.Item>
                        <Flex.Item size="size.half"></Flex.Item>
                    </Flex>
                </Provider>
            </SecureScoreContext.Provider>
        </>
    );
};

/**
 * Implementation of the Secure Score content page
 */
export const SecureScoreTab = () => {
    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();
    const { fetchData } = useContext(SecureScoreContext);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
        }
    }, [inTeams]);

    const secureScoreContextValue = useSecureScoreContextValue();

    /**
     * The render() method to create the UI of the tab
     */
    return (
        <Provider theme={ theme }>
            <Flex gap="gap.small" padding="padding.medium">
                <Flex.Item size="size.quarter">
                    <div>Empired</div>
                </Flex.Item>
                <Flex.Item size="size.quarter">
                    <div>User Secure Score</div>
                </Flex.Item>
                <Flex.Item size="size.quarter">
                    <div>User Info</div>
                </Flex.Item>
            </Flex>
            <Router>
                <div>
                    <nav>
                        <ul className="nav-ul">
                            <li className="nav-li">
                                <Link to="/">Overview</Link>
                            </li>
                            <li className="nav-li">
                                <Link to="/compare">Compare</Link>
                            </li>
                        </ul>
                    </nav>
                    <Divider />

                    <Switch>
                        <Route path="/compare">
                            <Compare />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};
