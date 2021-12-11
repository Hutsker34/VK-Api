const axios = require('axios');
const config = require('./config')
const token = config.token
const months = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря'
}

const text = encodeURIComponent(getCurrectTime())
function formatNumber(number){
    if (number<10) {
        return `0${number}`
    } else {
        return number
    }
}
function getCurrectTime(){
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `сейчас ${formatNumber(day)} ${months[month]} около ${formatNumber(hour)}:${formatNumber(minute)}`
}

function changeStatus(){
    axios.get(`https://api.vk.com/method/status.set?text=${text}&access_token=${token}&v=5.131`)
    .then(function (loc){
        console.log(loc.data)
    })
}

module.exports={changeStatus}