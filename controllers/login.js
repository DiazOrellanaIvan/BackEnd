const bcrypt = require("bcrypt");
const usuario = require("../model/usuario");
const Usuario = require("../model/usuario");

const login = async (req, res) => {
    const {correo, contraseña} = req.body;

    Usuario.findOne({correo}).then((usuario) => {
        if(!usuario) {
            return res.json({mensaje: "Usuario no encontrado"});
        }

        bcrypt.compare(contraseña, usuario.contraseña).then((esCorrecto) => {
            if(esCorrecto) {
                const {id, nombre} = usuario

                return res.json({ 
                    mensaje: "Usuario logueado correctamente",
                    usuario: {
                        id,
                        nombre,
                    },
                });
            } else {
                return res.json({mensaje: "Contraseña incorrecta"});
            }
        });
    });
};

module.exports = login;