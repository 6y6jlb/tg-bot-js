
const token = process.env.TOKEN || '===';

const COMMANDS = {
    START: '/start',
    INFO: '/info',
    NEW_GAME_WITH_NUMBERS: '/new_game_with_numbers',
    PLAY_WITH_NUMBERS: '/play_with_numbers',
    PLAY_WITH_ELEPHANTS: '/play_with_an_elephant',
    RESTART: '/restart',
};
const DESCRIPTIONS = {
    [COMMANDS.START]: 'приветствие',
    [COMMANDS.INFO]: 'получение информации',
    [COMMANDS.PLAY_WITH_ELEPHANTS]: 'поиграем  в слона',
    [COMMANDS.PLAY_WITH_NUMBERS]: 'поиграем  в числа',
};

exports.gameWithNumbersOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'},],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'},],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'},],
            [{text: '0', callback_data: '0'},],
        ]
    })
};

exports.mainMenuOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'получение информации', callback_data: COMMANDS.INFO},
                {text: 'поиграем в слона?', callback_data: COMMANDS.PLAY_WITH_ELEPHANTS},
                {text: 'поиграем  в числа?', callback_data: COMMANDS.PLAY_WITH_NUMBERS},],
        ]
    })
};
exports.restartGameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [[{
                text: 'выйти из игры',
                callback_data: COMMANDS.RESTART
            }]]
    })
};


exports.newGameWithNumbersOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'играть еще раз', callback_data: COMMANDS.NEW_GAME_WITH_NUMBERS},
                {text: 'выйти из игры', callback_data: COMMANDS.RESTART}],
        ]
    })
};

exports.COMMANDS = COMMANDS;
exports.DESCRIPTIONS = DESCRIPTIONS;
exports.token = token;
