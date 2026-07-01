import { useCallback, useEffect, useRef, useState } from 'react';
import { uniqueId as uniqueIncreasingIntegerId } from 'lodash';

import { ClickableOverlay, CloseIconComponent, ScrollOverlay, StyledModal } from './styles';
import useOnOutsideClick from '@/shared/hooks/onOutsideClick';
import useOnEscapeKeydown from '@/shared/hooks/onEscapeKeydown';
import { createPortal } from 'react-dom';

const $root = document.getElementById('root')!;

const getIdsOfAllOpenModals = (): number[] => {
  const $modalNodes = Array.from(document.querySelectorAll('[data-jira-modal-id]'));
  return $modalNodes.map(($node) => parseInt($node.getAttribute('data-jira-modal-id') ?? ''));
};

const shouldNotCloseBecauseHasOpenChildModal = (modalId: string): boolean =>
  getIdsOfAllOpenModals().some((id) => id > +modalId);

const setBodyScrollLock = (): void => {
  const areAnyModalsOpen = getIdsOfAllOpenModals().length > 0;
  document.body.style.overflow = areAnyModalsOpen ? 'hidden' : 'visible';
};

interface Props {
  className?: string;
  variant?: 'center' | 'aside';
  isOpen?: boolean | null | undefined;
  onClose?: (...params: any) => any;
  renderLink?: (...params: any) => any;
  renderContent?: (...params: any) => any;
}
const Modal = ({
  className = undefined,
  variant = 'center',
  isOpen: propsIsOpen = undefined,
  onClose: tellParentToClose = () => {},
  renderLink = () => {},
  renderContent = () => {},
}: Props) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const $modalRef = useRef(null);
  const modalIdRef = useRef(uniqueIncreasingIntegerId());

  const closeModal = useCallback(() => {
    if (shouldNotCloseBecauseHasOpenChildModal(modalIdRef.current)) return;
    if (!isControlled) setStateOpen(false);
    else tellParentToClose();
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal);
  useOnEscapeKeydown(isOpen, closeModal);
  useEffect(setBodyScrollLock, [isOpen]);

  const renderModal = () => (
    <ScrollOverlay data-jira-modal-id={modalIdRef.current}>
      <ClickableOverlay $variant={variant}>
        <StyledModal className={className} $variant={variant} ref={$modalRef}>
          <CloseIconComponent type="close" $variant={variant} onClick={closeModal} />
          {renderContent({ close: closeModal })}
        </StyledModal>
      </ClickableOverlay>
    </ScrollOverlay>
  );

  return (
    <>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}
      {!isOpen && createPortal(renderModal(), $root)}
    </>
  );
};

export default Modal;
