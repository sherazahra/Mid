const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');

const connection = require('../config/db.js');

router.get('/', function (req, res){
    connection.query('SELECT r.Nama_resort, s.Nama_Staf, l.Nama_Pelanggan, d.ID_Kamar, f.Nama_Fasilitas, p.Nama_Promosi FROM pembayaran AS z INNER JOIN resort AS r ON z.ID_Resort = r.ID_Resort INNER JOIN staff AS s ON z.ID_Staf = s.ID_Staf INNER JOIN pelanggan AS l ON z.ID_Pelanggan = l.ID_Pelanggan INNER JOIN pesan_kamar AS d ON z.ID_Pesan_Kamar = d.ID_Pesan_Kamar INNER JOIN fasilitas AS f ON z.ID_Fasilitas = f.ID_Fasilitas INNER JOIN promosi AS p ON z.ID_Promosi = p.ID_Promosi',
     function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Pembayaran',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('ID_Resort').notEmpty(),
    body('ID_Staf').notEmpty(),
    body('ID_Pelanggan').notEmpty(),
    body('ID_Pesan_Kamar').notEmpty(),
    body('ID_Fasilitas').notEmpty(),
    body('ID_Promosi').notEmpty(),
    body('Metode_Pembayaran').notEmpty(),
    body('Total_Pembayaran').notEmpty(),
    body('Tanggal_Pembayaran').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        ID_Resort: req.body.ID_Resort,
        ID_Staf: req.body.ID_Staf,
        ID_Pelanggan: req.body.ID_Pelanggan,
        ID_Pesan_Kamar: req.body.ID_Pesan_Kamar,
        ID_Fasilitas: req.body.ID_Fasilitas,
        ID_Promosi: req.body.ID_Promosi,
        Metode_Pembayaran: req.body.Metode_Pembayaran,
        Total_Pembayaran: req.body.Total_Pembayaran,
        Tanggal_Pembayaran: req.body.Tanggal_Pembayaran
    }
    connection.query('insert into pembayaran set ?', Data, function(err, rows){
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
    connection.query(`SELECT r.Nama_resort, s.Nama_Staf, l.Nama_Pelanggan, d.ID_Kamar, f.Nama_Fasilitas, p.Nama_Promosi, Metode_Pembayaran, Total_Pembayaran, Tanggal_Pembayaran FROM pembayaran AS z INNER JOIN resort AS r ON z.ID_Resort = r.ID_Resort INNER JOIN staff AS s ON z.ID_Staf = s.ID_Staf INNER JOIN pelanggan AS l ON z.ID_Pelanggan = l.ID_Pelanggan INNER JOIN pesan_kamar AS d ON z.ID_Pesan_Kamar = d.ID_Pesan_Kamar INNER JOIN fasilitas AS f ON z.ID_Fasilitas = f.ID_Fasilitas INNER JOIN promosi AS p ON z.ID_Promosi = p.ID_Promosi where ID_Pembayaran = ${id}`, function (err, rows) {
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
                message: 'Data Pembayaran',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/(:id)', [
    body('ID_Resort').notEmpty(),
    body('ID_Staf').notEmpty(),
    body('ID_Pelanggan').notEmpty(),
    body('ID_Pesan_Kamar').notEmpty(),
    body('ID_Fasilitas').notEmpty(),
    body('ID_Promosi').notEmpty(),
    body('Metode_Pembayaran').notEmpty(),
    body('Total_Pembayaran').notEmpty(),
    body('Tanggal_Pembayaran').notEmpty() 
], (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        ID_Resort: req.body.ID_Resort,
        ID_Staf: req.body.ID_Staf,
        ID_Pelanggan: req.body.ID_Pelanggan,
        ID_Pesan_Kamar: req.body.ID_Pesan_Kamar,
        ID_Fasilitas: req.body.ID_Fasilitas,
        ID_Promosi: req.body.ID_Promosi,
        Metode_Pembayaran: req.body.Metode_Pembayaran,
        Total_Pembayaran: req.body.Total_Pembayaran,
        Tanggal_Pembayaran: req.body.Tanggal_Pembayaran
    }
    connection.query(`update pembayaran set ? where ID_Pembayaran = ${id}`, Data, function (err, rows) {
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