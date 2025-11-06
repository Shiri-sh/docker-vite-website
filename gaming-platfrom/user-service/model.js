const con = require('./db.js');


const GetUserByUsername = async (username) => {
    try {
        const sql = 'SELECT * FROM Users WHERE Username = ?';
        const [rows] = await con.query(sql, [username]);
        return {
            id: rows[0].UserId,
            username: rows[0].Username,
            password: rows[0].PasswordHash,
            role: rows[0].Role
        };
    } catch (err) {
        throw err;
    }
}

const GetUserByPassword = async (password) => {
    try {
        const sql = 'SELECT * FROM Users WHERE PasswordHash = ?';
        const [rows] = await con.query(sql, [password]);
        return rows[0];
    } catch (err) {
        throw err;
    }
}

const CreateUser = async (username, password, role) => {
    try {
        const sql = 'INSERT INTO Users (Username, PasswordHash, Role) VALUES (?, ?, ?)';
        const [result] = await con.query(sql, [username, password, role]);
        return {
            id: result.insertId,
            username: username,
            role: role
        };
    } catch (err) {
        throw err;
    }
}
const GetUsers = async () => {
    try {
        const sql = 'SELECT * FROM Users';
        const [rows] = await con.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    GetUserByUsername,
    CreateUser,
    GetUserByPassword,
    GetUsers
};