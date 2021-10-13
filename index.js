const TelegramApi = require('node-telegram-bot-api');
const {
    mainMenuOptions,
    newGameWithNumbersOptions,
    gameWithNumbersOptions,
    COMMANDS,
    DESCRIPTIONS,
    restartGameOptions,
    token
} = require('./utils/const');
const {state, setGameNumber} = require('./state/state')
const express = require('express')

const app = express();
const cors = require('cors')
const port = process.env.PORT || 3010;

app.use(cors())

const bot = new TelegramApi(token, {polling: true});


const macrosListener = async (text, chatId, firstName, lastName) => {
    if (text === COMMANDS.START || text === COMMANDS.RESTART) {
        await setGameNumber(0)
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp')
        return bot.sendMessage(chatId, `Добро пожаловать ${firstName}!`, mainMenuOptions)
    } else if (text === COMMANDS.INFO) {
        return bot.sendMessage(chatId, `Тебя зовут ${firstName && firstName} ${lastName && lastName}`)
    } else if (text === COMMANDS.PLAY_WITH_ELEPHANTS) {
        await setGameNumber(2)
        return bot.sendMessage(chatId, `${firstName}, купи слона!`)
    } else if (text === COMMANDS.PLAY_WITH_NUMBERS || text === COMMANDS.NEW_GAME_WITH_NUMBERS) {
        await setGameNumber(1)
        return newRandomNumberForGame(chatId)
    } else {
        return bot.sendMessage(chatId, `Я тебя не понимаю.. давай попробуем еще раз`)
    }
}

const newRandomNumberForGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты должен его угадать`);
    const randomNumber = Math.floor(Math.random() * 10);
    state.chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Я загадал число от 0 до 9`, gameWithNumbersOptions);
}


bot.setMyCommands([
    {command: COMMANDS.START, description: DESCRIPTIONS[COMMANDS.START]},
    {command: COMMANDS.INFO, description: DESCRIPTIONS[COMMANDS.INFO]},
    {command: COMMANDS.PLAY_WITH_ELEPHANTS, description: DESCRIPTIONS[COMMANDS.PLAY_WITH_ELEPHANTS]},
    {command: COMMANDS.PLAY_WITH_NUMBERS, description: DESCRIPTIONS[COMMANDS.PLAY_WITH_NUMBERS]},
])

function startBot() {
    bot.on('message', async msg => {
            const text = msg.text;
            const chatId = msg.chat.id;
            const lastName = msg.from.last_name;
            const firstName = msg.from.first_name;
            switch (state.game) {
                case 0:
                    return macrosListener(text, chatId, firstName, lastName)
                case 1:
                    if (text === COMMANDS.RESTART || text === COMMANDS.START) {
                        return setGameNumber(0)
                    } else if (text === COMMANDS.PLAY_WITH_NUMBERS || text === COMMANDS.NEW_GAME_WITH_NUMBERS) {
                        return newRandomNumberForGame(chatId)
                    }
                    return
                case 2:
                    if (text === COMMANDS.RESTART || text === COMMANDS.START) {
                        return setGameNumber(0)
                    } else if (text) {
                        return bot.sendMessage(chatId, `Все говорят ${text}, а ты купи слона`, restartGameOptions)
                    }
                    return
                default:
                    return
            }
        }
    )
    ;

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const lastName = msg.from.last_name;
        const firstName = msg.from.first_name;
        switch (state.game) {
            case 0:
                return macrosListener(data, chatId, firstName, lastName)
            case 1:
                if (data === COMMANDS.RESTART) {
                    await setGameNumber(0)
                    return bot.sendMessage(chatId, `Чего изволите?`, mainMenuOptions)
                } else if (data === COMMANDS.PLAY_WITH_NUMBERS || data === COMMANDS.NEW_GAME_WITH_NUMBERS) {
                    return newRandomNumberForGame(chatId)
                } else if (data == state.chats[chatId]) {
                    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/96/6.webp')
                    await setGameNumber(0)
                    return bot.sendMessage(chatId, `Поздравляю ${firstName || lastName}, ты угадал!`, newGameWithNumbersOptions)
                } else if (Object.values(COMMANDS).includes(data)) {
                    return
                } else if (data === COMMANDS.PLAY_WITH_NUMBERS || data === COMMANDS.NEW_GAME_WITH_NUMBERS) {
                    return newRandomNumberForGame(chatId)
                } else {
                    return bot.sendMessage(chatId, `Ты выбрал не правильное число`, newGameWithNumbersOptions)
                }

            case 2:
                if (data === COMMANDS.RESTART) {
                    await setGameNumber(0)
                    return bot.sendMessage(chatId, `Чего изволите?`, mainMenuOptions)
                }
                return
            default:
                return
        }
    })
}

startBot();

app.get('/', (req, res) => {
    res.send('bot here')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});




