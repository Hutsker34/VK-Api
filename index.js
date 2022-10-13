const axios = require('axios');
const {convertToCelsius} = require('./helper')
const { weatherKey, token } = require('./config');
const city = 'Saint Petersburg, RU'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`


// setInterval(getCurrectTime, 1000*60)
// let hours = ''


// const emoji = {
//     Thunderstorm: '🌩',
//     Drizzle: '🌦',
//     Rain:'🌧',
//     Snow: '🌨',
//     Clear: hours > 18 || hours < 5 ? '🌜' : '☀️',
//     Clouds: hours > 18 || hours < 5 ? '🌜' : '☁️',
//     unknown: '🤷‍♂️'
// }


// setInterval(getCurrectTime, 1000*55)
// function getCurrectTime(){
//     hours = new Date().getHours()
// }









// function convertToEmoji(key){
//     if (key in emoji) {
//         return emoji[key]
//     } else {
//         return emoji['unknown']
//     }
// }

async function getWeatherData(){
    const {data} = await axios.get(url)
    //const weatherMain = data.weather[0].main
    const mainTemp = data.main.temp
    const windSpeed = data.wind.speed
    const temp = convertToCelsius(mainTemp)
    
    return {
            //weather: weatherMain,
            temp: temp,
            wind: windSpeed
    }
    
}

async function getWeatherText(){
    const { temp, wind} = await getWeatherData()

    return `сейчас на улице  температура ${temp.toFixed()} градусов, ветер ${wind} м/c `
}

async function getWeatherPhoto(){
    const {temp} = await getWeatherData()
    if (temp > 10) {
        return 'https://izvestiaur.ru/upload/iblock/2fe/yn.jpg'
    } else {
        return 'https://storage.myseldon.com/news_pict_06/06A4F93AFBA9C4B3E1BCEEC827D59B9B'
    }
}

async function changeStatus(){
    const text = encodeURIComponent( await getWeatherText())
    axios.get(`https://api.vk.com/method/status.set?text=${text}&access_token=${token}&v=5.131`)
    .then(function (loc){
        console.log(loc.data)
    })
}

const morseSymbol = {
    'a':     '.-',
    'b':   '-...',
    'c':   '-.-.',
    'd':    '-..',
    'e':      '.',
    'f':   '..-.',
    'g':    '--.',
    'h':   '....',
    'i':     '..',
    'j':   '.---',
    'k':    '-.-',
    'l':   '.-..',
    'm':     '--',
    'n':     '-.',
    'o':     '—-',
    'p':   '.--.',
    'q':   '--.-',
    'r':    '.-.',
    's':    '...',
    't':      '-',
    'u':    '..-',
    'v':   '...-',
    'w':    '.--',
    'x':   '-..-',
    'y':   '-.--',
    'z':   '--..',
    '1':  '.----',
    '2':  '..---',
    '3':  '...--',
    '4':  '....-',
    '5':  '.....',
    '6':  '-....',
    '7':  '--...',
    '8':  '---..',
    '9':  '----.',
    '0':  '-----',
}
function convertToMorse(text){
  let mus = text.split('')
  for (let i = 0; i < mus.length; i++) {
    mus[i] = morseSymbol[mus[i]];
}
  return mus.join(' ')
}

const letterSymbol= {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--. ':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '—-':     'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
}
function convertMorseToText(text){
  let mus = text.split(' ')
  console.log(mus)
  for (let i = 0; i < mus.length; i++) {
    mus[i] = letterSymbol[mus[i]];
}
  return mus.join('')
}





module.exports={changeStatus, getWeatherPhoto, getWeatherText, convertMorseToText, convertToMorse}


