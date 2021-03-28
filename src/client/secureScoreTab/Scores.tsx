import * as React from "react";
import { Flex, Segment } from "@fluentui/react-northstar";
import { useContext } from "react";
import { SecureScoreContext, userContextDefaultValue } from "./SecureScoreDataContext";

export function Scores() {
    const { scores } = useContext(SecureScoreContext);

    return (
        <>
            <SecureScoreContext.Provider value={ userContextDefaultValue }>
                <Flex gap="gap.small" padding="padding.medium">
                    <Flex.Item size="size.quarter" className="oneThird">
                        <Segment>
                            <div className="large">{ scores?.yourScore }%</div>
                            <div className="scoreText label1">Your Secure Score</div>
                        </Segment>
                    </Flex.Item>
                    <Flex.Item size="size.quarter">
                        <Segment>
                            <div className="large">{ scores?.teamScore }%</div>
                            <div className="scoreText label1">Team Secure Score</div>
                        </Segment>
                    </Flex.Item>
                    <Flex.Item size="size.quarter">
                        <Segment>
                            <div className="large">{ scores?.orgScore }%</div>
                            <div className="scoreText label1">Organisation Secure Score</div>
                        </Segment>
                    </Flex.Item>
                </Flex>
            </SecureScoreContext.Provider>
        </>
    );
};
