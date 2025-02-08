const express = require('express');
const multer = require('multer');
const path = require('path');

// Inisialisasi Express
const app = express();
const port = 3000;

// Tentukan tempat penyimpanan file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Simpan file di direktori 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan nama unik
    }
});

const upload = multer({ storage: storage });

// Endpoint untuk menerima upload foto
app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.json({
            status: 'success',
            message: 'File uploaded successfully!',
            file: req.file
        });
    } else {
        res.status(400).json({
            status: 'error',
            message: 'No file uploaded'
        });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
