const TelegramApi = require('node-telegram-bot-api');



const token = process.env.TOKEN || '===';

const bot = new TelegramApi(token, {polling: true});

const chats = {}

const newRandomNumberForGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты должен его угадать`);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Отгадывай`, gameWithNumbersOptions);
}

const newGameWithNumbersOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'играть еще раз', callback_data: '/new_game_with_numbers'},],
        ]
    })
}


const gameWithNumbersOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'},],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'},],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '1', callback_data: '9'},],
            [{text: '0', callback_data: '0'},],
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
            return bot.sendMessage(chatId, `Добро пожаловать ${firstName}!`)
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

        if (text === '/') {
            return bot.sendMessage(chatId, `Все говорят ${text}, а ты купи слона!`)
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю.. давай попробуем еще раз`)
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/new_game_with_numbers') {
            return newRandomNumberForGame(chatId)
        }
        if (data == chats[chatId]) {
           return  bot.sendMessage(chatId, `Поздравляю, ты угадал!`,newGameWithNumbersOptions)
        } else {
            return bot.sendMessage(chatId, `Ты выбрал не правильное число, я загадал число ${chats[chatId]}`,newGameWithNumbersOptions)
        }



    })

}

startBot();


