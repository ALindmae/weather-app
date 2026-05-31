import { createOverviewSection } from "./sections/overviewSection";
import { createDetailsSection } from "./sections/detailsSection";
import { createHourlyForecastSection } from "./sections/hourlyForecastSection";
import {
  getOverviewSectionData,
  getDetailsSectionData,
  getHourlyForecastSectionData,
} from "./weatherDetailsServices";

export function createWeatherDetailsView(context) {
  const { date } = context;

  const view = document.createElement("div");
  view.id = "weather-details-view";
  view.classList.add("view");

  const overviewSection = createOverviewSection(getOverviewSectionData(date));

  const detailsSection = createDetailsSection(getDetailsSectionData(date));

  const hourlyForecastSection = createHourlyForecastSection(
    getHourlyForecastSectionData(date),
  );

  view.append(overviewSection, detailsSection, hourlyForecastSection);
  return view;
}
