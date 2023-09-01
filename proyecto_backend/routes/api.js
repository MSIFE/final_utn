var express = require('express');
var router = express.Router();
var galleryModel = require('../models/galleryModels');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/gallery', async function ( req, res , next){
    let gallery = await galleryModel.getGallery();

    gallery = gallery.map(programas => {
        if (programas.img_id){
            const imagen = cloudinary.url(programas.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return{
                ...programas,
                imagen
            }
        } else{
            return {
                ...programas,
                imagen: ''
            }
        }
    });

    res.json(gallery)
});

router.post('/contacto', async (req, res) => {
    const mail ={
        to: 'mati598.sife@gmail.com',
        subject: 'Contacto web',
        html:`${req.body.nombre} conexión via web ${req.body.email}
        <br> Hizo comentario: ${req.body.mensaje} <br>teléfono: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error:false,
        message: 'Mensaje enviado'
    });

});

module.exports = router;