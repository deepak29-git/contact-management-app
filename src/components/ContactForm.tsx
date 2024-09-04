// src/components/ContactForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addContact,
  updateContact,
} from "../redux/feature/ContactSlice/ContactSlice";

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
};
type ContactFormProps={
  existingContact?:Contact,
  onClose:()=>void
}
const ContactForm = ({ existingContact, onClose }:ContactFormProps) => {
  const [contact, setContact] = useState<Contact>(
    existingContact || {
      id: "",
      firstName: "",
      lastName: "",
      status: "active",
    }
  );
  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (existingContact) {
      dispatch(updateContact(contact));
    } else {
      dispatch(addContact({ ...contact, id: Date.now().toString() }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
      <div className="p-4 border border-black flex flex-col space-y-4 w-fit justify-center">
        {/* Input fields for first name and last name */}
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            id="firstName"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            required
            className="p-2 border border-black"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            required
            className="p-2 border border-black"
          />
        </div>

        {/* Radio buttons for status */}
        <div className="flex">
          <label className="pr-9" htmlFor="status">
            Status:{" "}
          </label>
          <div>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={contact.status === "active"}
                  onChange={handleChange}
                  className="mr-2"                
                />
                Active
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={contact.status === "inactive"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="flex justify-center">
      {/* Submit button */}
        <button
          type="submit"
          className="mt-3 p-2 bg-gray-300 border border-black text-black">
          {existingContact ? "Save Editted" : "Save"} Contact
        </button>
      </div>
      
    </form>
  );
};

export default ContactForm;
