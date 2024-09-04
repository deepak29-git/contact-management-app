import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
};

type ContactState = Contact[];
const initialState: ContactState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    updateContact: (state, action) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteContact: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactsSlice.actions;
export default contactsSlice.reducer;
