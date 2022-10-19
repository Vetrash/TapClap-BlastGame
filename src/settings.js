const settings = {
  coinPrise: 1,
  minChainToSBlock: 4,
  borderPrise: 1000,
  widthLayers: 2000,
  heightLayers: 2900,
  increaseSet: 1.1,
  coastLevel: 20000,
  coastFigure: 500,
  loadBar: {
    widthImgBar: 1338,
    heightImgBar: 252,
    maxWidthLoadLine: 1245,
    heightLoadLine: 86,
    gapLoadLineX: 40,
    gapLoadLineY: 116,
  },
  gameMap: {
    startDrawY: 500,
    gapX: 5,
    gapY: 5,
    heightMap: 1819,
    widthMap: 1633,
    borderGapY: 0,
    sizefigureX: 9,
    sizefigureY: 9,
  },
  figure: {
    widthFigure: 171,
    heightFigure: 192,
    speedFuling: 350,
  },
  spells: {
    amount: 3,
    widthSpellIcon: 352,
    heightSpellIcon: 372,
    widthIcon: 171,
    gapX: 50,
    prise: {
      bomb: 15,
      port: 3,
      lightning: 10,
    },
    arrSpell: ['bomb', 'port', 'lightning'],
    quickSpell: ['lightning'],
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
    watchZone: Array(9).fill(9),
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
