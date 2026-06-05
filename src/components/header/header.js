import { createIcon } from "../../utils/icons";
import { state } from "../../core/state";
import { activateEvents } from "./headerEvents";

export function createNavBar({ location, navigate }) {
  const navBar = document.createElement("nav");
  navBar.classList.add("navigation");

  const backButton = document.createElement("button");
  backButton.classList.add("navigation__back");
  backButton.append(createIcon("chevronBack"));

  const locationElement = document.createElement("p");
  locationElement.classList.add("navigation__location");
  locationElement.textContent = location;

  const searchForm = document.createElement("form");
  searchForm.classList.add("navigation__search-form");

  const searchInput = document.createElement("input");
  searchInput.classList.add("navigation__search-input");
  searchInput.type = "text";
  searchInput.placeholder = "Search your location";

  const searchButton = document.createElement("button");
  searchButton.classList.add("navigation__search-submit");
  searchButton.append(createIcon("search"));

  searchForm.append(searchInput, searchButton);
  navBar.append(backButton, locationElement, searchForm);

  activateEvents({ navBar, navigate });

  return navBar;
}
