import { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import pubsub from 'sweet-pubsub';
import { uniqueId } from 'lodash';

import { Icon } from '@/shared/components';
import { Container, StyledToast, Title, Message } from './styles';
import type { color } from '@/shared/utils/styles';

interface Toast {
  id: string;
  type: keyof typeof color;
  title: string;
  message: string;
}

interface AddToast {
  type?: string;
  title?: string;
  message?: string;
  duration?: number;
}

class Toast extends Component {
  state: { toasts: Toast[] } = { toasts: [] };

  addToast = ({ type = 'success', title, message, duration = 5 }: AddToast): void => {
    const id = uniqueId('toast-');

    this.setState((state: typeof this.state) => ({
      toasts: [...state.toasts, { id, type, title, message }],
    }));

    if (duration) {
      setTimeout(() => this.removeToast(id), duration * 1000);
      Toast;
    }
  };

  removeToast = (id: string): void => {
    this.setState((state: typeof this.state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  };

  componentDidMount() {
    pubsub.on('toast', this.addToast);
  }

  componentWillUnmount() {
    pubsub.off('toast', this.addToast);
  }

  render() {
    const { toasts } = this.state;
    return (
      <Container>
        <TransitionGroup>
          {toasts.map((toast) => (
            <CSSTransition key={toast.id} classNames="jira-toast" timeout={200}>
              <StyledToast type={toast.type} onClick={() => this.removeToast(toast.id)}>
                <Icon type="close" />
                {toast.title && <Title>{toast.title}</Title>}
                {toast.message && <Message>{toast.message}</Message>}
              </StyledToast>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
}

export default Toast;
