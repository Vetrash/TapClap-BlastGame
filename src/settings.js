const settings = {
  minLengthChain: 2, // минимальная длина удаляемой цепочки
  coinPrise: 1, // сколько очков дадут за каждые borderPrise
  minChainToSBlock: 7, // минимальная длица цепочки для спавна бонуса
  borderPrise: 1000, // сколько очков награждаются монетами
  increaseSet: 1.1, // степень повышения очков от длины. (increaseSet ** длина цепи * coastFigure)
  coastLevel: 30000, // сумма очков для победы
  coastFigure: 500, // стоимость одной фигуры в цепи
  shufleMax: 2, // количество перетусовок до проигрыша
  loadBar: {
    maxWidthLoadLine: 1245, // длина линии прогресса
    heightLoadLine: 86, // ширина линии прогресса
    gapLoadLineX: 40, // отступы для линии прогресса
    gapLoadLineY: 116,
  },
  gameMap: {
    startDrawY: 500, // координаты отрисовки игрового поля
    gapX: 5, // отступ между фигурами поля по Х
    gapY: 5, // отступ между фигурами поля по Y
    sizefigureX: 8, // количество фигур по горизонтали
    sizefigureY: 8, // количестово фигур по вертикали
  },
  figure: {
    speedFuling: 350, // скорость падения фигур
  },
  spells: {
    amount: 3, // количество способностей в баре
    gapX: 50, // отступ между иконками способностей
    prise: { // стоимость способностей
      bomb: 15,
      port: 3,
      lightning: 10,
    },
    arrSpell: ['bomb', 'port', 'lightning', 'killAll', 'killRow', 'killCol'], // список всех способностей
    quickSpell: ['lightning'], // список мгновенно применимых способностей ( без выбора клетки активации)
    doubleClickSpell: ['port'], // список способностей которым нужно две позиции для активации
  },
};
// стартовые характеристики глобальных переменных
export const getStartState = () => ({
  gameStatus: { value: 'wait' },
  ActivSpell: { value: 'none' },
  combo: { value: 0 },
  coin: { value: 30 }, // количество стартовых монет
  click: { value: 21 }, // количество доступных ходов
  score: {
    value: 0, str: '0', forProgress: 0, borderPrise: settings.borderPrise,
  },
  progress: { value: 0 },
  gametable: {
    fuguresImg: [],
    figures: [],
    chainArr: [],
    watchChainArr: [],
    handingFigure: [],
    stopFigures: [],
    watchZone: Array(settings.gameMap.sizefigureX).fill(settings.gameMap.sizefigureY),
    arrClick: [],
    portFig: [],
  },
  isRender: {
    figures: false,
    port: false,
    ui: false,
    spellSekect: false,
    endGame: false,
  },
});

const getSettings = () => settings;
export default getSettings;
