import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import Header from '../../components/Header';

const Contact = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <>
      <Header headerText={'Contact Page'} />

      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full pt-5">
          {!showForm ? (
            <div className="flex justify-center mb-5">
              <button
                className="outline outline-2 outline-offset-2"
                onClick={() => setShowForm(true)}
              >
                Create Contact
              </button>
            </div>
          ) : (
            <h2 className="text-center pb-4 font-semibold">
              Create Contact Screen
            </h2>
          )}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <ContactList showForm={showForm} />
              {showForm && <ContactForm onClose={() => setShowForm(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
