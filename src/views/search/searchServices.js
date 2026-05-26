import { getWeeklyWeather } from "../../API/weatherApi";
import { state } from "../../core/state";

export async function handleWeatherData(locationInput) {
  const data = await getWeeklyWeather(locationInput);

  if (!data) {
    return {
      success: "false",
    };
  }

  state.forecast = data;

  return {
    success: "true",
    location: data.resolvedAddress,
  };
}
