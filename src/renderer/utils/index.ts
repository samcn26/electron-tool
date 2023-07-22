import get from 'lodash/get';
import { requiredTypes } from './config';
import { DHObservation, ExtractedObservation, Observation } from '../types';

export function extractDHObservation(
  dhData: DHObservation
): ExtractedObservation {
  return get(dhData, 'entry', []).reduce(
    (rv: ExtractedObservation, item: any) => {
      const resourceType = get(item, 'resource.resourceType');
      if (!resourceType || !(resourceType in requiredTypes)) return rv;
      const getItemValue = (path: string) => get(item, path);

      // extract the required fields from the DH data
      const content: any = Object.entries(requiredTypes[resourceType]).reduce(
        (acc: any, [key, path]) => {
          const value: string | number = getItemValue(path);
          if (value) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      if (resourceType === 'Observation') {
        (rv[resourceType] as Observation[]).push(content as Observation);
      } else {
        rv[resourceType] = content;
      }
      return rv;
    },
    { Observation: [] } as ExtractedObservation
  );
}
