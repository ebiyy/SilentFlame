export const NUTRIENTS_LABEL = {
  foodName: {
    label: '食品名',
  },
  REFUSE: {
    label: '破棄率',
    unit: '%',
  },
  // ENERC: {
  //   label: 'エネルギー',
  //   unit: 'kJ',
  // },
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
    detail: {
      PROTCAA: {
        label: 'アミノ酸組成によるたんぱく質',
        unit: 'g',
      },
    },
  },
  FAT: {
    label: '脂質',
    unit: 'g',
    detail: {
      FATNLEA: {
        label: '脂肪酸のトリアシルグリセロール当量',
        unit: 'g',
      },
      CHOLE: {
        label: 'コレステロール',
        unit: 'mg',
      },
    },
  },
  CHOCDF: {
    label: '炭水化物',
    unit: 'g',
    detail: {
      CHOAV: {
        label: '利用可能炭水化物（糖質）',
        detail: {
          CHOAVLM: {
            label: '利用可能炭水化物（単糖当量）',
            unit: 'g',
          },
          CHOAVL: {
            label: '利用可能炭水化物（質量計）',
            unit: 'g',
          },
          CHOAVLDF: {
            label: '差引き法による利用可能炭水化物',
            unit: 'g',
          },
        },
      },
      FIB: {
        label: '食物繊維総量',
        unit: 'g',
      },
      POLYL: {
        label: '糖アルコール',
        unit: 'g',
      },
    },
  },
  OA: {
    label: '有機酸',
    unit: 'g',
  },
  ASH: {
    label: '灰分',
    unit: 'g',
  },
  mineral: {
    label: 'ミネラル',
    detail: {
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
    },
  },
  vitamin: {
    label: 'ビタミン',
    detail: {
      VITA: {
        label: 'ビタミンA',
        detail: {
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
            label: 'レチノール活性当量',
            unit: 'μg',
          },
        },
      },
      VITD: {
        label: 'ビタミンD',
        unit: 'μg',
      },
      VITE: {
        label: 'ビタミンE',
        detail: {
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
        },
      },
      VITK: {
        label: 'ビタミンK',
        unit: 'μg',
      },
      VITB: {
        label: 'ビタミンB群',
        detail: {
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
        },
      },
      VITC: {
        label: 'ビタミンC',
        unit: 'mg',
      },
    },
  },
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
  },
};
