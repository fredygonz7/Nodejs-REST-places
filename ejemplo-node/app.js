// require busca una libreria 
const express = require('express');
// bodyParser para leer json
const bodyParser = require('body-parser');
// retorna un objeto
const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

const places = [
    {
        'title': 'Oficina CódigoFacilito',
        'description': 'Lorem Ipsum Description',
        'address': 'Lorem Ipsum Address'
    },
    {
        'title': 'Abastos el Ajonjolí',
        'description': 'Lorem Ipsum Description',
        'address': 'Lorem Ipsum Address'
    },
    {
        'title': 'Oficina',
        'description': 'Lorem Ipsum Description',
        'address': 'Lorem Ipsum Address'
    },
    {
        'title': 'Oficina',
        'description': 'Lorem Ipsum Description',
        'address': 'Lorem Ipsum Address'
    }
];

app.get('/', (req, res) => {
    // res.send('hola mundo');
    // res.json({ 'nombre': 'Fredy' }); // enviar JSON
    res.json(places);
});

app.post('/', (req, res) => {
    res.json(req.body.title);
    // res.json(req.body);
});

/**
 * en una carpeta llamada public o static van todos los archivos estativos
 * como pdf, imagenes, documentos,...
 */
app.use(express.static('public'));

// puertos que se pueden usar 1024 hasta 65535
// los mas comunes en desarrolo web 3000 8000 8080
app.listen(3000, function () {
    console.log('Servidor listo');
});

// para ejecutar en la consola "node app.js"
// cuando se hace un cambio al servidor debe reiniciarse ctrl + C

