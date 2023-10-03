const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');

const connection = require('../config/db.js');

router.get('/', function (req, res){
    connection.query('SELECT  p.Tanggal_Pemesanan, k.Tipe_Kamar FROM pesan_kamar as d INNER JOIN pemesanan as p ON d.ID_Pemesanan = p.ID_Pemesanan INNER JOIN kamar as k ON d.ID_Kamar = k.ID_Kamar',
     function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Pesan Kamar',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('ID_Pemesanan').notEmpty(),
    body('ID_Kamar').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        ID_Pemesanan: req.body.ID_Pemesanan,
        ID_Kamar: req.body.ID_Kamar
    }
    connection.query('insert into pesan_kamar set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err
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
    connection.query(`SELECT  p.Tanggal_Pemesanan, k.Tipe_Kamar FROM pesan_kamar as d INNER JOIN pemesanan as p ON d.ID_Pemesanan = p.ID_Pemesanan INNER JOIN kamar as k ON d.ID_Kamar = k.ID_Kamar where ID_Pesan_Kamar = ${id}`, function (err, rows) {
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
                message: 'Data Pesan Kamar',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/(:id)', [
    body('ID_Pemesanan').notEmpty(),
    body('ID_Kamar').notEmpty()  
], (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        ID_Pemesanan: req.body.ID_Pemesanan,
        ID_Kamar: req.body.ID_Kamar
    }
    connection.query(`update pesan_kamar set ? where ID_Pesan_Kamar = ${id}`, Data, function (err, rows) {
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
    connection.query(`delete from pesan_kamar where ID_Pesan_Kamar = ${id}`, function (err, rows) {
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