const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    //nome 
    name: {
        type: String,
        require: true,
    },
    //email
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    //senha
    password: {
        type: String,
        required: true,
        select: false,
    },
    //datar dia e hora que os dados foram armazenados
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
//encriptografando a senha com um hash
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User