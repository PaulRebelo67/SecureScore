import * as React from "react";
import { Provider, Flex, Segment, Divider } from "@fluentui/react-northstar";
import { useState, useEffect, useContext } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Compare } from "./Compare";
import { Scores } from "./Scores";
import { Tests } from "./Tests";
import { SecureScoreContext } from "./SecureScoreDataContext";

const Home = () => {
    const [{ theme }] = useTeams();
    const sscontext = useContext(SecureScoreContext);

    return (
        <>
            <Provider theme={theme}>
                <Scores />
                <Flex gap="gap.small" padding="padding.medium">
                    <Flex.Item size="size.half">
                        <Segment>
                            <div>Person Card</div>
                            <div>{ sscontext?.userInfo.displayName }</div>
                        </Segment>
                    </Flex.Item>
                    <Flex.Item size="size.half">
                        <Segment>
                            <Tests />
                        </Segment>
                    </Flex.Item>
                    <Flex.Item size="size.half"></Flex.Item>
                </Flex>
                <Flex gap="gap.small" padding="padding.medium">
                    <Flex.Item size="size.half">
                        <Segment>
                            <div>Security Score Metric...</div>
                        </Segment>
                    </Flex.Item>
                </Flex>
            </Provider>
        </>
    );
};

/**
 * Implementation of the Secure Score content page
 */
export const SecureScoreTab = () => {
    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();

    const sscontext = useContext(SecureScoreContext);
    const [data, setData] = useState(sscontext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
        }
    }, [inTeams]);

    useEffect(() => {
        setIsLoading(true);
        let userDashBoardDataURL: any = process.env.EP_USER_DASHBOARD;
        userDashBoardDataURL = userDashBoardDataURL.replace("{upn}", process.env.EP_NOTINTEAMS_UPN);
        fetch(userDashBoardDataURL)
            .then(response => response.json())
            .then((fetchedData) => {
                setData({
                    userInfo: {
                        displayName: fetchedData.userDisplayName,
                        userPrincipalName: fetchedData.userPrincipalName,
                        imagePath: fetchedData.userImagePath,
                        jobTitle: fetchedData.userJobTitle,
                        contactNumber: fetchedData.userContactNumber,
                        userType: fetchedData.userType
                    },
                    scores: {
                        userSecurityScore: fetchedData.userSecurityScore,
                        teamSecurityScore: fetchedData.teamSecurityScore,
                        orgSecurityScore: fetchedData.orgSecurityScore
                    },
                    tests: [
                        { title: "Capable", status: fetchedData.hasSsprRegistered, tag: "" },
                        { title: "MFA Registered", status: fetchedData.hasMfaRegistered, tag: "" },
                        { title: "Registered", status: fetchedData.hasOutlookMailClient, tag: "" },
                        { title: "Auth Methods", status: fetchedData.hasAuthMethods, tag: "" },
                        { title: "Maximum Device Limit", status: fetchedData.hasDeviceLimit, tag: "" },
                        { title: "Enabled", status: false, tag: "" },
                        { title: "Mobile Version", status: fetchedData.hasValidMobileOsVersion, tag: "" },
                        { title: "Microsoft Authenticator App version", status: fetchedData.hasValidAuthAppVersion, tag: "" },
                        { title: "Acceptible use policies reviewed", status: fetchedData.hasAcceptedPolicy, tag: "" }
                    ]
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [data]);

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

                    <SecureScoreContext.Provider value={ data }>
                        <Switch>
                            <Route path="/compare">
                                <Compare />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </SecureScoreContext.Provider>
                </div>
            </Router>
        </Provider>
    );
};
