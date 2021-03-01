import {Suppli} from '../features/suppli/suppli';

interface StorageMeal {
  [id: string]: Meal[];
}

interface StorageSuppli {
  [id: string]: Suppli[];
}

interface StorageWater {
  [id: string]: Water[];
}
