import { state } from "../../core/state";
import { getDayName } from "../../utils/dateTimeUtils";

export function getOverviewSectionData(date) {
  const { forecast } = state;
  const { dayIndex, source } = getWeatherSource(date, forecast);

  if (dayIndex === -1) {
    console.log("date out of forecast range");
    return null;
  }

  const { conditions, icon: iconId, temp } = source;
  const day = dayIndex === 0 ? "Current" : getDayName(date);
  const temperature = `${temp}°F`;

  return {
    day,
    conditions,
    iconId,
    temperature,
  };
}

export function getDetailsSectionData(date) {
  const { forecast } = state;
  const { dayIndex, source } = getWeatherSource(date, forecast);

  if (dayIndex === -1) {
    console.log("date out of forecast range");
    return null;
  }

  const {
    windspeed: wind,
    precip: precipitation,
    humidity,
    uvindex: uvIndex,
  } = source;

  return {
    wind,
    precipitation,
    humidity,
    uvIndex,
  };
}

export function getHourlyForecastSectionData(date) {
  const { forecast } = state;
  const dayIndex = getForecastDayIndex(date, forecast);

  if (dayIndex === -1) {
    console.log("date out of forecast range");
    return null;
  }

  const hoursSource = forecast.days[dayIndex].hours;

  const hours = [];

  for (const [index, hour] of hoursSource.entries()) {
    if (index % 3 === 0) {
      const { datetime: dateTime, temp, icon: iconId } = hour;
      // get HH:MM from HH:MM:SS
      const time = dateTime.split(":").slice(0, -1).join(":");
      const temperature = `${temp}°F`;
      hours.push({ time, temperature, iconId });
    }
  }

  // if current day is selected, replace the hour item that overlaps with current time, with currentConditions data

  const currentConditions = forecast.currentConditions;
  if (dayIndex === 0 && currentConditions) {
    const { datetime, temp: temperature, icon: iconId } = currentConditions;

    const currentTime = datetime.split(":").slice(0, -1).join(":");

    for (let i = 0; i < hours.length; i++) {
      if (i != hours.length - 1) {
        if (currentTime >= hours[i].time && currentTime < hours[i + 1].time) {
          hours[i].time = "Now";
          hours[i].temperature = `${temperature}°F`;
          hours[i].iconId = iconId;
          break;
        }
      } else {
        hours[i].time = "Now";
        hours[i].temperature = `${temperature}°F`;
        hours[i].iconId = iconId;
        break;
      }
    }
  }

  return hours;
}

function getForecastDayIndex(date, forecast) {
  return forecast.days.findIndex((day) => day.datetime === date);
}

function getWeatherSource(date, forecast) {
  const dayIndex = getForecastDayIndex(date, forecast);

  if (dayIndex === -1) {
    return { dayIndex, source: null };
  }
  const source =
    dayIndex === 0 ? forecast.currentConditions : forecast.days[dayIndex];
  return { dayIndex, source };
}

export function formatWeatherValue(value, unit) {
  if (!unit) return `${value}`;

  if (unit === "%" || unit === "°F" || unit === "°C") {
    return `${value}${unit}`;
  }

  return `${value} ${unit}`;
}
