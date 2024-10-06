const fs = require('node:fs')
const path = require('node:path')
const users = new Map()
let increment = 0

const UserModel = {
    create(user){
        users.set(increment++,user)
    },
    get(id){
        return users.get(id)
    },
    findUser(email){
        for(const user of users.values()){
            if(user.email === email) return user
        }
        return null
    }
}

module.exports = UserModel