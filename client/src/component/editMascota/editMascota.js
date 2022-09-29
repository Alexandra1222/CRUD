import React, { useEffect, useState } from 'react'
import './editMascota.scss'
import Header from '../header/Header'
import { useLocation } from "react-router-dom"

export default function EditMascota() {
    const location = useLocation()
    const [editMascota, setEditMascota] = useState({
        nombre: "",
        especie: "",
        sexo: "",
        telefonoDueño: "",
        mailDueño: "",
        fotoMascota: "",
        descripcionMascota: "",
        tamañoMascota: "",
        error: " ",
        open: false
    })
    const [form, setForm] = useState({
        formData: new FormData(),
    })
    const { formData } = form;
    const { _id, nombre, especie, sexo, telefonoDueño, mailDueño, descripcionMascota, tamañoMascota, error, open } = editMascota

    useEffect(() => {
        setEditMascota({ ...location.state })
    }, [])

    const handleChange = event => {
        const { name } = event.target;
        const value = name === "fotoMascota" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        console.log('data', formData)
        setEditMascota({ ...editMascota, [name]: value, error: "" })
    }


    const submit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/edit/${_id}`, {
                method: "PUT",
                body: formData
            })
            const data = await res.json()
            console.log(data)
            if (data.error) {
                setEditMascota({ ...editMascota, error: data.error })
            }
            else {
                setEditMascota({
                    nombre: "",
                    especie: "",
                    sexo: "",
                    telefonoDueño: "",
                    mailDueño: "",
                    fotoMascota: "",
                    descripcionMascota: "",
                    tamañoMascota: "",
                    open: true
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    //form
    const fillMascotas = () => {
        return (
            <form onSubmit={e => e.preventDefault()}>

                <div className='form-group'>
                    <label className='text-muted'>Nombre</label>
                    <input type=" text" value={nombre} name="nombre" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>especie</label>
                    <input type=" text" value={especie} name="especie" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>sexo</label>
                    <input type=" text" value={sexo} name="sexo" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Telefono del Dueño</label>
                    <input type=" text" value={telefonoDueño} name="telefonoDueño" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Mail del Dueño</label>
                    <input type=" text" value={mailDueño} name="mailDueño" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Foto de la Mascota</label>
                    <input type="file" name="fotoMascota" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Descripcion</label>
                    <input type=" text" value={descripcionMascota} name="descripcionMascota" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Tamaño Mascota</label>
                    <input type=" text" value={tamañoMascota} name="tamañoMascota" onChange={handleChange} />
                </div>
                <button className='btn btn-raised btn-primary mt-2' onClick={() => submit()}>Actualizar</button>
            </form>
        )
    }

    return (

        <div className='container'>
            <Header />
            <h2 className='mt-5 mb-5'>Formulario de  Edicion- Guarderia "Amigo Fiel"</h2>
            <div className='alert alert-danger'
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
            <div className='alert alert-info'
                style={{ display: open ? "" : "none" }}
            >
                LOS DATOS DE LA MASCOTA FUERON EDITADOS SATISFACTORIAMENTE
            </div>
            {fillMascotas()}


        </div>
    )
}
