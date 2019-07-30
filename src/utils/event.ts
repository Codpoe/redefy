import React from 'react';

export interface BaseEvent {
  stopPropagation: React.SyntheticEvent['stopPropagation'];
  preventDefault: React.SyntheticEvent['preventDefault'];
  nativeEvent: React.SyntheticEvent['nativeEvent'];
}

export interface XEvent<T = Record<string, any>> extends BaseEvent {
  target: T;
}

export const toXEvent = <T>(event: BaseEvent, target: T): XEvent<T> => ({
  target,
  stopPropagation: event.stopPropagation,
  preventDefault: event.preventDefault,
  nativeEvent: event.nativeEvent,
});
