import { fetchJSON } from "../utils/fetchJSON";

const queryParts = {
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  key: `${process.env.VISUALCROSSING_API_KEY}`,
};

function buildForecastQueryURL(pathValues) {
  const { startDate, endDate, location } = pathValues;

  const path = endDate
    ? `${location}/${startDate}/${endDate}`
    : `${location}/${startDate}`;

  return `${queryParts.baseURL}/${path}?key=${queryParts.key}`;
}

export function getWeeklyWeather(locationInput) {
  const date = new Date();
  let endDate = new Date(date);

  endDate.setDate(date.getDate() + 6);
  endDate = endDate.toISOString().split("T")[0];

  const startDate = date.toISOString().split("T")[0];

  const encodedLocation = encodeURIComponent(locationInput);

  const queryURL = buildForecastQueryURL({
    startDate,
    endDate,
    location: encodedLocation,
  });

  return fetchJSON(queryURL);
}
