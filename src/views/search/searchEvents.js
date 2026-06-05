import { state } from "../../core/state";
import { loadForecast } from "../../services/searchService";

export function activateEvents({ element, navigate }) {
  const searchForm = element.querySelector(".search-view__form");
  const searchField = searchForm.querySelector(".search-view__input");

  searchForm.addEventListener("submit", (event) => {
    onSearchSubmit({
      event,
      navigate,
      searchValue: searchField.value,
    });
  });
}

async function onSearchSubmit({ event, navigate, searchValue }) {
  event.preventDefault();
  const result = await loadForecast(searchValue);

  if (!result.success) {
    window.alert("Couldn't retrieve forecast, try another location.");
    return null;
  }

  navigate({ name: "forecast", params: { location: result.location } });
}
