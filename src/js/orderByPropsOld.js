export function orderByProps(obj, order) {
  // Проверка типов
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new TypeError('Первый аргумент должен быть объектом');
  }

  if (!Array.isArray(order)) {
    throw new TypeError('Второй аргумент должен быть массивом');
  }

  // Получаем только собственные перечисляемые свойства (игнорируем прототип)
  const ownKeys = Object.keys(obj);

  // Разделяем ключи на две группы: те, что в order, и остальные
  const orderedKeys = [];
  const remainingKeys = [];

  // Сначала добавляем ключи из order, если они есть в объекте и ещё не добавлены
  for (const key of order) {
    if (typeof key === 'string' && ownKeys.includes(key)) {
      orderedKeys.push(key);
    }
  }

  // Остальные ключи, которых не было в order
  for (const key of ownKeys) {
    if (!orderedKeys.includes(key)) {
      remainingKeys.push(key);
    }
  }

  // Сортируем оставшиеся ключи по алфавиту
  remainingKeys.sort((a, b) => a.localeCompare(b));

  // Формируем итоговый массив объектов { key, value }
  return [...orderedKeys, ...remainingKeys].map(key => ({
    key,
    value: obj[key],
  }));
}
