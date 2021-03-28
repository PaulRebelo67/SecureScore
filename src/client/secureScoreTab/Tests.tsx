import * as React from "react";
import { Test } from "./Test";

interface iTests {
    tests: { title: string, status: boolean, tag: string }[]
}

function reviewHandler(test: any) {
    console.log("Review handler clicked", test);
}

export function Tests({ tests }: iTests) {
    // const problems = tests.filter(r => !r.status);
    const poo = tests;

    console.log("what is this", tests);

    return (
        <>
            <div className="label1">Security status</div>
        </>
    );
};
