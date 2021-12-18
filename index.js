const axios = require('axios');
const config = require('./config')
const token = config.token



async function friendsOnline(){
   const result = await axios.get(`https://api.vk.com/method/friends.getOnline?user_id=430099232&online_mobile=0&access_token=${token}&v=5.131`)
    .then(function (loc){ 
        return loc.data.response
    })
    return `сейчас ${result.length} моих друзей онлайн`
}



async function changeStatus(){
    const text = encodeURIComponent( await friendsOnline())
    axios.get(`https://api.vk.com/method/status.set?text=${text}&access_token=${token}&v=5.131`)
    .then(function (loc){
        console.log(loc.data)
    })
}
friendsOnline().then(function (loc){
    console.log(` ${loc} `)
})
module.exports={changeStatus}







