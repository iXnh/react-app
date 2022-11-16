import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../Services/ContactServices';

const EditContact = () => {


    const { contactId } = useParams();

    const [state, setState] = useState({
        contact: {
            nik: '',
            image: '',
            nama: '',
            pekerjaan: '',
            groupId: '',
        },
        groups: [],
        errorMessage: '',
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


    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    const { contact, groups } = state;



    return (
        <Fragment>
            <pre>{JSON.stringify(contact)}</pre>
            <section className="add-contact p-4">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 fw-bold">Edit Data</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cold-md-2">
                            <form>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='nik'
                                        value={contact.nik}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="NIK" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='image'
                                        value={contact.image}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Foto url" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='nama'
                                        value={contact.nama}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Nama" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='pekerjaan'
                                        value={contact.pekerjaan}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Pekerjaan" />
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name='groupId'
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Jenis Kelamin</option>
                                        {
                                            groups.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.nama}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2 float-end">
                                    <input type="submit" className="btn btn-primary me-2" placeholder="Simpan Update" />
                                    <Link to='/contacts/list' className='btn btn-dark'>ke data lists</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img className='img-fluid contact-img' src={contact.image} alt="..." />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
};

export default EditContact;