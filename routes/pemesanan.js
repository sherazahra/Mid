const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');

const connection = require('../config/db.js');

router.get('/', function (req, res){
    connection.query('select * from pemesanan order by ID_Pemesanan desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data pemesanan',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('Tanggal_Pemesanan').notEmpty(),
    body('Tanggal_Checkin').notEmpty(),
    body('Tanggal_Checkout').notEmpty(),
    body('Jumlah_Tamu').notEmpty()
  

],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        Tanggal_Pemesanan: req.body.Tanggal_Pemesanan,
        Tanggal_Checkin: req.body.Tanggal_Checkin,
        Tanggal_Checkout: req.body.Tanggal_Checkout,
        Jumlah_Tamu: req.body.Jumlah_Tamu
    }
    connection.query('insert into pemesanan set ?', Data, function(err, rows){
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
    connection.query(`select * from pemesanan where ID_Pemesanan = ${id}`, function (err, rows) {
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
                message: 'Data pemesanan',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/(:id)', [
    body('Tanggal_Pemesanan').notEmpty(),
    body('Tanggal_Checkin').notEmpty(),
    body('Tanggal_Checkout').notEmpty(),
    body('Jumlah_Tamu').notEmpty()
], (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        Tanggal_Pemesanan: req.body.Tanggal_Pemesanan,
        Tanggal_Checkin: req.body.Tanggal_Checkin,
        Tanggal_Checkout: req.body.Tanggal_Checkout,
        Jumlah_Tamu: req.body.Jumlah_Tamu
    }
    connection.query(`update pemesanan set ? where ID_Pemesanan = ${id}`, Data, function (err, rows) {
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
    connection.query(`delete from pemesanan where ID_Pemesanan = ${id}`, function (err, rows) {
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