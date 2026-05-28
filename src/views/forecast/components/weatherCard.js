import { createWeatherIcon } from "../../../utils/icons.js";
import { getDayName } from "../../../utils/dateTimeUtils.js";

export function createWeatherCard({ date, description, temperature, iconId }) {
  const card = document.createElement("div");
  card.classList.add("forecast-view__weather-card");
  card.dataset.date = date;

  const informationWrapper = document.createElement("div");
  informationWrapper.classList.add("weather-card__information");

  const day = document.createElement("p");
  day.classList.add("weather-card__day");
  day.textContent = getDayName(date);

  const temperatureText = document.createElement("p");
  temperatureText.classList.add("weather-card__temperature");
  temperatureText.textContent = temperature + " ℉";

  informationWrapper.append(day, temperatureText);

  const descriptionWrapper = document.createElement("div");
  descriptionWrapper.classList.add("weather-card__description");

  const weatherIcon = createWeatherIcon(iconId);
  weatherIcon.classList.add("weather-card__icon");

  if (weatherIcon.dataset.fallback === "true")
    weatherIcon.classList.add("weather-card__icon--fallback");

  const weatherDescription = document.createElement("p");
  weatherDescription.classList.add("weather-card__text");
  weatherDescription.textContent = description;

  descriptionWrapper.append(weatherIcon, weatherDescription);

  card.append(informationWrapper, descriptionWrapper);

  return card;
}
