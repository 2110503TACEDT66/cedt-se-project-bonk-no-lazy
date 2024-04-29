import { setDate } from 'date-fns';
import { da } from 'date-fns/locale';
import { useState } from 'react';
import { create } from 'zustand';

interface UpdateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateModal = create<UpdateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useUpdateModal;
