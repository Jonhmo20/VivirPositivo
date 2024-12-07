// hashPassword.js

const bcrypt = require('bcrypt');

async function hashPassword() {
    // Cambia esta contraseña por la que deseas almacenar
    const password = 'admin123';

    // Genera un hash usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // El "10" es el factor de costo (cuánto tiempo toma encriptar)

    console.log('Contraseña hasheada:', hashedPassword);
}

hashPassword();
