import { searchSvg } from "../assets/icons/search.js";
import { chevronBackSvg } from "../assets/icons/chevron-back.js";
import { cloudPartlySvg } from "../assets/icons/cloud-partly.js";
import { cloudSvg } from "../assets/icons/cloud.js";
import { dropSvg } from "../assets/icons/drop.js";
import { hourGlassSvg } from "../assets/icons/hour-glass.js";
import { moonHalfSvg } from "../assets/icons/moon-half.js";
import { playSvg } from "../assets/icons/play.js";
import { rainSvg } from "../assets/icons/rain.js";
import { rewindSvg } from "../assets/icons/rewind.js";
import { snowSvg } from "../assets/icons/snow.js";
import { speechBubbleSvg } from "../assets/icons/speech-bubble.js";
import { sunStrongSvg } from "../assets/icons/sun-strong.js";
import { sunSvg } from "../assets/icons/sun.js";
import { thunderSvg } from "../assets/icons/thunder.js";
import { windSvg } from "../assets/icons/wind.js";

const ICONS = {
  search: searchSvg,
  chevronBack: chevronBackSvg,
  cloudPartly: cloudPartlySvg,
  cloud: cloudSvg,
  drop: dropSvg,
  hourGlass: hourGlassSvg,
  moonHalf: moonHalfSvg,
  play: playSvg,
  rain: rainSvg,
  rewind: rewindSvg,
  snow: snowSvg,
  speechBubble: speechBubbleSvg,
  sunStrong: sunStrongSvg,
  sun: sunSvg,
  thunder: thunderSvg,
  wind: windSvg,
};

export function createIcon(iconName) {
  const svgString = ICONS[iconName];

  if (!svgString) {
    console.log("icon not found");
    return null;
  }

  const div = document.createElement("div");
  div.innerHTML = svgString;
  return div.firstElementChild;
}
