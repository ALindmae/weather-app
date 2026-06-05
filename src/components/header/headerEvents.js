import { loadForecast } from "../../services/searchService";

export function activateEvents({ navBar, navigate }) {
  navBar.addEventListener("submit", (e) => {
    handleSearchFormSubmit({ e, navigate });
  });
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
