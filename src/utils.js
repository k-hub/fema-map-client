import {DISASTER_CODE_MAP} from './constants.js';

export function updateDisasterYear(featureCollection, year) {
  const {features} = featureCollection;

  for (const feature of features) {
    for (const event of feature.properties.event ) {
      if (event.hasOwnProperty(year)) {
        feature.properties.disaster = event[year].disaster;
        // Find the associated disaster code in DISASTER_CODE_MAP
        feature.properties.disaster_code = DISASTER_CODE_MAP[feature.properties.disaster];
        feature.properties.num_incidences = event[year].num_incidences;
        break;
      } else {
        feature.properties.disaster = null;
        feature.properties.disaster_code = null;
        feature.properties.num_incidences = null;
      }
    }
  }
};
