import {PriceUnit, ContentSizeUnit} from './suppli';

export const PRICE_UNIT: {[x: string]: PriceUnit} = {
  jpy: '¥',
  usd: '$',
};

export const CONTENT_SIZE_UNIT: {[x: string]: ContentSizeUnit} = {
  piece: '個',
  mcg: 'mcg',
  mg: 'mg',
  g: 'g',
  μg: 'μg',
  kcal: 'kcal',
};

export const MOCK_BASE_INFO = {
  id: Math.floor(new Date().getTime() / 1000),
  suppliName: 'アルギニン + オルニチン',
  imageRes: {
    fileName: 'FAA048E8-44BF-4F9D-A6BC-CEA9A4BCE4C2.jpg',
    fileSize: 46116,
    height: 200,
    type: 'image/jpg',
    uri:
      'file:///var/mobile/Containers/Data/Application/6CCF655B-9959-4DFD-A06A-B52658CC54AD/tmp/FAA048E8-44BF-4F9D-A6BC-CEA9A4BCE4C2.jpg',
    width: 150,
  },
  category: 'サプリメント',
  subCategory: 'アミノ酸',
  priceValue: 1193,
  priceUnit: PRICE_UNIT.jpy,
  contentSizeValue: 100,
  contentSizeUnit: CONTENT_SIZE_UNIT.piece,
  servingSize: 6,
};

export const MOCK_NUTRIENTS = {
  nutrients: [
    {
      nutrientName: 'アルギニン',
      amountPerServingValue: 500,
      amountPerServingUnit: CONTENT_SIZE_UNIT.mg,
      perDailyValue: undefined,
    },
    {
      nutrientName: 'オルニチン',
      amountPerServingValue: 250,
      amountPerServingUnit: CONTENT_SIZE_UNIT.mg,
      perDailyValue: undefined,
    },
  ],
};

export const MOCK_BASE_INFO2 = {
  id: Math.floor(new Date().getTime() / 1000),
  suppliName: 'イヌリン',
  imageRes: {
    fileName: 'FAA048E8-44BF-4F9D-A6BC-CEA9A4BCE4C2.jpg',
    fileSize: 46116,
    height: 200,
    type: 'image/jpg',
    uri:
      'file:///var/mobile/Containers/Data/Application/6CCF655B-9959-4DFD-A06A-B52658CC54AD/tmp/FAA048E8-44BF-4F9D-A6BC-CEA9A4BCE4C2.jpg',
    width: 150,
  },
  category: 'サプリメント',
  subCategory: '繊維',
  priceValue: 859,
  priceUnit: PRICE_UNIT.jpy,
  contentSizeValue: 227,
  contentSizeUnit: CONTENT_SIZE_UNIT.g,
  servingSize: 2.8,
};

export const MOCK_NUTRIENTS2 = {
  nutrients: [
    {
      nutrientName: '総炭水化物',
      amountPerServingValue: 2.7,
      amountPerServingUnit: CONTENT_SIZE_UNIT.g,
      perDailyValue: 1,
    },
    {
      nutrientName: '食物繊維	',
      amountPerServingValue: 2.5,
      amountPerServingUnit: CONTENT_SIZE_UNIT.g,
      perDailyValue: 10,
    },
  ],
};

export const dietaryFiberNutrientKeys = {
  FIBSOL: {label: '水溶性食物繊維', unit: 'g'},
  FIBINS: {label: '不溶性食物繊維', unit: 'g'},
  FIBTG: {label: '食物繊維総量(プロスキー変法)', unit: 'g'},
  FIBSDFS: {label: '低分子量水溶性食物繊維', unit: 'g'},
  FIBSDFP: {label: '高分子量水溶性食物繊維', unit: 'g'},
  FIBIDF: {label: '不溶性食物繊維', unit: 'g'},
  STARES: {label: '難消化性でん粉', unit: 'g'},
  FIBTDF: {label: '食物繊維総量(AOAC.2011.25法)', unit: 'g'},
};

