import { FocusTrap } from "focus-trap";
import { Dictionary } from "./settings";

interface State {
  dict: Dictionary;
  modal?: HTMLDivElement;
  overlay?: HTMLDivElement;
  focusTrap?: FocusTrap;
}
