
const EventEmitter = require('events');

class ChatApp extends EventEmitter {

  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pon-g`);
    }, 1000);
  }

  // Задание №2.1. Добавляем метод close()
  close() {
    this.removeListener('message', prepareToAnswer);
    this.removeListener('message', chatOnMessage);
    this.emit('close');
  }
}

let webinarChat = new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat = new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

// Задание №1.1. Создаем функцию обработчика
let prepareToAnswer = () => {
  console.log('Готовлюсь к ответу');
};

// Задание №2.2. Создаем функцию обработчика
let sayGoodbye = () => {
  console.log('Чат вконтакте закрылся :(');
};


webinarChat.on('message', prepareToAnswer); // Задание №1.1. Добавляем обработчик события
webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);

vkChat.setMaxListeners(2); // Задание №1.2. Устанавливаем максимальное количетсво обработчиков событий на 2
vkChat.on('message', prepareToAnswer); // Задание №1.3. Добавляем обработчик события
vkChat.on('message', chatOnMessage);
vkChat.on('close', sayGoodbye); // Задание №2.2. Добавляем обработчик события
vkChat.close(); // Задание №2.2. Вызываем созданный метод


// Закрыть вконтакте
setTimeout(() => {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
}, 10000);


// Закрыть фейсбук
setTimeout(() => {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000);