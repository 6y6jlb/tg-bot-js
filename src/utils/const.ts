
export const INDEX = '/index.html';

export const COMMANDS = {
  START: "/start",
  INFO: "/info",
  RESTART: "/restart",
};

export const DESCRIPTIONS = {
  [COMMANDS.START]: "hello",
  [COMMANDS.INFO]: "info",
  [COMMANDS.RESTART]: "restart",
};

export const PAGES = {
  INDEX: 'https://monumental-travesseiro-6c016f.netlify.app/#/',
  WEATHER: 'https://monumental-travesseiro-6c016f.netlify.app/#/weather',
  EVENT_REMINDER: 'https://monumental-travesseiro-6c016f.netlify.app/#/event-reminder',
  EVENT_WEATHER: 'https://monumental-travesseiro-6c016f.netlify.app/#/event-weather',
  PROFILE: 'https://monumental-travesseiro-6c016f.netlify.app/#/profile',
};

export const STICKERS = {
  GREETING: "https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp"
};

export const SERVICE_ROUTES = {
  OPEN_WEATHER : {
    BASE: 'https://api.openweathermap.org/data/2.5/',
    ENTPOINTS: {
      WEATHER:'weather'
    }
  }
}


