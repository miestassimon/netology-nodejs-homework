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

module.exports = {
  chatOnMessage,
  prepareToAnswer,
  sayGoodbye
};