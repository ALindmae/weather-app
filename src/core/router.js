/* import { handleRender } from "./render"; */
import { state } from "./state";

const routes = [
  {
    name: "search",
    isMatch: (parts) => {
      if (parts.length !== 0) return false;
      return true;
    },
    parse: (parts) => {
      return { name: "search", params: {} };
    },
  },
  {
    name: "forecast",
    isMatch: (parts) => {
      if (parts.length !== 2 && parts[0] !== "forecast") return false;
      return true;
    },
    parse: (parts) => {
      return { name: "forecast", params: { location: parts[1] } };
    },
  },
  {
    name: "weather-details",
    isMatch: (parts) => {
      if (
        parts.length !== 4 &&
        parts[0] !== "location" &&
        parts[2] !== "weatherDetails"
      )
        return false;
      return true;
    },
    parse: (parts) => {
      return {
        name: "weather-details",
        params: { location: parts[0], date: parts[3] },
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

  return { init, navigate };
}

function handleBrowserNavigation(app, handleRender) {
  state.route = parseUrlPath(location.pathname);
  handleRender(app);
}

function setupPopstateListener(app, handleRender) {
  window.addEventListener("popstate", () =>
    handleBrowserNavigation(app, handleRender),
  );
}

function parseUrlPath(path) {
  const parts = path.split("/").filter(Boolean);
  console.log("parseutlpath", "parts:", parts);

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
      return `/forecast/${location}`;
    case "weather-details":
      if (!location || !date) return "/forecast";
      return `/forecast/${location}/weatherDetails/${date}`;
    default:
      return "/";
  }
}
