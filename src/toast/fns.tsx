import React from 'react';
import ReactDOM from 'react-dom';
import Toast, { ToastType } from './Toast';

export interface ToastShowFn {
  (type: ToastType, content: React.ReactNode, duration?: number): void;
}

export interface ToastShowAliasFn {
  (content: React.ReactNode, duration?: number): void;
}

export const show: ToastShowFn = (type, content, duration) => {
  const div = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render(
    <Toast type={type} content={content} duration={duration} mountNode={div} />,
    div
  );
};

export const info: ToastShowAliasFn = (...rest) => show('info', ...rest);

export const success: ToastShowAliasFn = (...rest) => show('success', ...rest);

export const warning: ToastShowAliasFn = (...rest) => show('warning', ...rest);

export const error: ToastShowAliasFn = (...rest) => show('error', ...rest);
