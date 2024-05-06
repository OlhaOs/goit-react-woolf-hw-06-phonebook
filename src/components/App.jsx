import { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction, deleteContactAction } from 'store/contacts/slice';
import { findContact } from 'store/filter/slice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.searchQuery);

  const handleAddContactBtn = newContact => {
    dispatch(addContactAction(newContact));
  };

  const handleFilterChange = e => {
    dispatch(findContact(e.target.value));
  };

  const handleDeleteContactBtn = id => {
    dispatch(deleteContactAction(id));
  };

  const checkContact = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    handleAddContactBtn(newContact);
  };

  const filtredData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className={css.mainContainer}>
        <h1>Phonebook</h1>
        <ContactForm handleAddContactBtn={checkContact} />
        <Filter filter={filter} onSearch={handleFilterChange} />
        <h2>Contacts</h2>
        <ContactList
          contacts={filtredData}
          onDeleteBtn={handleDeleteContactBtn}
        />
      </div>
    </>
  );
};
