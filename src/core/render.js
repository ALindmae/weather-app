import { state } from "./state";

import { createSearchView } from "../views/search/searchView";
import { createForecastView } from "../views/forecast/forecastView";
import { createWeatherDetailsView } from "../views/weatherDetails/weatherDetailsView";

export function handleRender(app) {
  switch (state.route.name) {
    case "search":
      return render(
        app.root,
        createSearchView((route) => app.navigate(route)),
      );
    case "forecast":
      return render(
        app.root,
        createForecastView((route) => app.navigate(route)),
      );
    case "weather-details":
      return render(
        app.root,
        createWeatherDetailsView({
          date: state.route.params.date,
        }),
      );
    default:
      return render(
        app.root,
        createSearchView((route) => app.navigate(route)),
      );
  }
}

function render(root, node) {
  root.innerHTML = "";
  root.append(node);
  return;
}
