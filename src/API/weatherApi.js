import { fetchJSON } from "../utils/fetchJSON";

const queryParts = {
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  key: `${process.env.VISUALCROSSING_API_KEY}`,
};

function buildForecastQueryURL(params) {
  const { startDate, endDate, location } = params;

  const paramsPath = endDate
    ? `${location}/${startDate}/${endDate}`
    : `${location}/${startDate}`;

  return `${queryParts.baseURL}/${paramsPath}?key=${queryParts.key}`;
}

export function getWeeklyWeather(locationInput) {
  const date = new Date();
  let endDate = new Date(date);

  endDate.setDate(date.getDate() + 7);
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
