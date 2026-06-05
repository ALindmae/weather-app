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
    const currentConditions = state.forecast.currentConditions;

    if (index === 0 && currentConditions) {
      payload = {
        iconId: currentConditions.icon,
        temperature: currentConditions.temp,
        description: currentConditions.conditions,
        date: day.datetime,
      };
    } else {
      payload = {
        iconId: day.icon,
        temperature: day.temp,
        description: day.description,
        date: day.datetime,
      };
    }

    cards.append(createWeatherCard(payload));
  });

  view.append(cards);

  activateEvents({ element: view, navigate });

  return view;
}
