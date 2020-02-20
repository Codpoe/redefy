type ScrollElement = HTMLElement | Window;

interface Margin {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

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

export function isXVisible(element: HTMLElement, margin?: Margin) {
  const { width } = getRect(window);
  const { left, right } = getRect(element);
  const { marginLeft = 0, marginRight = 0 } = margin || {};
  const windowLeft = -marginLeft;
  const windowRight = width + marginRight;

  return (
    (left > windowLeft && left < windowRight) ||
    (right > windowLeft && right < windowRight)
  );
}

export function isYVisible(element: HTMLElement, margin?: Margin) {
  const { height } = getRect(window);
  const { top, bottom } = getRect(element);
  const { marginTop = 0, marginBottom = 0 } = margin || {};
  const windowTop = -marginTop;
  const windowBottom = height + marginBottom;

  return (
    (top > windowTop && top < windowBottom) ||
    (bottom > windowTop && bottom < windowBottom)
  );
}

export function isVisible(element: HTMLElement, margin?: Margin) {
  return isXVisible(element, margin) && isYVisible(element, margin);
}

export function findNearestElement(
  element: HTMLElement,
  targetTagName: keyof HTMLElementTagNameMap
) {
  while (element && element.tagName !== 'HTML' && element.tagName !== 'BODY') {
    if (element.tagName.toLowerCase() === targetTagName) {
      return element;
    }
    element = element.parentElement as HTMLElement;
  }

  return null;
}
