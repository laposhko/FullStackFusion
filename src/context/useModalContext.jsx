import { useContext } from 'react';
import ModalContext from './ModalContext';

export const useModalContext = () => useContext(ModalContext);