export const organicAcidNutrientKeys = {
  FORAC: {label: 'ギ酸', unit: 'g'},
  ACEAC: {label: '酢酸', unit: 'g'},
  GLYCLAC: {label: 'グリコール酸', unit: 'g'},
  LACAC: {label: '乳酸', unit: 'g'},
  GLUCAC: {label: 'グルコン酸', unit: 'g'},
  OXALAC: {label: 'シュウ酸', unit: 'g'},
  MOLAC: {label: 'マロン酸', unit: 'g'},
  SUCAC: {label: 'コハク酸', unit: 'g'},
  FUMAC: {label: 'フマル酸', unit: 'g'},
  MALAC: {label: 'リンゴ酸', unit: 'g'},
  TARAC: {label: '酒石酸', unit: 'g'},
  GLUAKAC: {label: 'α‐ケトグルタル酸', unit: 'g'},
  CITAC: {label: 'クエン酸', unit: 'g'},
  SALAC: {label: 'サリチル酸', unit: 'g'},
  PCHOUAC: {label: 'p‐クマル酸', unit: 'mg'},
  CAFFAC: {label: 'コーヒー酸', unit: 'mg'},
  FERAC: {label: 'フェルラ酸', unit: 'mg'},
  CHLRAC: {label: 'クロロゲン酸', unit: 'mg'},
  QUINAC: {label: 'キナ酸', unit: 'g'},
  OROTAC: {label: 'オロト酸', unit: 'g'},
  PYROGAC: {label: 'ピログルタミン酸', unit: 'g'},
  PROPAC: {label: 'プロピオン酸', unit: 'g'},
  // OA: {label: '計',unit: 'g'},
};

export const mineralNutrientKeys = {
  NA: {
    label: 'ナトリウム',
    unit: 'mg',
  },
  K: {
    label: 'カリウム',
    unit: 'mg',
  },
  CA: {
    label: 'カルシウム',
    unit: 'mg',
  },
  MG: {
    label: 'マグネシウム',
    unit: 'mg',
  },
  P: {
    label: 'リン',
    unit: 'mg',
  },
  FE: {
    label: '鉄分',
    unit: 'mg',
  },
  ZN: {
    label: '亜鉛',
    unit: 'mg',
  },
  CU: {
    label: '銅',
    unit: 'mg',
  },
  MN: {
    label: 'マンガン',
    unit: 'mg',
  },
  ID: {
    label: 'ヨウ素',
    unit: 'μg',
  },
  SE: {
    label: 'セレン',
    unit: 'μg',
  },
  CR: {
    label: 'クロム',
    unit: 'μg',
  },
  MO: {
    label: 'モリブデン',
    unit: 'μg',
  },
};

export const vitaminNutrientKeys = {
  RETOL: {
    label: 'レチノール',
    unit: 'μg',
  },
  CARTA: {
    label: 'αカロテン',
    unit: 'μg',
  },
  CARTB: {
    label: 'βカロテン',
    unit: 'μg',
  },
  CRYPXB: {
    label: 'βクリプトキサンチン',
    unit: 'μg',
  },
  CARTBEQ: {
    label: 'βカロテン当量',
    unit: 'μg',
  },
  VITA_RAE: {
    label: 'ビタミンA（レチノール活性当量）',
    unit: 'μg',
  },
  VITD: {
    label: 'ビタミンD',
    unit: 'μg',
  },
  TOCPHA: {
    label: 'αトコフェロール',
    unit: 'mg',
  },
  TOCPHB: {
    label: 'βトコフェロール',
    unit: 'mg',
  },
  TOCPHG: {
    label: 'γトコフェロール',
    unit: 'mg',
  },
  TOCPHD: {
    label: 'δトコフェロール',
    unit: 'mg',
  },
  VITK: {
    label: 'ビタミンK',
    unit: 'μg',
  },
  THIA: {
    label: 'ビタミンB1',
    unit: 'mg',
  },
  RIBF: {
    label: 'ビタミンB2',
    unit: 'mg',
  },
  NIA: {
    label: 'ナイアシン',
    unit: 'mg',
  },
  NE: {
    label: 'ナイアシン当量',
    unit: 'mg',
  },
  VITB6A: {
    label: 'ビタミンB6',
    unit: 'mg',
  },
  VITB12: {
    label: 'ビタミンB12',
    unit: 'μg',
  },
  FOL: {
    label: '葉酸',
    unit: 'μg',
  },
  PANTAC: {
    label: 'パントテン酸',
    unit: 'mg',
  },
  BIOT: {
    label: 'ビオチン',
    unit: 'μg',
  },
  VITC: {
    label: 'ビタミンC',
    unit: 'mg',
  },
};

