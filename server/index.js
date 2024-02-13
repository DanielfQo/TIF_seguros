const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");

app.use(cors());

app.use(express.json());

let usuarioTemp = "";

const db = mysql.createConnection({ 
    host: "localhost", 
    user: "root",
    password: "password", 
    database: "venta_seguros"
});

app.post("/signup", (req, res) => {
    const usuario = req.body.usuario;
    const pasword = req.body.password;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apelli_pat = req.body.apelli_pat;
    const apelli_mat = req.body.apelli_mat;
    const fecha_nac = req.body.fecha_nac;
    const genero = req.body.genero;
    const nacionalidad = req.body.nacionalidad;
    const email = req.body.email;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    usuarioTemp = usuario;

    db.query('CALL AgregarCliente(?,?,?,?,?,?,?,?,?,?,?,?) ',
        [usuario, pasword, nombre, apelli_pat, apelli_mat, dni, telefono, fecha_nac, nacionalidad, genero, direccion, email], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al procesar la solicitud");
            } else {
                const mensaje = data[0][0].Resultado;
                return res.json(mensaje);
            }
        }
    );
});

app.post("/login", (req, res) => {
    const usuario = req.body.usuario;
    const password = req.body.password;
   
    usuarioTemp = usuario;

    db.query('CALL verificarLogin(?,?);', [usuario, password], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al procesar la solicitud");
        } else {
            if (data.length > 0) {
                return res.json("Iniciaste sesión con éxito!");
            } else {
                return res.json("Usuario o contraseña incorrectos");
            }
        }
    });
});

app.get("/servicio", (req, res) => {

    db.query("SELECT * FROM seguro_poliza;", (err,result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error interno del servidor");
        }
        else{
            res.send(result);
        }
    });
});

app.get("/obtenerdni", (req, res) => {

    db.query('SELECT DNI FROM usuario WHERE Usuario_ID = ?;', [usuarioTemp], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send("Error al obtener el DNI del usuario");
        } else {
            res.json(results);
        }
    });
});


app.get("/datosUsuario", (req, res) => {

    db.query("CALL MostrarCliente(?);",[usuarioTemp] ,(err,result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error interno del servidor");
        }
        else{
            res.send(result);
        }
    });

});

app.get("/reclamos", (req, res) => {

    db.query("CALL Reclamos_por_usuario(?);",[usuarioTemp] ,(err,result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error interno del servidor");
        }
        else{
            res.send(result);
        }
    });

});

app.get("/contratos", (req, res) => {

    db.query("CALL Contrato_por_usuario(?);",[usuarioTemp] ,(err,result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error interno del servidor");
        }
        else{
            res.send(result);
        }
    });

});

app.get("/accidentes", (req, res) => {

    db.query("CALL Accidentes_por_usuario(?);",[usuarioTemp] ,(err,result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error interno del servidor");
        }
        else{
            res.send(result);
        }
    });

});

app.post("/comprar", (req, res) => {
    const { DNI_vendedor, DNI_cliente, Categoria, Monto, Inicio, Termino } = req.body;
 
    db.query('CALL ContratoExitoso(?,?,?,?,?,?);', [DNI_vendedor, DNI_cliente, Categoria, Monto, Inicio, Termino], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al procesar la solicitud");
        } else {
            return res.json("Contrato creado exitosamente");
        }
    });
});

app.post("/actualizarPerfil", (req, res) => {
    const usuario = req.body.usuario;
    const pasword = req.body.password;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apelli_pat = req.body.apelli_pat;
    const apelli_mat = req.body.apelli_mat;
    const fecha_nac = req.body.fecha_nac;
    const genero = req.body.genero;
    const nacionalidad = req.body.nacionalidad;
    const email = req.body.email;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    

    db.query('CALL ActualizarCliente(?,?,?,?,?,?,?,?,?,?,?,?) ',
        [dni, usuario, pasword, nombre, apelli_pat, apelli_mat, telefono, fecha_nac, nacionalidad, genero, direccion, email], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al procesar la solicitud");
            } else {
                const mensaje = data[0][0].Resultado;
                usuarioTemp = usuario;
                return res.json(mensaje);
            }
        }
    );
});


app.listen(3008,()=>{
    console.log("Corriendo en el puerto 3008")
});

