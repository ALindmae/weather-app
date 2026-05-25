import { activateEvents } from "./searchEvents.js";
import { createIcon } from "../../utils/icons.js";

export function createSearchView(navigate) {
  const view = document.createElement("div");
  view.id = "search-view";
  view.classList.add("view");

  const icon = createViewIcon();
  if (icon) view.append(icon);

  const SearchBar = createSearchBar();
  if (SearchBar) view.append(SearchBar);

  activateEvents({ element: view, navigate });

  return view;
}

function createViewIcon() {
  const icon = createIcon("sunStrong");

  if (!icon) return null;

  icon.classList.add("search-view__icon");

  return icon;
}

function createSearchBar() {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar", "search-view__bar");

  const form = document.createElement("form");
  form.classList.add("search-view__form");

  const input = document.createElement("input");
  input.classList.add("search-view__input");
  input.type = "text";
  input.required = true;
  input.placeholder = "Search your location";

  const submitButton = document.createElement("button");
  submitButton.classList.add(
    "search-view__submit-button",
    "button",
    "submit-button",
  );
  submitButton.type = "submit";

  const searchIcon = createIcon("search");
  searchIcon.classList.add("search-view__submit-icon");
  submitButton.append(searchIcon);

  form.append(input, submitButton);
  searchBar.append(form);

  return searchBar;
}
