import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Docs({
    database
}) {
    let navigate = useNavigate();
    const isMounted = useRef()
    const [open, setOpen] = React.useState(false);
    const [docsData, setDocsData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const collectionRef = collection(database, 'docsData')

    const addData = () => {
        addDoc(collectionRef, {
            title: title,
            docsDesc: ''
        })
            .then(() => {
                toast.success('Document Added', {
                    autoClose: 2000
                })
                // alert('Data Added');
                handleClose()
                setTitle("")

            })
            .catch(() => {
                toast.success('Cannot add Document', {
                    autoClose: 2000
                })
                // alert('Cannot add data')
            })
    }
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }

    const getID = (id) => {
        navigate(`/editDocs/${id}`)
    }
    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])


    const deleteDocument = async (id) => {
        const channelDoc = doc(database, 'docsData', id);
        await deleteDoc(channelDoc)
            .then(() => {
                getData();
            })
            .catch((error) => {
                console.error('Error deleting document: ', error);
            });
        alert('Want to delete?');
    };

    return (
        <div className='docs-main'>
            <h1>Docs App</h1>

            <button
                className='add-docs'
                onClick={handleOpen}
            >
                Add a Document
            </button>
            <div className='grid-main'>
                {docsData.map((doc) => {
                    return (
                        <div className='grid-child' >
                            <ToastContainer />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p >{doc.title} </p>
                                <div>
                                    <i className="fa-solid fa-pen-to-square" onClick={() => getID(doc.id)}></i>
                                    <i style={{ color: 'rgb(201, 23, 23)', paddingLeft: '20px' }} className='fa-solid fa-trash' onClick={() => deleteDocument(doc.id)}></i>

                                </div></div>
                            {/* <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} /> */}

                        </div>
                    )
                })}
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
            />
        </div>
    )
}