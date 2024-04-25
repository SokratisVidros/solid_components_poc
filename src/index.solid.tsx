/** @jsxImportSource solid-js */
/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { MySolidApp } from "./App.solid";

// Render Solid
const rootSolid = document.getElementById("root-solid");

if (import.meta.env.DEV && !(rootSolid instanceof HTMLElement)) {
  throw new Error(
    "Root element for SolidJS not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <MySolidApp />, rootSolid!);
