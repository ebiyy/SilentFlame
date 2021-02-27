interface MealDocs extends DateMeals {
  author: string;
  createAt: Date;
  updatedAt: Date;
  appVersion: string;
}

interface DateMeals {
  [dateKey: string]: {
    meals: Meal[];
  };
}

interface WaterIntak {
  name: string;
  intake: number;
}

type ActionMealType = 'add' | 'update' | 'delete';

interface ActionMeal {
  item: CloudMeal | LocalMeal;
  action: ActionMealType;
}

interface CloudDocs {
  meals: CloudMeal[];
  author: string;
  createAt: Date;
  updatedAt: Date;
  appVersion: string;
}

// type MargeMeal = LocalMeal | CloudMeal;

// interface CloudMeal extends LocalMeal {}

interface Meal extends Nutrients {
  id: number;
  author: string;
  addedAt: Date;
  updatedAt: Date;
  intake: number;
  timePeriod: string;
  failed?: ActionMealType;
}

type TimePeriodValue = '朝食' | '昼食' | '夕食' | '間食';
type TimePeriodKey = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface TimePeriod {
  [x: string]: TimePeriodValue;
  breakfast: TimePeriodValue;
  lunch: TimePeriodValue;
  dinner: TimePeriodValue;
  snack: TimePeriodValue;
}

interface Nutrients {
  foodGroup: string;
  foodNumber: string;
  indexNumber: string;
  foodName: string;
  REFUSE: string;
  ENERC: string;
  ENERC_KCAL: string;
  WATER: string;
  PROTCAA: string;
  PROT: string;
  FATNLEA: string;
  CHOLE: string;
  FAT: string;
  CHOAVLM: string;
  CHOAVL: string;
  CHOAVLDF: string;
  FIB: string;
  POLYL: string;
  CHOCDF: string;
  OA: string;
  ASH: string;
  NA: string;
  K: string;
  CA: string;
  MG: string;
  P: string;
  FE: string;
  ZN: string;
  CU: string;
  MN: string;
  ID: string;
  SE: string;
  CR: string;
  MO: string;
  RETOL: string;
  CARTA: string;
  CARTB: string;
  CRYPXB: string;
  CARTBEQ: string;
  VITA_RAE: string;
  VITD: string;
  TOCPHA: string;
  TOCPHB: string;
  TOCPHG: string;
  TOCPHD: string;
  VITK: string;
  THIA: string;
  RIBF: string;
  NIA: string;
  NE: string;
  VITB6A: string;
  VITB12: string;
  FOL: string;
  PANTAC: string;
  BIOT: string;
  VITC: string;
  ALC: string;
  NACL_EQ: string;
  remarks: string;
}

interface Fats {
  foodGroup: string;
  foodNumber: string;
  indexNumber: string;
  foodName: string;
  WATER: string;
  FATNLEA: string;
  FAT: string;
  FACID: string;
  FASAT: string;
  FAMS: string;
  FAPU: string;
  FAPUN3: string;
  FAPUN6: string;
  F4D0: string;
  F6D0: string;
  F7D0: string;
  F8D0: string;
  F10D0: string;
  F12D0: string;
  F13D0: string;
  F14D0: string;
  F15D0: string;
  F15D0AI: string;
  F16D0: string;
  F16D0I: string;
  F17D0: string;
  F17D0AI: string;
  F18D0: string;
  F20D0: string;
  F22D0: string;
  F24D0: string;
  F10D1: string;
  F14D1: string;
  F15D1: string;
  F16D1: string;
  F17D1: string;
  F18D1: string;
  F18D1CN9: string;
  F18D1CN7: string;
  F20D1: string;
  F22D1: string;
  F24D1: string;
  F16D2: string;
  F16D3: string;
  F16D4: string;
  F18D2N6: string;
  F18D3N3: string;
  F18D3N6: string;
  F18D4N3: string;
  F20D2N6: string;
  F20D3N3: string;
  F20D3N6: string;
  F20D4N3: string;
  F20D4N6: string;
  F20D5N3: string;
  F21D5N3: string;
  F22D2: string;
  F22D4N6: string;
  F22D5N3: string;
  F22D5N6: string;
  F22D6N3: string;
  FAUN: string;
  remarks: string;
}

interface Carbohydrate {
  foodGroup: string;
  foodNumber: string;
  indexNumber: string;
  foodName: string;
  WATER: string;
  CHOAVLM: string;
  STARCH: string;
  GLUS: string;
  FRUS: string;
  GALS: string;
  SUCS: string;
  MALS: string;
  LACS: string;
  TRES: string;
  CHOAVL: string;
  SORTL: string;
  MANTL: string;
  remarks: string;
}

interface Protein {
  foodGroup: string;
  foodNumber: string;
  indexNumber: string;
  foodName: string;
  WATER: string;
  PROTCAA: string;
  PROT: string;
  ILE: string;
  LEU: string;
  LYS: string;
  MET: string;
  CYS: string;
  AAS: string;
  PHE: string;
  TYR: string;
  AAA: string;
  THR: string;
  TRP: string;
  VAL: string;
  HIS: string;
  ARG: string;
  ALA: string;
  ASP: string;
  GLU: string;
  GLY: string;
  PRO: string;
  SER: string;
  HYP: string;
  AAT: string;
  AMMON: string;
  AMMONE: string;
  remarks: string;
}

interface DietaryFiber {
  foodGroup: string;
  foodNumber: string;
  indexNumber: string;
  foodName: string;
  WATER: string;
  FIBSOL: string;
  FIBINS: string;
  FIBTG: string;
  FIBSDFS: string;
  FIBSDFP: string;
  FIBIDF: string;
  STARES: string;
  FIBTDF: string;
  field14: string;
}

interface OrganicAcid {
  foodGroup: string;
  foodNumber: string;
  indexNumber: string;
  foodName: string;
  WATER: string;
  FORAC: string;
  ACEAC: string;
  GLYCLAC: string;
  LACAC: string;
  GLUCAC: string;
  OXALAC: string;
  MOLAC: string;
  SUCAC: string;
  FUMAC: string;
  MALAC: string;
  TARAC: string;
  GLUAKAC: string;
  CITAC: string;
  SALAC: string;
  PCHOUAC: string;
  CAFFAC: string;
  FERAC: string;
  CHLRAC: string;
  QUINAC: string;
  OROTAC: string;
  PYROGAC: string;
  PROPAC: string;
  OA: string;
  remarks: string;
}
