import { state } from "./state";

import { createSearchView } from "../views/search/searchView";
import { createForecastView } from "../views/forecast/forecastView";
import { createWeatherDetailsView } from "../views/weatherDetails/weatherDetailsView";

export function handleRender(app) {
  switch (state.route.name) {
    case "search":
      return render(
        app.content,
        createSearchView(({ name = "forecast", location = "london" }) =>
          app.navigate({ name, params: { location } }),
        ),
      );
    case "forecast":
      return render(
        app.content,
        createForecastView(
          ({ name = "weather-details", location = "london", date = "" }) =>
            app.navigate({ name, params: { location, date } }),
        ),
      );
    case "weather-details":
      return render(
        app.content,
        createWeatherDetailsView(({ name = "forecast", location = "london" }) =>
          app.navigate({ name, params: { location } }),
        ),
      );
    default:
      return render(
        app.content,
        createSearchView(({ name = "forecast", location = "london" }) =>
          app.navigate({ name, params: { location } }),
        ),
      );
  }
}

function render(content, node) {
  content.innerHTML = "";
  content.append(node);
  return;
}
