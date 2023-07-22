// for observation
export const requiredTypes: Record<string, Record<string, string>> = {
  ServiceRequest: { orderId: 'resource.identifier[1].value' },
  Patient: {
    name: 'resource.name[0].text',
    gender: 'resource.gender',
    birthDate: 'resource.birthDate',
  },
  Observation: {
    codeMachine: 'resource.code.coding[0].code',
    code: 'resource.code.coding[1].code',
    value: 'resource.valueQuantity.value',
    unit: 'resource.valueQuantity.unit',
    // 检测时间
    effectiveDateTime: 'resource.effectiveDateTime',
    brand: 'resource.extension[4].valueString',
  },
};
