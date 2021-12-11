const axios = require('axios');
const config = require('./config')
const token = config.token
const text = encodeURIComponent(getCurrectTime())

function getCurrectTime(){
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `сейчас ${day}.${month+1} около ${hour}:${minute}`
}

function changeStatus(){
    axios.get(`https://api.vk.com/method/status.set?text=${text}&access_token=${token}&v=5.131`)
    .then(function (loc){
        console.log(loc.data)
    })
}

module.exports={changeStatus}