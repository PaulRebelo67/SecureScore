import * as React from "react";
import { Button } from "@fluentui/react-northstar";
import { AcceptIcon, CloseIcon } from "@fluentui/react-icons-northstar";

interface iTest {
    title: string,
    status: boolean,
    tag: string,
    click: any
}

export function Test({ title, status, tag, click }: iTest) {
    return (
        <>
            {
                status ? <span><AcceptIcon className="circle-black-icon" size="smaller"/> { title }</span> : <span><CloseIcon className="circle-black-icon" circular outline size="smaller"/> { title }<Button className="recoButton" onClick={ click }>Review recommendation</Button></span>
            }
        </>
    );
};
