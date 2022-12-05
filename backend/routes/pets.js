const express = require("express");
const multer = require("multer");
const Pet = require('../models/pet');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Extension no valida");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '-'+ ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) =>{
  const url = req.protocol + '://' + req.get("host");
  const pet = new Pet({
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    caja: req.body.caja,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  pet.save().then(createdPet =>{
    res.status(201).json({
      message: 'Post added succesful',
      pet:{
        ...createdPet,
        id: createdPet._id
      }
    });
  });
});

router.put("/:id", multer({storage: storage}).single("image"),(req, res, next) =>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const pet = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    caja: req.body.caja,
    content: req.body.content,
    imagePath: imagePath
  };
  Pet.updateOne({_id: req.params.id}, pet).then(result =>{
    res.status(200).json({message: "Pet updated Succesfully"});
  })
});

router.get('/all', (req, res, next)=>{
  Pet.find().then(documents =>{
    res.status(200).json({
      message:'Publicaciones expuestas con Exito!',
      pets: documents
    });
  });
});

router.get('/:id', (req, res, next)=>{
  Pet.findById(req.params.id).then(pet =>{
    if(pet){
      res.status(200).json(pet);
    }
    else{
      res.status(404).json({message: 'Pet no encontrado'});
    }
  });
});

router.delete('/:id', (req, res, next)=>{
  Pet.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({
      result
    })
  });
});

module.exports= router;
