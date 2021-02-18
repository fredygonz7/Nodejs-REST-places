/**
 * se recibe un array de los parametros validos
 * se recibe un objeto, el cuerpo de la solicitud
 * se retorna un objeto con los datos que se guardaran o actualizaran
 * @param {array} validParams 
 * @param {object} body 
 */
function buildParams(validParams, body) {
    let params = {};
    validParams.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(body, attr))
            params[attr] = body[attr];
    });
    return params;
}
module.exports = { buildParams };