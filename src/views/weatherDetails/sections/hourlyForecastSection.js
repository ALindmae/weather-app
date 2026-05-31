import { createWeatherIcon } from "../../../utils/icons";

export function createHourlyForecastSection(data) {
  const section = document.createElement("div");
  section.classList.add("weather-details-view__hourly");

  data.forEach((hour) => {
    section.append(createHourItem(hour));
  });

  return section;
}

function createHourItem(hourData) {
  const { time, iconId, temperature } = hourData;

  const hourItem = document.createElement("div");
  hourItem.classList.add("weather-details-view__hour-item");
  if (time === "Now")
    hourItem.classList.add("weather-details-view__hour-item--current");

  const timeElement = document.createElement("p");
  timeElement.classList.add("weather-details-view__hour-time");
  timeElement.textContent = time;

  const icon = createWeatherIcon(iconId);
  icon.classList.add("weather-details-view__hour-icon");

  const temperatureElement = document.createElement("p");
  temperatureElement.classList.add("weather-details-view__hour-temperature");
  temperatureElement.textContent = temperature;

  hourItem.append(timeElement, icon, temperatureElement);

  return hourItem;
}
