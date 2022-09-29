import React, { useState } from 'react'
import Header from '../header/Header'
import './mascota.scss'

export default function CreateMascota() {
    const [mascota, setMascota] = useState({
        nombre: "",
        especie: "",
        sexo: "",
        telefonoDueño: "",
        mailDueño: "",
        fotoMascota: "",
        descripcionMascota: "",
        tamañoMascota: "",
        formData: new FormData(),
        error: false,
        open: false
    })
    const { nombre, especie, sexo, telefonoDueño, mailDueño, fotoMascota, descripcionMascota, tamañoMascota, formData, error, open } = mascota

    const handleChange = event => {
        const { name } = event.target;
        const value = name === "fotoMascota" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setMascota({ ...mascota, [name]: value, error: false })
    }


    const submit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/create`, {
                method: "post",
                body: formData
            })
            const data = await res.json()
            console.log(data)
            if (data.error) {
                setMascota({ ...mascota, error: data.error })
            }
            else {
                setMascota({
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
                <button className='btn btn-raised btn-primary mt-2' onClick={() => submit()}>Guardar</button>
            </form>
        )
    }

    return (

        <div className='container'>
            <Header />
            <h2 className='mt-5 mb-5'>Formulario de  Registro- Guarderia "Amigo Fiel"</h2>
            <div className='alert alert-danger'
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
            <div className='alert alert-info'
                style={{ display: open ? "" : "none" }}
            >
                Mascota enviada  satisfactoriamente, Bienvenid@ !!
            </div>
            {fillMascotas()}


        </div>
    )
}
