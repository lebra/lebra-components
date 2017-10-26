//v: any
export function getTransformPropValue(v) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v,
  };
}

//value: number | string, unit = 'px', vertical: boolean = false
export function getPxStyle(value,unit,vertical) {
  value = vertical ? `0px, ${value}${unit}, 0px` : `${value}${unit}, 0px, 0px`;
  return `translate3d(${value})`;
}
//el: HTMLElement, value: number | string, unit = 'px', vertical: boolean = false
export function setPxStyle(el,value,unit,vertical) {
  setTransform(el.style, getPxStyle(value, unit, vertical));
}

// style: any, v: any
export function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}
