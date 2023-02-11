const bcrypt = require("bcrypt");
const Usuario = require("../model/usuario");


const register = async (req, res) => {
    const {nombre, correo, contraseña} = req.body;

    Usuario.findOne({correo}).then((usuario) => {
        if(usuario) {
            return res.json({mesaje: "Ya existe un usuario con ese correo" });
        } else if (!nombre || !correo || !contraseña) {
            return res.json({mesaje: "Falta el nombre / correo / contraseña"});
        } else {
            bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
                if (error) res.json({error})
                else {
                    const nuevoUsuario = new Usuario({
                        nombre,
                        correo,
                        contraseña: contraseñaHasheada,
                    });

                    nuevoUsuario.save()
                    .then((usuario) => {
                        res.json({mesaje: 'Usuario creado correctamente', usuario});
                    })
                    .catch(error => console.error(error));
                }
            });
        }
    });
};

module.exports = register;