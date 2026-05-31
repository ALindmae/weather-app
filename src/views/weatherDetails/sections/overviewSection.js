import { createWeatherIcon } from "../../../utils/icons";

export function createOverviewSection({
  day,
  iconId,
  temperature,
  conditions,
}) {
  const section = document.createElement("div");
  section.classList.add("weather-details-view__overview");

  const overviewInformation = document.createElement("div");
  overviewInformation.classList.add("weather-details-view__information");

  const dayElement = document.createElement("p");
  dayElement.classList.add("weather-details-view__day");
  dayElement.textContent = day;

  const temperatureElement = document.createElement("p");
  temperatureElement.classList.add("weather-details-view__temperature");
  temperatureElement.textContent = temperature;

  const conditionsText = document.createElement("p");
  conditionsText.classList.add("weather-details-view__description");
  conditionsText.textContent = conditions;

  overviewInformation.append(dayElement, temperatureElement, conditionsText);

  const weatherIcon = createWeatherIcon(iconId);
  weatherIcon.classList.add("weather-details-view__conditions-icon");

  section.append(overviewInformation, weatherIcon);

  return section;
}
