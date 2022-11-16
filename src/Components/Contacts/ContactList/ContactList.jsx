import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactService } from '../../../Services/ContactServices';

const ContactList = () => {


    const [query, setQuery] = useState({
        text: '',
    });


    const [state, setState] = useState({
        contacts: [],
        filterData: [],
        errorMessage: null
    });

    useEffect(() => {
        ContactService.getAllContacts()
            .then((response) => {
                setState({
                    ...state,
                    contacts: response.data,
                    filterData: response.data
                });
            })
            .catch((error) => {
                setState({
                    ...state,
                    errorMessage: error.message
                });
            });
    }, []);

    //fungsi cari data berdasarkan nama
    const cariData = (event) => {
        setQuery({ ...query, text: event.target.value });
        const theData = state.contacts.filter(contact => {
            return contact.nama.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setState({
            ...state,
            filterData: theData
        });
    };

    const { contacts, filterData } = state;


    return (
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bolder">
                                    <Link to='/contacts/add' className="btn btn-secondary ms-2">
                                        <i className='fa fa-plus-circle me-2' />
                                        Tambah Data Baru</Link>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <form className='row'>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input
                                                name='text'
                                                value={query.text}
                                                onChange={cariData}
                                                type="text" className="form-control" placeholder="Cari Nama..." />
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-list">
                <div className="container">
                    <div className="row">
                        {
                            filterData.map((contact) => {
                                return (
                                    <div className="col-md-6" key={contact.id}>
                                        <div className="card my-2">
                                            <div className="card-body">
                                                <div className="row align-items-center d-flex justify-content-around">
                                                    <div className="col-md-4 mb-2">
                                                        <img src={contact.image} alt="..." className="img-fluid contact-img" />
                                                    </div>
                                                    <div className="col-md-7">
                                                        <ul className='list-group mb-2'>
                                                            <li className='list-group-item list-group-item-action'>
                                                                NIK : <span className='fw-bold'>{contact.nik}</span>
                                                            </li>
                                                            <li className='list-group-item list-group-item-action'>
                                                                Name : <span className='fw-bold'>{contact.nama}</span>
                                                            </li>
                                                            <li className='list-group-item list-group-item-action'>
                                                                Pekerjaan : <span className='fw-bold'>{contact.pekerjaan}</span>
                                                            </li>
                                                            <li className='list-group-item list-group-item-action'>
                                                                Jenis Kelamin : <span className='fw-bold'>{contact.groupId}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-1 align-items-center">
                                                        <Link to={`/contacts/view/${contact.id}`} className='btn btn-sm btn-warning me-2 my-1' title='lihat data'>
                                                            <i className='fa fa-eye' />
                                                        </Link>
                                                        <Link to={`/contacts/edit/${contact.id}`} className='btn btn-sm btn-primary me-2 my-1' title='edit data'>
                                                            <i className='fa fa-edit' />
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                )
                            })}


                    </div>
                </div>
                <pre>{JSON.stringify(contacts, null, 2)}</pre>
            </section>

        </React.Fragment>
    )
};

export default ContactList;