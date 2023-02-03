export const modals = document.getElementById('modals') as HTMLElement;

export const tabs = [
  {
    name: 'bun',
    title: 'Булки',
  },
  {
    name: 'sauce',
    title: 'Соусы',
  },
  {
    name: 'main',
    title: 'Начинки',
  },
]

export const formatStatus = (status: string): string => {
  if (status === 'done') {
    return 'Выполнен';
    } if (status === 'canceled') {
      return 'Готовится';
      } if (status === 'pending') {
        return 'Готовится';
        } return 'Создан';
}

const formatNumber = (number: number, words: Array<string>) => words[
  (number % 100 > 4 && number % 100 < 20)
    ? 2
    : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export const formatDate = (date: string) => {
  const now = Date.now();
  const createdAt = Date.parse(date);
  const delta = (now - createdAt) / (24 * 60 * 60 * 1000);
  const days = ['день', 'дня', 'дней'];
  if (delta < 1) {
    return `Сегодня, ${date.slice(11, 16)} i-GMT+3`;
    } if (delta < 2 && delta > 1) {
      return `Вчера, ${date.slice(11, 16)} i-GMT+3`;
      }
        return `${Math.floor(delta)} ${formatNumber(Math.floor(delta), days)} назад, ${date.slice(11, 16)} i-GMT+3`;
};
