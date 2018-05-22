const EventEmitter = require('events');
const message = require('./messages');

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
    this.removeListener('message', message.prepareToAnswer);
    this.removeListener('message', message.chatOnMessage);
    this.emit('close');
  }
}

module.exports = ChatApp;