import { Boundaries } from "../interfaces/boundaries";

export function isBetween(a: Boundaries, b: Boundaries) {
  if (a.left < b.right && a.right > b.left) {
    return true;
  } else {
    return false;
  }
}
