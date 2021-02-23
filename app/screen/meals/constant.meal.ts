import {
  carbohydrateNutrientKeys,
  fatNutrientKeys,
  NUTRIENT_KEY,
  organicAcidNutrientKeys,
  proteinNutrientKeys,
} from '../supplement/constant';
import {
  generateLabels,
  generateNutrientsLabel,
  nutrientLabels,
} from './function.meal';

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
          ...generateLabels(['SORTL', 'MANTL']),
        },
      },
      POLYL: {
        ...nutrientLabels('POLYL')['POLYL'],
        detail: {
          ...generateLabels(['SORTL', 'MANTL']),
        },
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
  ASH: {
    label: NUTRIENT_KEY.ASH.label,
    unit: NUTRIENT_KEY.ASH.unit,
  },
  mineral: {
    label: 'ミネラル',
    detail: {
      NA: {
        label: NUTRIENT_KEY.NA.label,
        unit: NUTRIENT_KEY.NA.unit,
      },
      K: {
        label: NUTRIENT_KEY.K.label,
        unit: NUTRIENT_KEY.K.unit,
      },
      CA: {
        label: NUTRIENT_KEY.CA.label,
        unit: NUTRIENT_KEY.CA.unit,
      },
      MG: {
        label: NUTRIENT_KEY.MG.label,
        unit: NUTRIENT_KEY.MG.unit,
      },
      P: {
        label: NUTRIENT_KEY.P.label,
        unit: NUTRIENT_KEY.P.unit,
      },
      FE: {
        label: NUTRIENT_KEY.FE.label,
        unit: NUTRIENT_KEY.FE.unit,
      },
      ZN: {
        label: NUTRIENT_KEY.ZN.label,
        unit: NUTRIENT_KEY.ZN.unit,
      },
      CU: {
        label: NUTRIENT_KEY.CU.label,
        unit: NUTRIENT_KEY.CU.unit,
      },
      MN: {
        label: NUTRIENT_KEY.MN.label,
        unit: NUTRIENT_KEY.MN.unit,
      },
      ID: {
        label: NUTRIENT_KEY.ID.label,
        unit: NUTRIENT_KEY.ID.unit,
      },
      SE: {
        label: NUTRIENT_KEY.SE.label,
        unit: NUTRIENT_KEY.SE.unit,
      },
      CR: {
        label: NUTRIENT_KEY.CR.label,
        unit: NUTRIENT_KEY.CR.unit,
      },
      MO: {
        label: NUTRIENT_KEY.MO.label,
        unit: NUTRIENT_KEY.MO.unit,
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
            label: NUTRIENT_KEY.RETOL.label,
            unit: NUTRIENT_KEY.RETOL.unit,
          },
          CARTA: {
            label: NUTRIENT_KEY.CARTA.label,
            unit: NUTRIENT_KEY.CARTA.unit,
          },
          CARTB: {
            label: NUTRIENT_KEY.CARTB.label,
            unit: NUTRIENT_KEY.CARTB.unit,
          },
          CRYPXB: {
            label: NUTRIENT_KEY.CRYPXB.label,
            unit: NUTRIENT_KEY.CRYPXB.unit,
          },
          CARTBEQ: {
            label: NUTRIENT_KEY.CARTBEQ.label,
            unit: NUTRIENT_KEY.CARTBEQ.unit,
          },
          VITA_RAE: {
            label: NUTRIENT_KEY.VITA_RAE.label,
            unit: NUTRIENT_KEY.VITA_RAE.unit,
          },
        },
      },
      VITD: {
        label: NUTRIENT_KEY.VITD.label,
        unit: NUTRIENT_KEY.VITD.unit,
      },
      VITE: {
        label: 'ビタミンE',
        detail: {
          TOCPHA: {
            label: NUTRIENT_KEY.TOCPHA.label,
            unit: NUTRIENT_KEY.TOCPHA.unit,
          },
          TOCPHB: {
            label: NUTRIENT_KEY.TOCPHB.label,
            unit: NUTRIENT_KEY.TOCPHB.unit,
          },
          TOCPHG: {
            label: NUTRIENT_KEY.TOCPHG.label,
            unit: NUTRIENT_KEY.TOCPHG.unit,
          },
          TOCPHD: {
            label: NUTRIENT_KEY.TOCPHD.label,
            unit: NUTRIENT_KEY.TOCPHD.unit,
          },
        },
      },
      VITK: {
        label: NUTRIENT_KEY.VITK.label,
        unit: NUTRIENT_KEY.VITK.unit,
      },
      VITB: {
        label: 'ビタミンB群',
        detail: {
          THIA: {
            label: NUTRIENT_KEY.THIA.label,
            unit: NUTRIENT_KEY.THIA.unit,
          },
          RIBF: {
            label: NUTRIENT_KEY.RIBF.label,
            unit: NUTRIENT_KEY.RIBF.unit,
          },
          NIA: {
            label: NUTRIENT_KEY.NIA.label,
            unit: NUTRIENT_KEY.NIA.unit,
          },
          NE: {
            label: NUTRIENT_KEY.NE.label,
            unit: NUTRIENT_KEY.NE.unit,
          },
          VITB6A: {
            label: NUTRIENT_KEY.VITB6A.label,
            unit: NUTRIENT_KEY.VITB6A.unit,
          },
          VITB12: {
            label: NUTRIENT_KEY.VITB12.label,
            unit: NUTRIENT_KEY.VITB12.unit,
          },
          FOL: {
            label: NUTRIENT_KEY.FOL.label,
            unit: NUTRIENT_KEY.FOL.unit,
          },
          PANTAC: {
            label: NUTRIENT_KEY.PANTAC.label,
            unit: NUTRIENT_KEY.PANTAC.unit,
          },
          BIOT: {
            label: NUTRIENT_KEY.BIOT.label,
            unit: NUTRIENT_KEY.BIOT.unit,
          },
        },
      },
      VITC: {
        label: NUTRIENT_KEY.VITC.label,
        unit: NUTRIENT_KEY.VITC.unit,
      },
    },
  },
  ALC: {
    label: NUTRIENT_KEY.ALC.label,
    unit: NUTRIENT_KEY.ALC.unit,
  },
  NACL_EQ: {
    label: NUTRIENT_KEY.NACL_EQ.label,
    unit: NUTRIENT_KEY.NACL_EQ.unit,
  },
  remarks: {
    label: '備考',
  },
};
