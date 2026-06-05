import { loadForecast } from "../../services/searchService";

export function activateEvents({ navBar, navigate, navigateUp }) {
  navBar.addEventListener("submit", (e) => {
    handleSearchFormSubmit({ e, navigate });
  });
  navBar.addEventListener("click", (e) => {
    onBackButtonClick({ e, navigateUp });
  });
}

function onBackButtonClick({ e, navigateUp }) {
  const backButton = e.target.closest(".navigation__back");
  if (!backButton) return;

  navigateUp();
}

function handleSearchFormSubmit({ e, navigate }) {
  e.preventDefault();

  const form = e.target;
  const input = form.querySelector("input");
  const searchValue = input.value;

  if (!form.classList.contains("is-open")) {
    return form.classList.add("is-open");
  } else {
    if (searchValue) {
      getForecastAndNavigate({ navigate, searchValue });
    } else form.classList.remove("is-open");
  }
  return;
}

async function getForecastAndNavigate({ navigate, searchValue }) {
  const result = await loadForecast(searchValue);

  if (!result.success) {
    window.alert("Couldn't retrieve forecast, try another location.");
    return null;
  }

  navigate({ name: "forecast", params: { location: result.location } });
}
