import { cache } from "./client.jsx";

export function getState(query) {
  return cache.readQuery({ query });
}

export function setState(state) {
  return cache.writeData({ data: { ...state } });
}
