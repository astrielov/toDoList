export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function setListener(target, eventType, callback) {
  target.addEventListener(eventType, callback);
}
