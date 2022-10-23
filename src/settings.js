const settings = {
  minLengthChain: 2,
  coinPrise: 1,
  minChainToSBlock: 7,
  borderPrise: 1000,
  increaseSet: 1.1,
  coastLevel: 30000,
  coastFigure: 500,
  shufleMax: 2,
  loadBar: {
    maxWidthLoadLine: 1245,
    heightLoadLine: 86,
    gapLoadLineX: 40,
    gapLoadLineY: 116,
  },
  gameMap: {
    startDrawY: 500,
    gapX: 5,
    gapY: 5,
    sizefigureX: 8,
    sizefigureY: 8,
  },
  figure: {
    speedFuling: 350,
  },
  spells: {
    amount: 3,
    gapX: 50,
    prise: {
      bomb: 15,
      port: 3,
      lightning: 10,
    },
    arrSpell: ['bomb', 'port', 'lightning', 'killAll', 'killRow', 'killCol'],
    quickSpell: ['lightning'],
    doubleClickSpell: ['port'],
  },
};

export const getStartState = () => ({
  gameStatus: { value: 'wait' },
  ActivSpell: { value: 'none' },
  combo: { value: 0 },
  coin: { value: 30 },
  click: { value: 21 },
  score: {
    value: 0, str: '0', forProgress: 0, borderPrise: 1000,
  },
  progress: { value: 0 },
  gametable: {
    fuguresImg: [],
    figures: [],
    chainArr: [],
    watchChainArr: [],
    handingFigure: [],
    stopFigures: [],
    status: 'wait',
    watchZone: Array(settings.gameMap.sizefigureX).fill(settings.gameMap.sizefigureY),
    arrClick: [],
    portFig: [],
  },
  isRender: {
    figures: false,
    port: false,
    ui: false,
  },
});

const getSettings = () => settings;
export default getSettings;
