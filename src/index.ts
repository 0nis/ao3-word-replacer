import { UI } from "./ui/core";
import { Storage } from "./services/storage";
import { walkAndReplace } from "./services/replacer";

import { Dictionary } from "./types/settings";

import { DEFAULT_DICTIONARY } from "./constants/settings";

(async function main() {
  const dict: Dictionary = (await Storage.get()) || DEFAULT_DICTIONARY;
  const container = document.querySelector("#chapters");
  if (container) walkAndReplace(container, dict);
  UI.init(dict);
})();
