const TelegramApi = require('node-telegram-bot-api');
const {gameWithNumbersOptions,mainMenuOptions} = require('./utils/const');


const token = process.env.TOKEN || '===';

const bot = new TelegramApi(token, {polling: true});

const chats = {}

const newRandomNumberForGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты должен его угадать`);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Я загадал число от 0 до 9`, gameWithNumbersOptions);
}

const newGameWithNumbersOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'играть еще раз', callback_data: '/new_game_with_numbers'},mainMenuOptions],
        ]
    })
}



bot.setMyCommands([
    {command: '/start', description: 'приветствие'},
    {command: '/info', description: 'получение информации'},
    {command: '/play_with_an_elephant', description: 'поиграем  в слона'},
    {command: '/play_with_numbers', description: 'поиграем  в числа'},
])

function startBot() {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const lastName = msg.from.last_name;
        const firstName = msg.from.first_name;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp')
            return bot.sendMessage(chatId, `Добро пожаловать ${firstName}!`,mainMenuOptions)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${firstName && firstName} ${lastName && lastName}`)
        }
        if (text === '/play_with_an_elephant') {
            return bot.sendMessage(chatId, `${firstName}, купи слона!`)
        }
        if (text === '/play_with_numbers') {
            return newRandomNumberForGame(chatId)
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю.. давай попробуем еще раз`)
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const lastName = msg.from.last_name;
        const firstName = msg.from.first_name;

        if (data === '/new_game_with_numbers') {
            return newRandomNumberForGame(chatId)
        }
        if (data == chats[chatId]) {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/96/6.webp')
            return bot.sendMessage(chatId, `Поздравляю ${firstName || lastName}, ты угадал!`, newGameWithNumbersOptions)

        } else {
            return bot.sendMessage(chatId, `Ты выбрал не правильное число, я загадал число ${chats[chatId]}`, newGameWithNumbersOptions)
        }


    })

}

startBot();


