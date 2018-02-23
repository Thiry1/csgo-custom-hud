import React from "react";
import { configure } from "@storybook/react";


const req = require.context("../src/views", true, /Story\.tsx$/);

function loadStories() {
    req.keys().sort().forEach(req)
}

configure(loadStories, module);

