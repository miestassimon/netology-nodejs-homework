const ChatApp = require('./chat');
const message = require('./messages');

let webinarChat = new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat = new ChatApp('---------vk');


webinarChat.on('message', message.prepareToAnswer); // Задание №1.1. Добавляем обработчик события
webinarChat.on('message', message.chatOnMessage);
facebookChat.on('message', message.chatOnMessage);

vkChat.setMaxListeners(2); // Задание №1.2. Устанавливаем максимальное количетсво обработчиков событий на 2
vkChat.on('message', message.prepareToAnswer); // Задание №1.3. Добавляем обработчик события
vkChat.on('message', message.chatOnMessage);
vkChat.on('close', message.sayGoodbye); // Задание №2.2. Добавляем обработчик события
vkChat.close(); // Задание №2.2. Вызываем созданный метод


// Закрыть вконтакте
setTimeout(() => {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', message.chatOnMessage);
}, 10000);


// Закрыть фейсбук
setTimeout(() => {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', message.chatOnMessage);
}, 15000);