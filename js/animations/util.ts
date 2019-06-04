export function _createElement(elementType: string, className: string) {
  const el = document.createElement(elementType);
  el.setAttribute('class', className);
  document.body.appendChild(el);
  return el;
}
