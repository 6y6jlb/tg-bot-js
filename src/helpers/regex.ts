export const taskCreation = /(\d{0,24}:\d{0,60})(\s)?(-)([a-zA-zа-яА-Я ,:;!?]{2,1000})(-\s)?(\w{4,10}\/\w{4,10})?/

export const taskTime = /^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const exhangeRequest = /([a-zA-z]{3})\s([a-zA-z]{3})/;