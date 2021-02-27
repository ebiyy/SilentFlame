export const lossQuantityView: LossQuantityView = {
  weight: '体重',
  bodyFat: '体脂肪',
  leanBodyMass: '除脂肪体重',
};

export const mockWeight = [
  {startDate: '2021-01-31T03:54:11.000+0900', value: 55699.99694824219},
  {startDate: '2021-01-30T07:39:13.000+0900', value: 55099.9984741211},
  {startDate: '2021-01-29T04:45:45.000+0900', value: 55900.0015258789},
  {startDate: '2021-01-28T04:09:40.000+0900', value: 56099.9984741211},
  {startDate: '2021-01-27T05:57:42.000+0900', value: 56199.99694824219},
  {startDate: '2021-01-26T04:52:52.000+0900', value: 56199.99694824219},
  {startDate: '2021-01-25T06:02:56.000+0900', value: 56000},
  {startDate: '2021-01-24T03:47:32.000+0900', value: 56099.9984741211},
  {startDate: '2021-01-23T03:26:37.000+0900', value: 55800.00305175781},
  {startDate: '2021-01-22T05:17:30.000+0900', value: 55900.0015258789},
];

export const mockBodyFatPercentage = [
  {startDate: '2021-01-31T03:54:11.000+0900', value: 0.2059999942779541},
  {startDate: '2021-01-30T07:39:13.000+0900', value: 0.20399999022483826},
  {startDate: '2021-01-29T04:45:45.000+0900', value: 0.2070000112056732},
  {startDate: '2021-01-28T04:09:40.000+0900', value: 0.20799999833106995},
  {startDate: '2021-01-27T05:57:42.000+0900', value: 0.20799999833106995},
  {startDate: '2021-01-26T04:52:52.000+0900', value: 0.20799999833106995},
  {startDate: '2021-01-25T06:02:56.000+0900', value: 0.2070000112056732},
  {startDate: '2021-01-24T03:47:32.000+0900', value: 0.20799999833106995},
  {startDate: '2021-01-23T03:26:37.000+0900', value: 0.2070000112056732},
  {startDate: '2021-01-22T05:17:30.000+0900', value: 0.2070000112056732},
];

export const mockLeanBodyMass = [
  {startDate: '2021-01-31T03:54:11.000+0900', value: 42535.797119140625},
  {startDate: '2021-01-30T07:39:13.000+0900', value: 42269.59991455078},
  {startDate: '2021-01-29T04:45:45.000+0900', value: 42598.70147705078},
  {startDate: '2021-01-28T04:09:40.000+0900', value: 42661.20147705078},
  {startDate: '2021-01-27T05:57:42.000+0900', value: 42730.40008544922},
  {startDate: '2021-01-26T04:52:52.000+0900', value: 42730.40008544922},
  {startDate: '2021-01-25T06:02:56.000+0900', value: 42667.999267578125},
  {startDate: '2021-01-24T03:47:32.000+0900', value: 42661.20147705078},
  {startDate: '2021-01-23T03:26:37.000+0900', value: 42529.40368652344},
  {startDate: '2021-01-22T05:17:30.000+0900', value: 42598.70147705078},
];

// @type定義でも同様の宣言があるがimportするとerrorになるため記述
enum HealthUnit {
  bpm = 'bpm',
  calorie = 'calorie',
  celsius = 'celsius',
  count = 'count',
  day = 'day',
  fahrenheit = 'fahrenheit',
  foot = 'foot',
  gram = 'gram',
  hour = 'hour',
  inch = 'inch',
  joule = 'joule',
  kilocalorie = 'kilocalorie',
  meter = 'meter',
  mgPerdL = 'mgPerdL',
  mile = 'mile',
  minute = 'minute',
  mmhg = 'mmhg',
  mmolPerL = 'mmolPerL',
  percent = 'percent',
  pound = 'pound',
  second = 'second',
}

export const gramOptions = {
  unit: HealthUnit.gram, // optional; default 'bpm'
  startDate: new Date(2020, 1, 27).toISOString(), // required
  endDate: new Date().toISOString(), // optional; default now
  ascending: false, // optional; default false
  limit: 10, // optional; default no limit
};

export const percentOptions = {
  unit: HealthUnit.percent, // optional; default 'bpm'
  startDate: new Date(2020, 1, 27).toISOString(), // required
  endDate: new Date().toISOString(), // optional; default now
  ascending: false, // optional; default false
  limit: 10, // optional; default no limit
};

export const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '3',
    strokeWidth: '2',
    stroke: '#90EE90',
  },
};
