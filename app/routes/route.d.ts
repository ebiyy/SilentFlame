type FeatureName = 'weekly' | 'suppli' | 'meal' | 'water' | 'setting';

type ScreenName = {
  [key in FeatureName]: FeatureName;
};

type ActiveColor = {
  [key in FeatureName]: string;
};
