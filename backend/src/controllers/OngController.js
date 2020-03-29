const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = {
  async index(request, response){    
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body;
    let { password } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    password = await bcrypt.hash(password, 10);

    await connection('ongs').insert({
      id,
      name,
      email,
      password,
      whatsapp,
      city,
      uf
    })
  
    return response.json({ id });
  }
}