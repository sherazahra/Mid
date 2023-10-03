const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');

const connection = require('../config/db.js');

router.get('/', function (req, res){
    connection.query('select * from staff order by ID_Staf desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data staff',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('Nama_Staf').notEmpty(),
    body('Jabatan').notEmpty(),
    body('Email').notEmpty()

],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        Nama_Staf: req.body.Nama_Staf,
        Jabatan: req.body.Jabatan,
        Email: req.body.Email

    }
    connection.query('insert into staff set ?', Data, function(err, rows){
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
    connection.query(`select * from staff where ID_Staf = ${id}`, function (err, rows) {
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
                message: 'Data staff',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/(:id)', [
    body('Nama_Staf').notEmpty(),
    body('Jabatan').notEmpty(),
    body('Email').notEmpty()
], (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        Nama_Staf: req.body.Nama_Staf,
        Jabatan: req.body.Jabatan,
        Email: req.body.Email
    }
    connection.query(`update staff set ? where ID_Staf = ${id}`, Data, function (err, rows) {
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
    connection.query(`delete from staff where ID_Staf = ${id}`, function (err, rows) {
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