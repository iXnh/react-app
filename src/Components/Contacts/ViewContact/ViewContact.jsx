import React, {useEffect, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import { ContactService } from '../../../Services/ContactServices';

const ViewContact = () => {

    const { contactId } = useParams();

    const [state, setState] = useState({
        contact: [],
        errorMessage: null
    });

    useEffect(() => {
        ContactService.getContact(contactId)
            .then(response => {
                setState({
                    ...state,
                    contact: response.data
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    errorMessage: error.message
                });
            });
    }, [contactId]);

    const { contact, errorMessage } = state;

    return (
        <React.Fragment>
            <section className="view-contact p-3"> 
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 fw-bold">Lihat Data</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                Object.keys(contact).length > 0 &&
                <section className="view-contact mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={contact.image} alt="foto-user" className="contact-img mb-3" />
                        </div>
                        <div className="col-md-8 mb-3">
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
                                                Jenis Kelamin : <span className='fw-bold'>{contact.genderId}</span>         
                                            </li>                          
                                        </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                           <Link to='/contacts/list' className='btn btn-outline-dark'> back </Link> 
                        </div>
                    </div>
                </div>
            </section>

            }
           

        </React.Fragment>
    )
};

export default ViewContact;