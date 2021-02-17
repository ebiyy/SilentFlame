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
