/* eslint-disable */
import { templates, locMapping, filterLocInfo } from './config';

const getMeta = (template) =>
  template
    .split('\n')
    .filter((x) => x)
    .map((x) => x.split('|'));

const getFilterLoc = (type) => {
  return filterLocInfo[type];
};

const replaceCommon = (template, commonReplacer, commonMapping) => {
  template.forEach((t) => {
    const [segment] = t;
    const replacerMapping = commonMapping[segment];
    replacerMapping &&
      Object.entries(replacerMapping).forEach(([replaceKey, loc]) => {
        t[loc] = commonReplacer[replaceKey];
      });
  });
};

export const getHL7 = ({ orderNum, dateOfBirth, gender, order, observation } = {}) => {
  try {
    const res = {
      order: '',
      observation: '',
    };

    const orderTemplate = getMeta(templates.order);
    const observationTemplate = getMeta(templates.observation);

    // deal order
    const { orderType, includes: orderIncludes } = order;
    const { includes: observationIncludes } = observation;
    const observationReplaceMap = observationIncludes.reduce(
      (acc, { item, ...others }) => {
        acc[item] = others;
        return acc;
      },
      {}
    );

    const common = {
      orderNum,
      dateOfBirth,
      gender,
      orderType,
    };

    // OBX sfor special deal
    const { OBX: obxMapping, ...commonMapping } = locMapping;

    replaceCommon(orderTemplate, common, commonMapping);
    replaceCommon(observationTemplate, common, commonMapping);

    res.order = orderTemplate
      .filter((x) => {
        const [segment] = x;
        if (segment === 'OBR') {
          // compare filters
          return orderIncludes.includes(x[getFilterLoc('order')]);
        }

        return true;
      })
      .map((x) => x.join('|'))
      .join('\n');

    res.observation = observationTemplate
      .filter((x) => {
        const [segment] = x;
        if (segment === 'OBX') {
          return Object.keys(observationReplaceMap).includes(
            x[getFilterLoc('observation')]
          );
        }

        return true;
      })
      .map((x) => {
        // do replace obx data logic
        const [segment] = x;
        if (segment === 'OBX') {
          const obxLoc = locMapping.OBX;
          const replacer =
            observationReplaceMap[x[getFilterLoc('observation')]];
          Object.entries(obxLoc).forEach(([replaceKey, loc]) => {
            x[loc] = replacer[replaceKey] ?? x[loc];
          });
        }

        return x.join('|');
      })
      .join('\n');

    return res;
  } catch (error) {
    console.error(error);
    return {error}
  }
};
