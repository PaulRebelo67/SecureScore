import * as React from "react";
import { Flex, Segment } from "@fluentui/react-northstar";
import { useContext } from "react";
import { SecureScoreContext } from "./SecureScoreDataContext";

export function Scores() {
    const sscontext = useContext(SecureScoreContext);

    return (
        <>
            <Flex gap="gap.small" padding="padding.medium">
                <Flex.Item size="size.quarter" className="oneThird">
                    <Segment>
                        <div className="large">{ sscontext?.scores.userSecurityScore } %</div>
                        <div className="scoreText label1">Your Secure Score</div>
                    </Segment>
                </Flex.Item>
                <Flex.Item size="size.quarter">
                    <Segment>
                        <div className="large">{ sscontext?.scores.teamSecurityScore } %</div>
                        <div className="scoreText label1">Team Secure Score</div>
                    </Segment>
                </Flex.Item>
                <Flex.Item size="size.quarter">
                    <Segment>
                        <div className="large">{ sscontext?.scores.orgSecurityScore } %</div>
                        <div className="scoreText label1">Organisation Secure Score</div>
                    </Segment>
                </Flex.Item>
            </Flex>
        </>
    );
};
