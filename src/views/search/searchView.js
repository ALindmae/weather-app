import { activateEvents } from "./searchEvents.js";
import { createIcon } from "../../utils/icons.js";

export function createSearchView(navigate) {
  const view = document.createElement("div");
  view.id = "search-view";
  view.classList.add("view");

  activateEvents({ element: view, navigate });

  return view;
}
