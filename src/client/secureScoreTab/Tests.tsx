import * as React from "react";
import { useContext } from "react";
import { SecureScoreContext } from "./SecureScoreDataContext";
import { Test } from "./Test";

function reviewHandler(test: any) {
    console.log("Review handler clicked", test);
}

export function Tests() {
    const sscontext = useContext(SecureScoreContext);
    const failures = sscontext?.tests.filter(r => !r.status);

    return (
        <>
            <div className="label1">Security status</div>
            <div>To improve your security Score, &apos;Review recommendation&rsquo; to help guide you through resolving outstanding security issues.</div>
            <div>Security issues <span className="circle-black-text">{ failures ? failures.length : 0 }</span></div>
            <ul className="noBullets">
                {
                    sscontext?.tests.map((test, idx) => (
                        <li key={ idx }><Test title={ test.title } status={ test.status } tag={ test.tag } click={ () => reviewHandler(test) } /></li>
                    ))
                }
            </ul>
        </>
    );
};
