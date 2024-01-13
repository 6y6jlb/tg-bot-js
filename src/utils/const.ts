
export const INDEX = '/index.html';

export const DEFAULT_PASSWORD = '123456';


export const COMMANDS = {
  START: "/start",
  WEB_APP: "/web_app",
  SETTINGS: "/user_settings",
  INFO: "/info",
  RESTART: "/restart",
  WEATHER: "/weather",
  EXCHANGE: "/exchange",
  CURRENCIES: "/currencies",
  RANOM_IMAGE: "/random_image",
  TASKS: "/tasks",
  TASKS_STORE: "/t_store",
  TASKS_DELETE: "/t_delete",
  TASKS_UPDATE: "/t_update",
  TASKS_MAKE_REGULAR: "/t_mk_regular",
  TASKS_SELECT_OPTIONS: "/t_opt_sel",
  TASKS_SET_OPTIONS: "/t_opt_set",
  TASKS_REMOVE_OPTIONS: "/t_rm_opt",
  TASKS_REMOVE_OPTIONS_SELECT: "/t_rm_opt_sel",

};

export const CALLBACK_COMMAND = {
  LANGUAGE_CHOICE: "language_choice",
};

export const PAGES = {
  INDEX: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/',
  EVENT_REMINDER: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/event-reminder',
  EVENT_WEATHER: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/event-weather',
  PROFILE: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/profile',
};

export const STICKERS = {
  GREETING: "https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp"
};

export const SERVICE_ROUTES = {
  RANDOM_DOG: {
    BASE: 'https://random.dog/',
    IMAGE: 'woof.json'
  },
  OPEN_WEATHER: {
    BASE: 'https://api.openweathermap.org/data/2.5/',
    ENTPOINTS: {
      WEATHER: 'weather'
    }
  },
  RANDOM_FOX: {
    BASE: 'https://randomfox.ca/',
    IMAGE: 'floof'
  },
  RANDOM_CAT: {
    BASE: 'https://api.thecatapi.com/v1/',
    IMAGE: 'images/search'
  },
  OPEN_XHANGE_RATE: {
    BASE: 'https://openexchangerates.org/api/',
    LATEST: 'latest.json',
    CURENCIES: 'currencies.json',

  }
}



