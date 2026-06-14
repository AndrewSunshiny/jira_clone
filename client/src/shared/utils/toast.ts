import pubsub from 'sweet-pubsub';
import { get } from 'lodash';

interface Toast {
  title: string;
  type?: 'success' | 'danger' | 'info';
  message?: string;
  duration?: number;
}

const show = (toast: Toast) => pubsub.emit('toast', toast);

const success = (title: string) => show({ title });

const error = (err: string) => {
  show({
    type: 'danger',
    title: 'Error',
    message: get(err, 'message', err),
    duration: 0,
  });
};

export default {
  show,
  error,
  success,
};
