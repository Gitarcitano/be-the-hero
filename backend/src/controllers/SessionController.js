const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
  async create(request, response){
    const { id, password } = request.body;
   
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

    return response.json(ong);
  }
}