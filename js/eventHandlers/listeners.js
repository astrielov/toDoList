
export default function setListener(target, eventType, callback) {
  target.addEventListener(eventType, callback);
}
