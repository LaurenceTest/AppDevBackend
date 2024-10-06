const fs = require('node:fs')
const path = require('node:path')
const users = []
let increment = 0

const UserModel = {
    create(user){
        users.push({id:increment++,...user})
    },
    findUserByEmail(email){
        for(const user of users){
            if(user.email === email) return user
        }
        return null
    },
    findUserByName(username){
        for(const user of users){
            if(user.username === username) return user
        }
        return null
    }
}

module.exports = UserModel