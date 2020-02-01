import { default as ToastComponent } from './Toast';
import { show, info, success, warning, error } from './fns';
import './index.less';

const Toast = {
  show,
  info,
  success,
  warning,
  error,
};

export * from './Toast';
export { ToastComponent, Toast };
export default Toast;
