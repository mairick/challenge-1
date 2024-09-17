import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capteur'
})



// Create a stations
app.post('/stations', async function (req, res) {
    const requestData = req.body;

    const stations = requestData;

    await connection.query(
        //'INSERT INTO stations (name, longitude, latitude,create_date) VALUES (' + requestData.name + ')'
        `INSERT INTO stations (name, longitude, latitude,create_date) VALUES (?, ?, ?, ?, ?)`,
        [requestData.name, requestData.longitude, requestData.latitude, requestData.create_date]
    )

    res.json({
        stations: stations
    });
});

// Read all stations
app.get('/stations', async function (req, res) {
    const [results] = await connection.query(
        'SELECT * FROM stations'
    )

    res.json({
        stations: results,
        total: results.length
    })
});

// Read one stations
app.get('/stations/:id', async function (req, res) {
    const [result] = await connection.query(
        'SELECT * FROM stations WHERE id = ?',
        [req.params.id]
    )

    res.json({
       stations: result
    });
});

// Update a stations
app.put('/stations/:id', async function (req, res) {
    const requestData = req.body;

    const stations = requestData;

    await connection.query(
        'UPDATE stations SET name = ?, longitude = ?, latitude = ?, create_date = ? WHERE id = ?',
        [requestData.name, requestData.longitude, requestData.latitude, requestData.create_date, req.params.id]
    )

    res.json({
        stations: stations
    })
});

// Delete a stations
app.delete('/stations/:id', async function (req, res) {
    await connection.query(
        'DELETE FROM stations WHERE id = ?',
        [req.params.id]
    )

    res.json({
        deleted: true
    })
});

// END Collection stations

app.get('/mesures', async function (req, res) {
    const [result] = await connection.query('SELECT * FROM mesures');

    res.json({
        classes: result,
        total: result.length
    })
})

app.listen(3000, () => {
    console.log('API is ready !');
});