const state = {
    game: 0,
    chats: {},

};


const setGameNumber = (number) => {
    // 1 = numbers
    // 2 = elephants
    // 0 = default
    state.game = number
}


exports.state = state
exports.setGameNumber = setGameNumber