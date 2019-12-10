import React from 'react';
import ReactDOM from 'react-dom';
import Toast, { ToastType } from './Toast';

type ShowFn = (
  type: ToastType,
  content: React.ReactNode,
  duration?: number
) => void;

type ShowAliasFn = (content: React.ReactNode, duration?: number) => void;

export const show: ShowFn = (type, content, duration) => {
  const div = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render(
    <Toast type={type} content={content} duration={duration} mountNode={div} />,
    div
  );
};

export const info: ShowAliasFn = (...rest) => show('info', ...rest);

export const success: ShowAliasFn = (...rest) => show('success', ...rest);

export const warning: ShowAliasFn = (...rest) => show('warning', ...rest);

export const error: ShowAliasFn = (...rest) => show('error', ...rest);
