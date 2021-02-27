import {
  mineralNutrientKeys,
  NUTRIENT_KEY,
  organicAcidNutrientKeys,
} from '../suppli/constant';
import {generateLabels, nutrientLabels} from './function.meal';

export const NUTRIENTS_LABEL = {
  foodName: {
    label: '食品名',
  },
  // generate
  // REFUSE: {
  //   label: NUTRIENT_KEY.REFUSE.label,
  //   unit: NUTRIENT_KEY.REFUSE.unit,
  // },
  ...generateLabels(['REFUSE', 'ENERC_KCAL', 'WATER']),
  // ...nutrientLabels('ENERC'),
  PROT: {
    ...nutrientLabels('PROT')['PROT'],
    detail: {
      ...nutrientLabels('PROTCAA'),
      // option start
      AAT: {
        ...nutrientLabels('AAT')['AAT'],
        detail: {
          ...generateLabels(['ILE', 'LEU', 'LYS']),
          AAS: {
            ...nutrientLabels('AAS')['AAS'],
            detail: {
              ...generateLabels(['MET', 'CYS']),
            },
          },
          AAA: {
            ...nutrientLabels('AAA')['AAA'],
            detail: {
              ...generateLabels(['PHE', 'TYR']),
            },
          },
          ...generateLabels([
            'THR',
            'TRP',
            'VAL',
            'HIS',
            'ARG',
            'ALA',
            'ASP',
            'GLU',
            'GLY',
            'PRO',
            'SER',
            'HYP',
          ]),
        },
      },
      ...generateLabels(['AMMON', 'AMMONE']),
      // option end
    },
  },
  FAT: {
    label: NUTRIENT_KEY.FAT.label,
    unit: NUTRIENT_KEY.FAT.unit,
    detail: {
      FATNLEA: {
        label: NUTRIENT_KEY.FATNLEA.label,
        unit: NUTRIENT_KEY.FATNLEA.unit,
      },
      // option start
      FACID: {
        ...nutrientLabels('FACID')['FACID'],
        detail: {
          FASAT: {
            ...nutrientLabels('FASAT')['FASAT'],
            detail: {
              ...generateLabels([
                'F4D0',
                'F6D0',
                'F7D0',
                'F8D0',
                'F10D0',
                'F12D0',
                'F13D0',
                'F14D0',
                'F15D0',
                'F15D0AI',
                'F16D0',
                'F16D0I',
                'F17D0',
                'F17D0AI',
                'F18D0',
                'F20D0',
                'F22D0',
                'F24D0',
              ]),
            },
          },
          FAMS: {
            ...nutrientLabels('FAMS')['FAMS'],
            detail: {
              ...generateLabels(['F10D1', 'F14D1', 'F15D1', 'F16D1', 'F17D1']),
              F18D1: {
                ...nutrientLabels('F18D1')['F18D1'],
                detail: {
                  ...generateLabels(['F18D1CN9', 'F18D1CN7']),
                },
              },
              ...generateLabels(['F20D1', 'F22D1', 'F24D1']),
            },
          },
          FAPU: {
            ...nutrientLabels('FAPU')['FAPU'],
            detail: {
              FAPUN3: {
                ...nutrientLabels('FAPUN3')['FAPUN3'],
                detail: {
                  ...generateLabels([
                    'F18D3N3',
                    'F18D4N3',
                    'F20D3N3',
                    'F20D4N3',
                    'F20D5N3',
                    'F21D5N3',
                    'F22D5N3',
                    'F22D6N3',
                  ]),
                },
              },
              FAPUN6: {
                ...nutrientLabels('FAPUN6')['FAPUN6'],
                detail: {
                  ...generateLabels([
                    'F18D2N6',
                    'F18D3N6',
                    'F20D2N6',
                    'F20D3N6',
                    'F20D4N6',
                    'F22D4N6',
                    'F22D5N6',
                  ]),
                },
              },
              ...generateLabels(['F16D2', 'F16D3', 'F16D4', 'F22D2']),
            },
          },
          ...nutrientLabels('FAUN'),
        },
      },
      // option end
      CHOLE: {
        label: NUTRIENT_KEY.CHOLE.label,
        unit: NUTRIENT_KEY.CHOLE.unit,
      },
    },
  },
  CHOCDF: {
    ...nutrientLabels('CHOCDF')['CHOCDF'],
    detail: {
      ...nutrientLabels('CHOAVLM'),
      CHOAVL: {
        ...nutrientLabels('CHOAVL')['CHOAVL'],
        // option start
        detail: {
          ...generateLabels([
            'STARCH',
            'GLUS',
            'FRUS',
            'GALS',
            'SUCS',
            'MALS',
            'LACS',
            'TRES',
          ]),
        },
        // option end
      },
      ...nutrientLabels('CHOAVLDF'),
      FIB: {
        ...nutrientLabels('FIB')['FIB'],
        // option start
        detail: {
          FIBTG: {
            ...nutrientLabels('FIBTG')['FIBTG'],
            detail: {
              ...generateLabels(['FIBSOL', 'FIBINS']),
            },
          },
          FIBTDF: {
            ...nutrientLabels('FIBTDF')['FIBTDF'],
            detail: {
              ...generateLabels(['FIBSDFS', 'FIBSDFP', 'FIBIDF', 'STARES']),
            },
          },
          // option end
        },
      },
      POLYL: {
        ...nutrientLabels('POLYL')['POLYL'],
        // option start
        detail: {
          ...generateLabels(['SORTL', 'MANTL']),
        },
        // option end
      },
    },
  },
  OA: {
    ...nutrientLabels('OA')['OA'],
    // option start
    detail: {
      ...generateLabels(Object.keys(organicAcidNutrientKeys)),
    },
    // option end
  },
  ...nutrientLabels('ASH'),
  mineral: {
    label: 'ミネラル',
    detail: {
      ...generateLabels(Object.keys(mineralNutrientKeys)),
    },
  },
  vitamin: {
    label: 'ビタミン',
    detail: {
      VITA_RAE: {
        ...nutrientLabels('VITA_RAE')['VITA_RAE'],
        detail: {
          ...generateLabels(['RETOL', 'CARTA', 'CARTB', 'CRYPXB', 'CARTBEQ']),
        },
      },
      ...nutrientLabels('VITD'),
      VITE: {
        label: 'ビタミンE',
        detail: {
          ...generateLabels(['TOCPHA', 'TOCPHB', 'TOCPHG', 'TOCPHD']),
        },
      },
      ...nutrientLabels('VITK'),
      VITB: {
        label: 'ビタミンB群',
        detail: {
          ...generateLabels([
            'THIA',
            'RIBF',
            'NIA',
            'NE',
            'VITB6A',
            'VITB12',
            'FOL',
            'PANTAC',
            'BIOT',
          ]),
        },
      },
      ...nutrientLabels('VITC'),
    },
  },
  ...generateLabels(['ALC', 'NACL_EQ']),
  remarks: {
    label: '備考',
    detail: {
      ...nutrientLabels('remarks'),
    },
  },
};

