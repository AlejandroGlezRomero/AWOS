import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Romero',
        email: 'romero@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('romeroromero', 10)
    },
    {
        name: 'Mariano',
        email: 'mariano@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Haziel',
        email: 'haziel@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Ana',
        email: 'ana@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Marco',
        email: 'marco@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Lalo',
        email: 'lalo@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Daniel',
        email: 'daniel@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Irving',
        email: 'irving@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Alejandra',
        email: 'alejandra@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
    {
        name: 'Cristina',
        email: 'cristina@utxicotepec.edu.mx',
        verified: 1,
        password: bcrypt.hashSync('password123', 10)
    },
];

export default users;