export const fatNutrientKeys = {
  FACID: {
    label: '脂肪酸総量',
    unit: 'g',
  },
  FASAT: {
    label: '飽和脂肪酸',
    unit: 'g',
  },
  FAMS: {
    label: '一価不飽和脂肪酸',
    unit: 'g',
  },
  FAPU: {
    label: '多価不飽和脂肪酸',
    unit: 'g',
  },
  FAPUN3: {
    label: 'オメガ3 不飽和脂肪酸',
    unit: 'g',
  },
  FAPUN6: {
    label: 'オメガ6 不飽和脂肪酸',
    unit: 'g',
  },
  F4D0: {
    label: '酪酸',
    unit: 'mg',
  },
  F6D0: {
    label: 'ヘキサン酸',
    unit: 'mg',
  },
  F7D0: {
    label: 'ヘプタン酸',
    unit: 'mg',
  },
  F8D0: {
    label: 'オクタン酸',
    unit: 'mg',
  },
  F10D0: {
    label: 'デカン酸',
    unit: 'mg',
  },
  F12D0: {
    label: 'ラウリン酸',
    unit: 'mg',
  },
  F13D0: {
    label: 'トリデカン酸',
    unit: 'mg',
  },
  F14D0: {
    label: 'ミリスチン酸',
    unit: 'mg',
  },
  F15D0: {
    label: 'ペンタデカン酸',
    unit: 'mg',
  },
  F15D0AI: {
    label: 'ペンタデカン酸(ant)',
    unit: 'mg',
  },
  F16D0: {
    label: 'パルミチン酸',
    unit: 'mg',
  },
  F16D0I: {
    label: 'パルミチン酸(iso)',
    unit: 'mg',
  },
  F17D0: {
    label: 'ヘプタデカン酸',
    unit: 'mg',
  },
  F17D0AI: {
    label: 'ヘプタデカン酸(ant)',
    unit: 'mg',
  },
  F18D0: {
    label: 'ステアリン酸',
    unit: 'mg',
  },
  F20D0: {
    label: 'アラキジン酸',
    unit: 'mg',
  },
  F22D0: {
    label: 'ベヘン酸',
    unit: 'mg',
  },
  F24D0: {
    label: 'リグノセリン酸',
    unit: 'mg',
  },
  F10D1: {label: 'デセン酸', unit: 'mg'},
  F14D1: {label: 'ミリストレイン酸', unit: 'mg'},
  F15D1: {label: 'ペンタデセン酸', unit: 'mg'},
  F16D1: {label: 'パルミトレイン酸', unit: 'mg'},
  F17D1: {label: 'ヘプタデセン酸', unit: 'mg'},
  F18D1: {label: 'オクタデセン酸', unit: 'mg'},
  F18D1CN9: {label: 'オレイン酸', unit: 'mg'},
  F18D1CN7: {label: 'シス-バクセン酸', unit: 'mg'},
  F20D1: {label: 'イコセン酸', unit: 'mg'},
  F22D1: {label: 'ドコセン酸', unit: 'mg'},
  F24D1: {label: 'テトラコセン酸', unit: 'mg'},
  F16D2: {label: 'ヘキサデカジエン酸', unit: 'mg'},
  F16D3: {label: 'ヘキサデカトリエン酸', unit: 'mg'},
  F16D4: {label: 'ヘキサデカテトラエン酸', unit: 'mg'},
  F18D2N6: {label: 'リノール酸', unit: 'mg'},
  F18D3N3: {label: 'α‐リノレン酸', unit: 'mg'},
  F18D3N6: {label: 'γ‐リノレン酸', unit: 'mg'},
  F18D4N3: {label: 'オクタデカテトラエン酸', unit: 'mg'},
  F20D2N6: {label: 'イコサジエン酸', unit: 'mg'},
  F20D3N3: {label: 'イコサトリエン酸', unit: 'mg'},
  F20D3N6: {label: 'イコサトリエン酸', unit: 'mg'},
  F20D4N3: {label: 'イコサテトラエン酸', unit: 'mg'},
  F20D4N6: {label: 'アラキドン酸', unit: 'mg'},
  F20D5N3: {label: 'エイコサペンタエン酸(EPA)', unit: 'mg'},
  F21D5N3: {label: 'ヘンイコサペンタエン酸', unit: 'mg'},
  F22D2: {label: 'ドコサジエン酸', unit: 'mg'},
  F22D4N6: {label: 'ドコサテトラエン酸', unit: 'mg'},
  F22D5N3: {label: 'ドコサペンタエン酸', unit: 'mg'},
  F22D5N6: {label: 'ドコサペンタエン酸', unit: 'mg'},
  F22D6N3: {label: 'ドコサヘキサエン酸(DHA)', unit: 'mg'},
  FAUN: {label: '未同定物質', unit: 'mg'},
};

