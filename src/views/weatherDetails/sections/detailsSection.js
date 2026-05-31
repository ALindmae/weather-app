import { createIcon } from "../../../utils/icons";
import { formatWeatherValue } from "../weatherDetailsServices";

export function createDetailsSection(detailValues) {
  const section = document.createElement("div");
  section.classList.add("weather-details-view__details-section");

  for (const [detailKey, detailValue] of Object.entries(detailValues)) {
    section.append(createWeatherDetailBox(detailKey, detailValue));
  }

  return section;
}

function createWeatherDetailBox(detailKey, detailValue) {
  const weatherDetailBox = document.createElement("div");

  weatherDetailBox.classList.add(
    `weather-details-view__detail-box`,
    `weather-details-view__detail-box--${detailKey}`,
  );

  const weatherDetailIcon = createIcon(weatherDetailConfig[detailKey].iconName);

  weatherDetailIcon.classList.add("weather-details-view__detail-icon");

  const weatherDetailText = document.createElement("p");

  weatherDetailText.classList.add("weather-details-view__detail-text");

  weatherDetailText.textContent =
    weatherDetailConfig[detailKey].text +
    " " +
    formatWeatherValue(detailValue, weatherDetailConfig[detailKey].unit);

  weatherDetailBox.append(weatherDetailIcon, weatherDetailText);

  return weatherDetailBox;
}

const weatherDetailConfig = {
  precipitation: {
    iconName: "rain",
    text: "Precipitation:",
    unit: "mm",
  },
  uvIndex: {
    iconName: "sun",
    text: "UV index:",
    unit: "",
  },
  humidity: {
    iconName: "drop",
    text: "Humidity:",
    unit: "%",
  },
  wind: {
    iconName: "wind",
    text: "Wind:",
    unit: "m/s",
  },
};
