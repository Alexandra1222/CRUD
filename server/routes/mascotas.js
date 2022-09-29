const express = require("express")
const formidable = require("formidable")
const fs = require("fs");

const Mascota = require("../models/mascotas")
const router = express.Router();

const CreateMascota = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        if (!fields.nombre || !fields.especie || !fields.sexo || !fields.telefonoDueño || !fields.mailDueño || !file.fotoMascota || !fields.descripcionMascota || !fields.tamañoMascota) {
            return res.status(400).json({ error: "Debes completar todos los campos por favor" })
        }



        const mascota = new Mascota(fields)
        if (file.fotoMascota) {
            if (file.fotoMascota.size > 400000) {
                return res.status(400).json({ error: "el archivo es muy grande" })
            }
            mascota.fotoMascota.data = fs.readFileSync(file.fotoMascota.filepath)
            mascota.fotoMascota.contentType = file.fotoMascota.mimetype

            mascota.save((err, result) => {
                console.log('entrando en el save de mascota ')
                if (err) {
                    return res.status(400).json({ error: err })
                }

            })
            console.log('guarda la nueva mascota')
            return res.json({ mascota })
        }
    })

}

//
const GetMascotas = (req, res) => {
    Mascota.find((err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json(data)
    }
    )
}


const IntegranteFoto = (req, res) => {
    let id = req.params.mascotaId;
    Mascota.findById(id).exec((err, mascota) => {
        if (err || !mascota) {
            res.status(400).json({ error: 'los datos no se encuentran ' })
        } else {
            if (mascota.fotoMascota.data) {
                res.set('Content-Type', mascota.fotoMascota.contentType)
                return res.send(mascota.fotoMascota.data)
            }
        }

    })
}

const UpdateMascota = (req, res) => {
    let id = req.params.mascotaId;
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        Mascota.findByIdAndUpdate(
            id,
            { $set: { ...fields } },
            { new: true },
            (err, mascota) => {
                if (err) {
                    return res.status(400).json({ error: "ups, no se puede actualizar la mascota" })
                }
                if (file.fotoMascota) {
                    if (file.fotoMascota.size > 100000) {
                        return res.status(400).json({ error: "el archivo es muy grande" })
                    }
                    mascota.fotoMascota.data = fs.readFileSync(file.fotoMascota.filepath)
                    mascota.fotoMascota.contentType = file.fotoMascota.mimetype

                    mascota.save((err, result) => {
                        if (err) {
                            return res.status(400).json({ error: err })
                        }
                    })
                    res.json({ mascota })
                }

            }
        )
    })
}

const DeleteMascota = async (req, res) => {
    const id = req.params.mascotaId;
    const del = await Mascota.findByIdAndDelete(id)
    res.json(del)
}



//
router.post("/create", CreateMascota)
router.get("/get", GetMascotas)

//por foto
router.get('/photo/:mascotaId', IntegranteFoto)
router.put("/edit/:mascotaId", UpdateMascota)
router.delete("/delete/:mascotaId", DeleteMascota)

module.exports = router; 