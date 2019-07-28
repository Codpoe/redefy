import React from 'react';

export interface XEvent<T = Record<string, any>> {
  target: T;
  stopPropagation: React.SyntheticEvent['stopPropagation'];
  preventDefault: React.SyntheticEvent['preventDefault'];
  nativeEvent: React.SyntheticEvent['nativeEvent'];
}

export const toXEvent = <T>(
  event: React.SyntheticEvent,
  target: T
): XEvent<T> => ({
  target,
  stopPropagation: event.stopPropagation,
  preventDefault: event.preventDefault,
  nativeEvent: event.nativeEvent,
});
