import * as React from "react";
import { useTeams } from "msteams-react-base-component";
import { Provider } from "@fluentui/react-northstar";

export const Compare = () => {
    const [{ inTeams, theme, context }] = useTeams();
    return (
        <Provider theme={ theme }>
            <div>Compare here</div>
        </Provider>
    );
};