export const carbohydrateNutrientKeys = {
  CHOAVLM: {label: '単糖当量', unit: 'g'},
  STARCH: {label: 'でんぷん', unit: 'g'},
  GLUS: {label: 'ぶどう糖', unit: 'g'},
  FRUS: {label: '果糖', unit: 'g'},
  GALS: {label: 'ガラクトース', unit: 'g'},
  SUCS: {label: 'しょ糖', unit: 'g'},
  MALS: {label: '麦芽糖', unit: 'g'},
  LACS: {label: '乳糖', unit: 'g'},
  TRES: {label: 'トレハロース', unit: 'g'},
  CHOAVL: {label: '利用可能炭水化物', unit: 'g'},
  SORTL: {label: 'ソルビトール', unit: 'g'},
  MANTL: {label: 'マンニトール', unit: 'g'},
};

export const proteinNutrientKeys = {
  // PROTCAA: {label: 'アミノ酸組成によるたんぱく質', unit: 'g'},
  // PROT: {label: 'たんぱく質', unit: 'g'},
  AAT: {label: 'アミノ酸組成計', unit: 'mg'},
  ILE: {label: 'イソロイシン', unit: 'mg'},
  LEU: {label: 'ロイシン', unit: 'mg'},
  LYS: {label: 'リシン（リジン）', unit: 'mg'},
  AAS: {label: '含硫アミノ酸', unit: 'mg'},
  MET: {label: 'メチオニン', unit: 'mg'},
  CYS: {label: 'シスチン', unit: 'mg'},
  AAA: {label: '芳香族アミノ酸', unit: 'mg'},
  PHE: {label: 'フェニルアラニン', unit: 'mg'},
  TYR: {label: 'チロシン', unit: 'mg'},
  THR: {label: 'トレオニン（スレオニン）', unit: 'mg'},
  TRP: {label: 'トリプトファン', unit: 'mg'},
  VAL: {label: 'バリン', unit: 'mg'},
  HIS: {label: 'ヒスチジン', unit: 'mg'},
  ARG: {label: 'アルギニン', unit: 'mg'},
  ALA: {label: 'アラニン', unit: 'mg'},
  ASP: {label: 'アスパラギン酸', unit: 'mg'},
  GLU: {label: 'グルタミン酸', unit: 'mg'},
  GLY: {label: 'グリシン', unit: 'mg'},
  PRO: {label: 'プロリン', unit: 'mg'},
  SER: {label: 'セリン', unit: 'mg'},
  HYP: {label: 'ヒドロキシプロリン', unit: 'mg'},
  AMMON: {label: 'アンモニア', unit: 'mg'},
  AMMONE: {label: '剰余アンモニア', unit: 'mg'},
};

export const NUTRIENT_KEY = {
  REFUSE: {
    label: '破棄率',
    unit: '%',
  },
  ENERC: {
    label: 'エネルギー',
    unit: 'kJ',
  },
  ENERC_KCAL: {
    label: 'エネルギー',
    unit: 'kcal',
  },
  WATER: {
    label: '水分',
    unit: 'g',
  },
  PROT: {
    label: 'たんぱく質',
    unit: 'g',
  },
  PROTCAA: {
    label: 'アミノ酸組成によるたんぱく質',
    unit: 'g',
  },
  ...proteinNutrientKeys,
  FAT: {
    label: '脂質',
    unit: 'g',
  },
  FATNLEA: {
    label: 'トリアシルグリセロール当量',
    unit: 'g',
  },
  CHOLE: {
    label: 'コレステロール',
    unit: 'mg',
  },
  ...fatNutrientKeys,
  CHOCDF: {
    label: '炭水化物',
    unit: 'g',
  },
  ...carbohydrateNutrientKeys,
  CHOAVLDF: {
    label: '差引き法による利用可能炭水化物',
    unit: 'g',
  },
  FIB: {
    label: '食物繊維総量',
    unit: 'g',
  },
  ...dietaryFiberNutrientKeys,
  POLYL: {
    label: '糖アルコール',
    unit: 'g',
  },
  OA: {
    label: '有機酸',
    unit: 'g',
  },
  ...organicAcidNutrientKeys,
  ASH: {
    label: '灰分',
    unit: 'g',
  },
  ...mineralNutrientKeys,
  ...vitaminNutrientKeys,
  ALC: {
    label: 'アルコール',
    unit: 'g',
  },
  NACL_EQ: {
    label: '食塩相当量',
    unit: 'g',
  },
  remarks: {
    label: '備考',
    unit: 'g',
  },
};
