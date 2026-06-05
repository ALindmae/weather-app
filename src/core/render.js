import { state } from "./state";

import { createSearchView } from "../views/search/searchView";
import { createForecastView } from "../views/forecast/forecastView";
import { createWeatherDetailsView } from "../views/weatherDetails/weatherDetailsView";
import { createNavBar } from "../components/header/header";

export function handleRender(app) {
  switch (state.route.name) {
    case "search":
      render(
        app.root,
        createSearchView((route) => app.navigate(route)),
      );
      renderHeader(app);
      return;
    case "forecast":
      render(
        app.root,
        createForecastView((route) => app.navigate(route)),
      );
      renderHeader(app);
      return;
    case "weather-details":
      render(
        app.root,
        createWeatherDetailsView({
          date: state.route.params.date,
        }),
      );
      renderHeader(app);
      return;
    default:
      render(
        app.root,
        createSearchView((route) => app.navigate(route)),
      );
      renderHeader(app);
      return;
  }
}

function render(root, node) {
  console.log(state);
  root.innerHTML = "";
  root.append(node);
  return;
}

function renderHeader(app) {
  if (state.route.name === "search") {
    app.header.innerHTML = "";
    return;
  }

  const location = state.route.params.location;

  if (!location) return;

  render(
    app.header,
    createNavBar({ location, navigate: (route) => app.navigate(route) }),
  );
}
