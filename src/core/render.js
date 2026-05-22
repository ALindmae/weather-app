import { state } from "./state";

import { createSearchView } from "../views/search/searchView";
import { createForecastView } from "../views/forecast/forecastView";
import { createWeatherDetailsView } from "../views/weatherDetails/weatherDetailsView";

export function handleRender(app) {
  switch (state.route.name) {
    case "search":
      return render(
        app.root,
        createSearchView(({ name = "forecast", location = "london" }) =>
          app.navigate({ name, params: { location } }),
        ),
      );
    case "forecast":
      return render(
        app.root,
        createForecastView(
          ({ name = "weather-details", location = "london", date = "" }) =>
            app.navigate({ name, params: { location, date } }),
        ),
      );
    case "weather-details":
      return render(
        app.root,
        createWeatherDetailsView(({ name = "forecast", location = "london" }) =>
          app.navigate({ name, params: { location } }),
        ),
      );
    default:
      return render(
        app.root,
        createSearchView(({ name = "forecast", location = "london" }) =>
          app.navigate({ name, params: { location } }),
        ),
      );
  }
}

function render(root, node) {
  root.innerHTML = "";
  root.append(node);
  return;
}
