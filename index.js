const express = require('express')
const app = express()
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());


app.get('/', (req, res) => {
    res.send("Halo Shera!")
});

const pelangganRouter = require('./routes/pelanggan');
app.use('/api/pelanggan', pelangganRouter);

const reviewRouter = require('./routes/review');
app.use('/api/review', reviewRouter);

const kamarRouter = require('./routes/kamar');
app.use('/api/kamar', kamarRouter);

const pemesananRouter = require('./routes/pemesanan');
app.use('/api/pemesanan', pemesananRouter);

const resortRouter = require('./routes/resort');
app.use('/api/resort', resortRouter);

const staffRouter = require('./routes/staff');
app.use('/api/staff', staffRouter);

const promosiRouter = require('./routes/promosi');
app.use('/api/promosi', promosiRouter);

const fasilitasRouter = require('./routes/fasilitas');
app.use('/api/fasilitas', fasilitasRouter);

const pesan_kamarRouter = require('./routes/pesan_kamar');
app.use('/api/pesan_kamar',pesan_kamarRouter);

const pembayaranRouter = require('./routes/pembayaran');
app.use('/api/pembayaran',pembayaranRouter);

app.listen(port, () => {
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})
