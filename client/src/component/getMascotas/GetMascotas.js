import React from 'react'
import Header from '../header/Header'
import { Link } from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import DefaultPhoto from '../../component/images/logo.png';


export default function GetMascotas() {
    const [integrantes, setIntegrantes] = useState([])

    const [borrar, setBorrar] = useState({})

    const deletePost = async (id) => {
        let response = await fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        setBorrar(data)
    }

    const deleteConfirmed = (mascotaId) => {
        let ans = window.confirm("Estas seguro que deseas  eliminar esta mascota?")
        if (ans) {
            deletePost(mascotaId)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5000/get', {
                    method: 'GET'
                })
                const data = await res.json();
                setIntegrantes(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        return getData;
    }, [borrar._id])

    return (

        <div>
            <Header />
            <h2 className='mt-5 mb-5'>Nuestros Amiguit@s en "Amigo Fiel"</h2>
            <div className='row'>
                {!integrantes ? <h2>Cargando...</h2> :
                    integrantes.map((integrante) => {
                        let fotoUrl = integrante.fotoMascota ? `http://localhost:5000/photo/${integrante._id}?${new Date().getTime()}` : DefaultPhoto
                        return <div className='col-lg-4' key={integrante._id}>
                            <MDBCard>
                                <MDBCardImage
                                    src={fotoUrl}
                                    alt={integrante.nombre}
                                    style={{ height: "300px", width: "100%", objectFit: "cover" }}
                                />
                                <MDBCardBody>
                                    <MDBCardTitle>{integrante.nombre}</MDBCardTitle>
                                    <MDBCardText>{integrante.especie}</MDBCardText>
                                    <MDBCardText>{integrante.sexo}</MDBCardText>
                                    <MDBCardText>{integrante.telefonoDueño}</MDBCardText>
                                    <MDBCardText>{integrante.mailDueño}</MDBCardText>
                                    <MDBCardText>{integrante.descripcionMascota}</MDBCardText>
                                    <MDBCardText>{integrante.tamañoMascota}</MDBCardText>
                                    <Link to={`/edit/${integrante._id}`} state={{ ...integrante }}
                                        className='btn btn-warning'
                                    >Editar</Link>
                                    <MDBBtn
                                        className='btn btn-danger ms-3'
                                        onClick={() => deleteConfirmed(integrante._id)}
                                    >
                                        Eliminar
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    })

                }

            </div>

        </div>



    )
}
