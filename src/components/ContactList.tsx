// src/components/ContactList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/feature/ContactSlice/ContactSlice';
import ContactForm from './ContactForm';
import { RootState } from '../redux/store';

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
};
type ContactListProps = {
  showForm: boolean;
};
const ContactList = ({ showForm }: ContactListProps) => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleCloseForm = () => {
    setEditingContact(null);
  };

  return (
    <div>
      {/* Display message if no contacts and form is not shown */}
      {contacts.length === 0 && !showForm ? (
        <div className="flex items-center justify-center border w-max border-gray-300 p-4 my-4 mx-auto">
          {/* Icon and Message Container */}
          <div className="flex items-center space-x-2 ">
            {/* Round Cross Icon */}
            <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Message Text */}
            <div className="text-left">
              <p>
                No Contact Found
                <br /> Please add a contact from
                <br /> Create Contact button.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {contacts.map((contact: Contact) => (
            <div className=" mx-auto flex" key={contact.id}>
              <div className="p-4 mb-4">
                <div className="border border-black p-4 w-max mb-4">
                  <p>First Name: {contact.firstName}</p>
                  <p>Last Name: {contact.lastName}</p>
                  <p>Status: {contact.status}</p>
                </div>
                {/* Edit and Delete buttons styled and placed below each other */}
                <div className="flex flex-col items-center mx-auto space-y-2 mt-2 w-20">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="bg-green-500 text-white p-2 rounded font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 text-white p-2 rounded font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Display ContactForm if a contact is being edited */}
      {editingContact && (
        <ContactForm
          existingContact={editingContact}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ContactList;
