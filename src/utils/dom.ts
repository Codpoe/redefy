type ScrollElement = HTMLElement | Window;

export function isFixed(element: HTMLElement) {
  while (
    element &&
    element.tagName !== 'HTML' &&
    element.tagName !== 'BODY' &&
    element.nodeType === 1
  ) {
    const { position } = window.getComputedStyle(element);
    if (position === 'fixed') {
      return true;
    }
    element = element.parentNode as HTMLElement;
  }

  return false;
}

export function getRect(element: HTMLElement): ClientRect;
export function getRect(element: Window): { width: number; height: number };
export function getRect(element: ScrollElement = window) {
  if (element === window) {
    // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
    const doc = document.documentElement;
    return {
      width: Math.max(doc.clientWidth, window.innerWidth || 0),
      height: Math.max(doc.clientHeight, window.innerHeight || 0),
    };
  }

  return (element as HTMLElement).getBoundingClientRect();
}

export function getScroll(element: ScrollElement = window) {
  if ('scrollTop' in element) {
    return {
      top: element.scrollTop,
      left: element.scrollLeft,
    };
  }

  return {
    top: window.pageYOffset,
    left: window.pageXOffset,
  };
}

export function getPagePosition(element: HTMLElement) {
  const rect = getRect(element);
  let top;
  let left;

  if (document.scrollingElement) {
    top = document.scrollingElement.scrollTop;
    left = document.scrollingElement.scrollLeft;
  } else {
    top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    left =
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft;
  }

  return {
    top: rect.top + top,
    bottom: rect.bottom + top,
    left: rect.left + left,
    right: rect.right + left,
  };
}
