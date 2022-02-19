const config = require('./config');
const {getWeatherText, getWeatherPhoto, convertToMorse, convertMorseToText} = require('./index.js')

const BOT_TOKEN = config.botToken || '';

const token = config.token || '';

const {VK, Attachment, AttachmentType, API, Keyboard} = require('vk-io');

const vk = new VK({
    token: BOT_TOKEN
});





vk.updates.on('message_new', async (context) => {
    switch (context.text) {
        case '/start': {
            await context.send(`что я умею:
            
		/weather - узнать погоду сейчас 
		/morse - морзе код
        /happiness - можешь купить себе друзей`);
            break;
        }
        case '/weather': {
            await Promise.all([
                context.send( await getWeatherText()),
                context.sendPhotos({
                   value: await getWeatherPhoto()
                })
            ]);
            break;
        }
        case '/morse':{
            await Promise.all([
                context.send(
                    `
                    /toMorse - перевод из текста в азбуку морзе
                    /toText - перевод из азбуки морзе в текст
                    `
                )
            ])
        }
        case '/happiness':{
            const result = await new VK({
                token: token
            }).api.market.get({owner_id: -210139614})
            const arr = result.items
            await Promise.all([
                arr.forEach( props => {
                        context.send(`ID товара ${props.id}`, {
                            attachment: new Attachment({
                                type: AttachmentType.MARKET,
                                API,
                                payload: {
                                    id: props.id,
                                    owner_id: props.owner_id,
                                }
                            })
                        })
              })
            ])
            break;
        }

        case '/album':{
            const result = await new VK({
                token: token
            }).api.market.getAlbums({owner_id: -210139614})
            context.send(`ID товара 1`, {
                attachment: new Attachment({
                    type: AttachmentType.MARKET_ALBUM,
                    payload: {
                        id: 1,
                        owner_id: -210139614,
                        title: 'товары для счастья ',
                        count: 1,
                        updated_time: 1642857702,
                        is_main: false,
                        is_hidden: false
                    }
                })
            })
            console.log(result)
        }
        

        default: {
            await vk.api.messages.markAsRead({peer_id: context.peerId});
            break;
        }
    }
    let regexp = /\/toMorse\s*(\w*)/gi
    const result = regexp.exec(context.text)
    if(result){
        await context.send(convertToMorse(result[1]))
    };

    let comand = '/toText'
    let index = context.text.indexOf(comand)
    if(index !== -1){
    await context.send(convertMorseToText(context.text.slice(comand.length).trim()))
    }
    console.log(context.text.indexOf('/toText'))
});

vk.updates.startPolling().catch(console.log);