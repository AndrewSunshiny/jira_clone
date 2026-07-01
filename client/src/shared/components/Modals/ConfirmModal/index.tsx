import { useState, type ReactNode } from 'react';

import {
  Message,
  StyledButtonComponent,
  StyledConfirmModalComponent,
  StyledInputComponent,
  InputLabel,
  Title,
} from './styles';

interface Props {
  className?: string;
  title?: string;
  message?: string | ReactNode;
  InputLabel?: string;
  confirmText?: string;
  cancelText?: string;
  confirmInput?: string | null;
  type?: 'primary' | 'danger';
  onConfirm: (...params: any) => any;
  renderLink: (...params: any) => any;
}

const ConfirmModal = ({
  className = undefined,
  title = 'Warning',
  message = 'Are you sure you want to continue with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmInput = null,
  type = 'primary',
  renderLink = () => {},
  onConfirm = () => {},
}: Props) => {
  const [stateIsConfirmEnabled, setStateIsConfirmEnabled] = useState(false);
  const [stateIsWorking, setStateIsWorking] = useState(false);

  const handleConfirm = (modal: any): void => {
    setStateIsWorking(true);
    onConfirm({
      close: () => {
        modal.close();
        setStateIsWorking(false);
      },
    });
  };

  const handleConfirmInputChange = (value: any): void =>
    setStateIsConfirmEnabled(value.trim().toLowerCase() === confirmInput?.toLocaleLowerCase());

  return (
    <StyledConfirmModalComponent
      className={className}
      onClose={() => setStateIsConfirmEnabled(false)}
      renderLink={renderLink}
      renderContent={(modal) => (
        <>
          <Title>{title}</Title>
          {!!message && <Message>{message}</Message>}
          {!!confirmInput && (
            <>
              <InputLabel>{`Type ${confirmInput} below to confirm.`}</InputLabel>
              <StyledInputComponent onChange={(_event, value) => handleConfirmInputChange(value)} />
              <br />
            </>
          )}
          <StyledButtonComponent hollow onClick={modal.close}>
            {cancelText}
          </StyledButtonComponent>
          <StyledButtonComponent
            color={type}
            disabled={!!confirmInput && !stateIsConfirmEnabled}
            working={stateIsWorking}
            onClick={() => handleConfirm(modal)}
          >
            {confirmText}
          </StyledButtonComponent>
        </>
      )}
    ></StyledConfirmModalComponent>
  );
};

export default ConfirmModal;
