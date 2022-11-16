import React, { Fragment, useState, useEffect  }  from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { ContactService } from '../../../Services/ContactServices';

const AddContact = () => {

    const navigate = useNavigate();

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

    
   let updateInput = (event) => {
    setState({
        ...state,
       contact : {
            ...state.contact,
            [event.target.name]: event.target.value
        }
    });
};
    
    useEffect(() => {
        ContactService.getGroups()
            .then(response => {
                setState({
                    ...state,
                    groups: response.data
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    errorMessage: error.message
                });
            });
    }, []);

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.createContact(state.contact);
            if(response){
                navigate('/contacts/list',{ replace: true });
            }
        } catch (error) {
            setState({...state , errorMessage: error.message});
            navigate('/contacts/add',{ replace: false });
        }
    };

    const { contact, groups } = state;

    return (
        <Fragment>
           <section className="add-contact">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 fw-bold">Bikin Data</p>
                         </div>
                     </div>
                     <div className="row">
                        <div className="cold-md-8">
                            <form className='row' onSubmit={submitForm}>
                               <div className='col-md-4'> 
                                <div className="mb-2">
                                  <input 
                                        required={true}    
                                        name="nik" 
                                        value={contact.nik} 
                                        onChange={updateInput}  
                                        type="number" 
                                        className="form-control" 
                                        placeholder="NIK" /> 
                                </div>
                                <div className="mb-2">
                                  <input 
                                        required={true}    
                                        name="image" 
                                        value={contact.image} 
                                        onChange={updateInput}  
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Foto url" /> 
                                </div>
                                <div className="mb-2">
                                  <input 
                                        required={true}
                                        name="nama" 
                                        value={contact.nama} 
                                        onChange={updateInput} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Nama" /> 
                                </div>
                                <div className="mb-2">
                                  <input
                                        required={true} 
                                        name="pekerjaan"
                                        type="text" 
                                        value={contact.pekerjaan} 
                                        onChange={updateInput} 
                                        className="form-control" 
                                        placeholder="Pekerjaan" /> 
                                </div>
                                <div className="mb-2">
                                    <select 
                                              required={true} 
                                              name="genderId"
                                              type="text"  
                                                                      
                                              className="form-control">
                                        <option value="">Jenis Kelamin</option>
                                        {
                                            groups.length > 0 &&
                                            groups.map(group => {
                                                return (
                                                <option key={group.id} value={group.id} >{group.nama}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2 float-end">
                                  <input type="submit" className="btn btn-success me-2" placeholder="Bikin" /> 
                                    <Link to='/contacts/list' className='btn btn-dark'>ke data lists</Link>
                                </div>
                                </div>
                            </form>
                        </div>
                     </div>
                 </div>
           </section>
           <pre>{JSON.stringify(state.contact, null, 2)}</pre>
        </Fragment>
    )
};

export default AddContact;