export const BASIC_NUTRIENTS_LABEL = {
  foodName: {
    label: '食品名',
  },
  ...generateLabels(['REFUSE', 'ENERC_KCAL', 'WATER']),
  PROT: {
    ...nutrientLabels('PROT')['PROT'],
    detail: {
      ...nutrientLabels('PROTCAA'),
    },
  },
  FAT: {
    label: NUTRIENT_KEY.FAT.label,
    unit: NUTRIENT_KEY.FAT.unit,
    detail: {
      FATNLEA: {
        label: NUTRIENT_KEY.FATNLEA.label,
        unit: NUTRIENT_KEY.FATNLEA.unit,
      },
      CHOLE: {
        label: NUTRIENT_KEY.CHOLE.label,
        unit: NUTRIENT_KEY.CHOLE.unit,
      },
    },
  },
  CHOCDF: {
    ...nutrientLabels('CHOCDF')['CHOCDF'],
    detail: {
      ...nutrientLabels('CHOAVLM'),
      CHOAVL: {
        ...nutrientLabels('CHOAVL')['CHOAVL'],
      },
      ...nutrientLabels('CHOAVLDF'),
      FIB: {
        ...nutrientLabels('FIB')['FIB'],
      },
      POLYL: {
        ...nutrientLabels('POLYL')['POLYL'],
      },
    },
  },
  OA: {
    ...nutrientLabels('OA')['OA'],
  },
  ...nutrientLabels('ASH'),
  mineral: {
    label: 'ミネラル',
    detail: {
      ...generateLabels(Object.keys(mineralNutrientKeys)),
    },
  },
  vitamin: {
    label: 'ビタミン',
    detail: {
      VITA_RAE: {
        ...nutrientLabels('VITA_RAE')['VITA_RAE'],
        detail: {
          ...generateLabels(['RETOL', 'CARTA', 'CARTB', 'CRYPXB', 'CARTBEQ']),
        },
      },
      ...nutrientLabels('VITD'),
      VITE: {
        label: 'ビタミンE',
        detail: {
          ...generateLabels(['TOCPHA', 'TOCPHB', 'TOCPHG', 'TOCPHD']),
        },
      },
      ...nutrientLabels('VITK'),
      VITB: {
        label: 'ビタミンB群',
        detail: {
          ...generateLabels([
            'THIA',
            'RIBF',
            'NIA',
            'NE',
            'VITB6A',
            'VITB12',
            'FOL',
            'PANTAC',
            'BIOT',
          ]),
        },
      },
      ...nutrientLabels('VITC'),
    },
  },
  ...generateLabels(['ALC', 'NACL_EQ']),
  remarks: {
    label: '備考',
    detail: {
      ...nutrientLabels('remarks'),
    },
  },
};
