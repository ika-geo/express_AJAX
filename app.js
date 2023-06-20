const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json());

//get webpage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

//get users
app.post('/getUsers',function (req, res) {
    let data = fs.readFileSync(__dirname + '/users.txt')
    if (!JSON.parse(data.toString()).length){
        return res.sendStatus(404)
    }
    res.send(data.toString())
})

//delete user
app.delete('/deleteUser/:id', function (req, res) {
    let data = fs.readFileSync(__dirname + '/users.txt')
    data = JSON.parse(data.toString())
    data = data.filter(item => item.id.toString() !== req.params.id.toString())
    fs.writeFileSync(__dirname + '/users.txt', JSON.stringify(data))
    res.send(JSON.stringify(data))
});

//create user
app.put("/createUSer", function (req, res) {
    let newUser = req.body
    newUser.id=(new Date()).getTime()
    let data = fs.readFileSync(__dirname + '/users.txt')
    data = JSON.parse(data.toString())
    data.push(newUser)
    fs.writeFileSync(__dirname + '/users.txt', JSON.stringify(data))
    res.send(JSON.stringify(data))
})


app.listen(3000)