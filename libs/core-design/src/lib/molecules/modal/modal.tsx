import { cn } from '../../utils';
import { useModal } from './use-modal';

export interface ModalProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  isLocked?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  isLocked,
  onClose,
  children,
  className,
  ...rest
}) => {
  const { modalRef, dialogClasses, onCancel, onClick, onAnimationEnd } =
    useModal({ isOpen, isLocked, onClose });

  return (
    <dialog
      ref={modalRef}
      className={cn(dialogClasses, className)}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      {...rest}
    >
      {children}
    </dialog>
  );
};
