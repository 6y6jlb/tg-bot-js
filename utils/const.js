exports.gameWithNumbersOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'},],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'},],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '1', callback_data: '9'},],
            [{text: '0', callback_data: '0'},],
        ]
    })
}

exports.mainMenuOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'приветствие', callback_data: '/start'},
                {text: 'получение информации', callback_data: '/info'},
                {text: 'получение в слона?', callback_data: '/play_with_an_elephant'},
                {text: 'поиграем  в числа?', callback_data: '/play_with_numbers'},],
        ]
    })
}

