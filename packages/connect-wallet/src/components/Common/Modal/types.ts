import {eventNames} from '@shopify/blockchain-components';
import {PropsWithChildren, ReactNode} from 'react';

type EventName = keyof typeof eventNames;

export interface ModalProps extends PropsWithChildren {
  closeEventName?: EventName;
  leftButton?: ReactNode;
  onDismiss: () => void;
  title?: string;
  visible?: boolean;
}
