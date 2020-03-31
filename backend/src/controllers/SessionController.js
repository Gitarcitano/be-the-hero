const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = {
  async create(request, response){
    const { id, password } = request.body;

    function generateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
      });
    }
   
    const ong = await connection('ongs')    
      .where('id', id)
      .select('name')
      .first();

    const user = await connection('ongs')    
      .where('id', id)
      .select('password')
      .first();

    if (!ong) {
      return response.status(400).json({ error: 'Invalid ONG Id or password'});
    }

    if (!await bcrypt.compare(password, user.password))
    return response.status(400).json({ error: 'Invalid ONG Id or password'});

    //return response.json(ong);
    return response.send({
      ong,
      token: generateToken({ id: user.id}),
    });
  }
}