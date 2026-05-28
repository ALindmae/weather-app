import { state } from "../../core/state";

export function activateEvents({ element, navigate }) {
  const weatherCards = element.querySelector(".forecast-view__weather-cards");
  weatherCards.addEventListener("click", () => {
    onWeatherCardClick(navigate);
  });
}

function onWeatherCardClick(navigate) {
  const card = event.target.closest(".forecast-view__weather-card");
  if (!card) return;
  navigate({
    name: "weather-details",
    params: { location: state.route.params.location, date: card.dataset.date },
  });
}
