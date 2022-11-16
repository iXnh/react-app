import React, {Fragment} from 'react';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import ContactList  from './Components/Contacts/ContactList/ContactList';
import AddContact from './Components/Contacts/AddContact/AddContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import EditContact from './Components/Contacts/EditContact/EditContact';

const App = () => {
  return (
    <Fragment>
      <NavBar/>
      <Routes>
        <Route path={"/"} element={<Navigate to={'contacts/list'}/> } />
        <Route path={"contacts/list"} element={<ContactList/>} />
        <Route path={"contacts/add"} element={<AddContact/>} />
        <Route path={"contacts/view/:contactId"} element={<ViewContact/>} />
        <Route path={"contacts/edit/:contactId"} element={<EditContact/>} />
      </Routes>      
    </Fragment>
  );
}

export default App;
