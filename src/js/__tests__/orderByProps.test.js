import { orderByProps } from '../orderByProps';

test('сортирует по заданному порядку, остальное по алфавиту', () => {
  const obj = {
    name: 'мечник',
    health: 10,
    level: 2,
    attack: 80,
    defence: 40,
  };

  const order = ['name', 'level'];

  const expected = [
    { key: 'name', value: 'мечник' },
    { key: 'level', value: 2 },
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
  ];

  expect(orderByProps(obj, order)).toEqual(expected);
});

test('если order пустой — сортирует все ключи по алфавиту', () => {
  const obj = { c: 3, a: 1, b: 2 };
  const expected = [
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
    { key: 'c', value: 3 },
  ];

  expect(orderByProps(obj, [])).toEqual(expected);
});

test('если в order есть ключи, которых нет в объекте — они игнорируются', () => {
  const obj = { a: 1, b: 2 };
  const order = ['c', 'a', 'd'];

  const expected = [
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
  ];

  expect(orderByProps(obj, order)).toEqual(expected);
});

test('не мутирует исходный объект', () => {
  const obj = { x: 1, y: 2 };
  const original = JSON.parse(JSON.stringify(obj));

  orderByProps(obj, ['y']);

  expect(obj).toEqual(original);
});

test('выбрасывает TypeError, если первый аргумент не объект', () => {
  expect(() => orderByProps(null)).toThrow(TypeError);
  expect(() => orderByProps(123)).toThrow(TypeError);
  expect(() => orderByProps([])).toThrow(TypeError); // массив — тоже не подходит
});

test('выбрасывает TypeError, если второй аргумент не массив', () => {
  const obj = { a: 1 };
  expect(() => orderByProps(obj, 'not array')).toThrow(TypeError);
  expect(() => orderByProps(obj, 123)).toThrow(TypeError);
});

test('корректно обрабатывает объект с унаследованными свойствами (for...in + hasOwnProperty)', () => {
  function Base() {}
  Base.prototype.inherited = 'from proto';

  const obj = new Base();
  obj.own = 'own value';

  const result = orderByProps(obj, []);

  // В результате должен быть только собственный ключ 'own'
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({ key: 'own', value: 'own value' });
});
