'use client';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  ReactEventHandler,
} from 'react';
import Styles from './modal.module.scss';

interface UseModalProps {
  isOpen: boolean;
  isLocked?: boolean;
  onClose: () => void;
}

export const useModal = ({ isOpen, isLocked, onClose }: UseModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const dialogClasses = useMemo(() => {
    const _arr = [Styles['modal']];
    if (!isOpen) _arr.push(Styles['modal--closing']);

    return _arr.join(' ');
  }, [isOpen]);

  const onCancel: ReactEventHandler<HTMLDialogElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!isLocked) onClose();
    },
    [isLocked, onClose]
  );

  const onClick: ReactEventHandler<HTMLDialogElement> = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el && !isLocked) onClose();
    },
    [isLocked, onClose, modalRef]
  );

  const onAnimationEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (el && !isOpen) el.close();
  }, [isOpen, modalRef]);

  useEffect(() => {
    const { current: el } = modalRef;
    if (el && isOpen) el.showModal();
  }, [isOpen, modalRef]);

  return {
    modalRef,
    dialogClasses,
    onCancel,
    onClick,
    onAnimationEnd,
  };
};
