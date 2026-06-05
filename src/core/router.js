/* import { handleRender } from "./render"; */
import { state } from "./state";
import { getWeeklyWeather } from "../API/weatherApi";

const routes = [
  {
    name: "search",
    isMatch: (parts) => {
      if (parts.length == 0) return true;
      return false;
    },
    parse: (parts) => {
      return { name: "search", params: {} };
    },
  },
  {
    name: "forecast",
    isMatch: (parts) => {
      if (parts.length == 2 && parts[0] == "forecast") return true;
      return false;
    },
    parse: (parts) => {
      return { name: "forecast", params: { location: parts[1] } };
    },
  },
  {
    name: "weather-details",
    isMatch: (parts) => {
      if (
        parts.length == 4 &&
        parts[0] == "forecast" &&
        parts[2] == "weatherDetails"
      )
        return true;
      return false;
    },
    parse: (parts) => {
      return {
        name: "weather-details",
        params: { location: parts[1], date: parts[3] },
      };
    },
  },
];

export function createRouter(app, handleRender) {
  function init() {
    setupPopstateListener(app, handleRender);
    handleBrowserNavigation(app, handleRender);
  }

  function navigate(route) {
    state.route = route;
    history.pushState({}, "", buildUrlPath(route));
    handleRender(app);
  }

  function navigateUp() {
    switch (state.route.name) {
      case "weather-details":
        return navigate({
          name: "forecast",
          params: { location: state.route.params.location },
        });
      case "forecast":
        return navigate({ name: "search" });
    }
  }

  return { init, navigate, navigateUp };
}

async function handleBrowserNavigation(app, handleRender) {
  state.route = parseUrlPath(window.location.pathname);

  const routeLocation = state.route.params.location;

  if (routeLocation && !state.forecast) {
    await hydrateForecastState(routeLocation);
  }

  handleRender(app);
}

function setupPopstateListener(app, handleRender) {
  window.addEventListener("popstate", () =>
    handleBrowserNavigation(app, handleRender),
  );
}

async function hydrateForecastState(location) {
  const data = await getWeeklyWeather(location);

  if (!data) return false;

  state.forecast = data;

  return true;
}

function parseUrlPath(path) {
  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);

  const route = routes.find((r) => r.isMatch(parts));

  if (!route) return { name: "not-found", params: {} };

  return route.parse(parts);
}

function buildUrlPath(route) {
  const { location, date } = route.params || {};

  switch (route.name) {
    case "search":
      return "/";
    case "forecast":
      if (!location) return "/forecast";
      return `/forecast/${encodeURIComponent(location)}`;
    case "weather-details":
      if (!location || !date) return "/forecast";
      return `/forecast/${encodeURIComponent(location)}/weatherDetails/${encodeURIComponent(date)}`;
    default:
      return "/";
  }
}
