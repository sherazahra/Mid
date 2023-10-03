const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');

const connection = require('../config/db.js');

router.get('/', function (req, res){
    connection.query('SELECT pelanggan.*, review.Rating FROM pelanggan JOIN review ON pelanggan.ID_Review = review.ID_Review',
     function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Pelanggan',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('ID_Review').notEmpty(),
    body('Nama_Pelanggan').notEmpty(),
    body('Alamat').notEmpty(),
    body('Nomor_Telepon').notEmpty()

],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        ID_Review: req.body.ID_Review,
        Nama_Pelanggan: req.body.Nama_Pelanggan,
        Alamat: req.body.Alamat,
        Nomor_Telepon: req.body.Nomor_Telepon

    }
    connection.query('insert into pelanggan set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                satus: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT pelanggan.*, review.Rating FROM pelanggan JOIN review ON pelanggan.ID_Review = 
    review.ID_Review where ID_Pelanggan = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data Pelanggan',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/(:id)', [
    body('ID_Review').notEmpty(),
    body('Nama_Pelanggan').notEmpty(),
    body('Alamat').notEmpty(),
    body('Nomor_Telepon').notEmpty()   
], (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        ID_Review: req.body.ID_Review,
        Nama_Pelanggan: req.body.Nama_Pelanggan,
        Alamat: req.body.Alamat,
        Nomor_Telepon: req.body.Nomor_Telepon
    }
    connection.query(`update pelanggan set ? where ID_Pelanggan = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else {
            return res.status(200).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
})

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from pelanggan where ID_Pelanggan = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(500).json({
                status: true,
                message: 'Data berhasil di hapus!',
            })
        }
    })
})

module.exports = router;