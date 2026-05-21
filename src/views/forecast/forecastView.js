import { activateEvents } from "./forecastEvents";

export function createForecastView(navigate) {
  const view = document.createElement("div");
  view.id = "forecast-view";
  view.classList.add("view");

  activateEvents({ element: view, navigate });

  return view;
}
