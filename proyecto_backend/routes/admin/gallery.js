var express = require('express');
var router = express.Router();
var galleryModel = require('../../models/galleryModels');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


/* GET home page. */
router.get('/', async function (req, res, next) {

  var gallery = await galleryModel.getGallery();

  gallery = gallery.map(programas => {
    if (programas.img_id) {
      const imagen = cloudinary.image(programas.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...programas,
        imagen
      }
    } else {
      return {
        ...programas,
        imagen: ''
      }
    }
  })

  res.render('admin/gallery', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    gallery
  });
});



router.get('/nuevo', (req, res, next) => {
  res.render('admin/nuevo', {
    layout: 'admin/layout'
  })
})

router.post('/nuevo', async (req, res, next) => {
  try {
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.info != "" && req.body.precio) {

      await galleryModel.insertGallery({
        ...req.body,
        img_id
      });
      res.redirect('/admin/gallery')
    } else {
      res.render('admin/nuevo', {
        layout: 'admin/layout',
        error: true,
        message: 'Complete todos los items'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/nuevo', {
      layout: 'admin/layout',
      error: true,
      message: 'Problemas al cargar Items'
    })
  }
})

router.get('/eliminar/:id_pro', async (req, res, next) => {
  var id_pro = req.params.id_pro;

  let gallery = await galleryModel.getGalleryById(id_pro);
  if(gallery.img_id){
    await (destroy(gallery.img_id));
  }

  await galleryModel.deleteGalleryById(id_pro);
  res.redirect('/admin/gallery')
})

router.get('/modificar/:id_pro', async (req, res, next) => {
  var id_pro = req.params.id_pro;
  var gallery = await galleryModel.getGalleryById(id_pro);

  res.render('admin/modificar', {
    layout: 'admin/layout',
    gallery
  })
})


router.post('/modificar', async (req, res, next) => {
  try {

    let img_id = req.body.img_original;

    let borrar_img_vieja = false;

    if (req.body.img_delete === '1') {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }

    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    var obj = {
      titulo: req.body.titulo,
      info: req.body.info,
      precio: req.body.precio,
      img_id
    }

    console.log(req.body.id_pro)
    console.log()

    await galleryModel.modificarGallery(obj, req.body.id_pro);
    res.redirect('/admin/gallery');

  }
  catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  }
})
module.exports = router; 