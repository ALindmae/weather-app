import { activateEvents } from "./forecastEvents";
import { createWeatherCard } from "./components/weatherCard";
import { state } from "../../core/state";

export function createForecastView(navigate) {
  const view = document.createElement("div");
  view.id = "forecast-view";
  view.classList.add("view");

  const cards = document.createElement("div");
  cards.classList.add("forecast-view__weather-cards");

  state.forecast.days.forEach((day, index) => {
    let payload;

    if (index === 0) {
      const currentConditions = state.forecast.currentConditions;

      payload = {
        iconId: currentConditions.icon,
        temperature: currentConditions.temp,
        description: currentConditions.conditions,
      };
    } else {
      payload = {
        iconId: day.icon,
        temperature: day.temp,
        description: day.description,
      };
    }

    cards.append(createWeatherCard(payload));
  });

  view.append(cards);

  activateEvents({ element: view, navigate });

  return view;
}
