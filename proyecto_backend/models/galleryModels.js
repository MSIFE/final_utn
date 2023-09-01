var pool = require('./bd');



async function getGallery() {
    var query = 'select * from programas';
    var rows = await pool.query(query);
    return rows;
}

async function insertGallery(obj) {
    try {
        var query = 'insert into programas set ?';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        throw error;
    }
}
async function deleteGalleryById(id_pro) {
    var query = 'delete from programas where id_pro = ?';
    var rows = await pool.query(query, [id_pro]);
    return rows;
}

async function getGalleryById(id_pro) {
    var query = 'select * from programas where id_pro =?';
    var rows = await pool.query(query, [id_pro]);
    return rows[0];
}

async function modificarGallery(obj, id_pro) {
    try {
        var query = 'update programas set ? where id_pro=?';
        var rows = await pool.query(query, [obj, id_pro]);
        return rows;
    } catch (error) {
        throw error;
    }
}



module.exports = { getGallery, insertGallery, deleteGalleryById, getGalleryById, modificarGallery }