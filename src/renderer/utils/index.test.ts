// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
import { extractDHObservation } from './index';
import { DHObservation, ExtractedObservation } from '../types';

const providedDHData = {
  resourceType: 'Bundle',
  type: 'message',
  entry: [
    {
      resource: {
        resourceType: 'Patient',
        identifier: [
          {
            system:
              'http://cdp.roche.com/patient/identifier/infinity/patientIdentifier',
            value: '7',
          },
        ],
        name: [{ text: 'Test47', given: [''] }],
        gender: 'female',
        birthDate: '1991-01-01',
      },
      request: { method: 'POST', url: 'Patient' },
    },
    {
      fullUrl: 'urn:uuid:Observation_20230609165330144938$8685',
      resource: {
        resourceType: 'Observation',
        extension: [
          { url: '', valueString: '' },
          { url: '', valueString: '' },
          {
            url: 'http://cdp.roche.com/observation/extension/x_instrumentModule',
            valueString: 'c8000',
          },
          {
            url: 'https://cdp.roche.com/observation/extension/x_instrumentNo',
            valueString: '1',
          },
          {
            url: 'http://cdp.roche.com/observation/extension/x_testBrand',
            valueString: 'xx',
          },
          {
            url: 'http://cdp.roche.com/observation/extension/x_originalFields',
            valueString:
              'OBX|1||3002||5|mmol/L|^TECH~^NORM~^CRIT~^USER||||M||||^DMSERV|||c8000^0^MU1#c8000#0#0^1|20230609165618|',
          },
        ],
        identifier: [
          {
            system:
              'http://cdp.roche.com/observation/identifier/customer/obxidentifier',
            value: '20230609165330144938$8685',
          },
        ],
        basedOn: [{ type: 'ServiceRequest' }],
        status: 'final',
        code: {
          coding: [
            {
              system:
                'http://cdp.roche.com/codesystem/infinity/observationcode',
              code: '8685',
              display: '',
            },
            {
              system: 'http://cdp.roche.com/codesystem/cdp/observationcode',
              code: 'AFP',
              display: '甲胎蛋白',
            },
          ],
        },
        subject: { type: 'Patient' },
        encounter: { type: '' },
        effectiveDateTime: '2023-06-09T16:56:16+00:00',
        valueQuantity: { value: 5, comparator: '', unit: 'mmol/L' },
        note: '',
        device: { display: 'Infinity' },
      },
      request: { method: 'POST', url: 'Observation' },
    },
    {
      fullUrl: 'urn:uuid:Observation_20230609165330144938$3001',
      resource: {
        resourceType: 'Observation',
        extension: [
          { url: '', valueString: '' },
          { url: '', valueString: '' },
          {
            url: 'http://cdp.roche.com/observation/extension/x_instrumentModule',
            valueString: 'c8000',
          },
          {
            url: 'https://cdp.roche.com/observation/extension/x_instrumentNo',
            valueString: '1',
          },
          {
            url: 'http://cdp.roche.com/observation/extension/x_testBrand',
            valueString: 'xx',
          },
          {
            url: 'http://cdp.roche.com/observation/extension/x_originalFields',
            valueString:
              'OBX|1||3002||5|mmol/L|^TECH~^NORM~^CRIT~^USER||||M||||^DMSERV|||c8000^0^MU1#c8000#0#0^1|20230609165618|',
          },
        ],
        identifier: [
          {
            system:
              'http://cdp.roche.com/observation/identifier/customer/obxidentifier',
            value: '20230609165330144938$3001',
          },
        ],
        basedOn: [{ type: 'ServiceRequest' }],
        status: 'final',
        code: {
          coding: [
            {
              system:
                'http://cdp.roche.com/codesystem/infinity/observationcode',
              code: '3001',
              display: '',
            },
            {
              system: 'http://cdp.roche.com/codesystem/cdp/observationcode',
              code: 'HE 4',
              display: '人附睾蛋白4',
            },
          ],
        },
        subject: { type: 'Patient' },
        encounter: { type: '' },
        effectiveDateTime: '2023-06-09T16:56:17+00:00',
        valueQuantity: { value: 5, comparator: '', unit: 'mmol/L' },
        note: '',
        device: { display: 'Infinity' },
      },
      request: { method: 'POST', url: 'Observation' },
    },
    {
      fullUrl: 'urn:uuid:Observation_20230609165330144938$3002',
      resource: {
        resourceType: 'Observation',
        extension: [
          { url: '', valueString: '' },
          { url: '', valueString: '' },
          {
            url: 'http://cdp.roche.com/observation/extension/x_instrumentModule',
            valueString: 'c8000',
          },
          {
            url: 'https://cdp.roche.com/observation/extension/x_instrumentNo',
            valueString: '1',
          },
          {
            url: 'http://cdp.roche.com/observation/extension/x_testBrand',
            valueString: 'xx',
          },
          {
            url: 'http://cdp.roche.com/observation/extension/x_originalFields',
            valueString:
              'OBX|1||3002||5|mmol/L|^TECH~^NORM~^CRIT~^USER||||M||||^DMSERV|||c8000^0^MU1#c8000#0#0^1|20230609165618|',
          },
        ],
        identifier: [
          {
            system:
              'http://cdp.roche.com/observation/identifier/customer/obxidentifier',
            value: '20230609165330144938$3002',
          },
        ],
        basedOn: [{ type: 'ServiceRequest' }],
        status: 'final',
        code: {
          coding: [
            {
              system:
                'http://cdp.roche.com/codesystem/infinity/observationcode',
              code: '3002',
              display: '',
            },
            {
              system: 'http://cdp.roche.com/codesystem/cdp/observationcode',
              code: 'CA 125',
              display: '肿瘤相关抗原 125',
            },
          ],
        },
        subject: { type: 'Patient' },
        encounter: { type: '' },
        effectiveDateTime: '2023-06-09T16:56:18+00:00',
        valueQuantity: { value: 5, comparator: '', unit: 'mmol/L' },
        note: '',
        device: { display: 'Infinity' },
      },
      request: { method: 'POST', url: 'Observation' },
    },
    {
      resource: {
        resourceType: 'ServiceRequest',
        extension: [
          {
            url: 'http://cdp.roche.com/servicerequest/extension/x_originalFields',
            valueString:
              '{"SPM":"SPM||0523060947||S1||not|||||P|||^7^^^|||20230609165205||||||||||SC|","SAC":"SAC||||||||||||","TQ1":"TQ1|1||||||||R|","MSH":"MSH|^~\\\\&|cobas 8000||host||20230609165622||OUL^R22|773814||2.5||||NE||UNICODE UTF-8|"}',
          },
        ],
        identifier: [
          { system: '' },
          {
            system:
              'http://cdp.roche.com/servicerequest/identifier/customer/barcode',
            value: '0523060947',
          },
        ],
        status: 'active',
        intent: 'original-order',
        code: {
          coding: [{ system: '', code: '', display: '' }, { system: '' }],
        },
        subject: { type: 'Patient' },
        encounter: { type: 'Encounter' },
        authoredOn: '2023-06-09T16:52:05+00:00',
        requester: { type: '', display: '' },
        specimen: [{ display: '' }],
      },
      request: { method: 'POST', url: 'ServiceRequest' },
    },
    {
      fullUrl: 'urn:uuid:MessageHeader_20230609165330144938',
      resource: {
        resourceType: 'MessageHeader',
        extension: [
          {
            url: 'http://cdp.roche.com/messageheader/extension/x_messageDateTime',
            valueDateTime: '2023-06-09T16:56:22+00:00',
          },
          {
            url: 'http://cdp.roche.com/messageheader/extension/x_messageControlId',
            valueString: '20230609165330144938',
          },
        ],
        eventCoding: {
          system: 'http://terminology.hl7.org/CodeSystem/v2-0003',
          code: 'R01',
          display:
            'ORU/ACK - Unsolicited transmission of an observation message',
        },
        destination: [
          { name: 'LIS', target: { display: 'host' }, endpoint: 'http://LIS' },
        ],
        source: {
          name: 'Infinity',
          software: 'Instrument02',
          endpoint: 'http://Infinity',
        },
      },
      request: { method: 'POST', url: 'MessageHeader' },
    },
  ],
};

describe('extractDHData function', () => {
  it('should correctly extract data from DHData', () => {
    // Define the input data
    const dhData: DHObservation = providedDHData; // your DHData JSON here

    // Define the expected output
    const expectedResult: ExtractedObservation = {
      Observation: [
        {
          codeMachine: '8685',
          code: 'AFP',
          value: 5,
          unit: 'mmol/L',
          effectiveDateTime: '2023-06-09T16:56:16+00:00',
        },
        {
          codeMachine: '3001',
          code: 'HE 4',
          value: 5,
          unit: 'mmol/L',
          effectiveDateTime: '2023-06-09T16:56:17+00:00',
        },
        {
          codeMachine: '3002',
          code: 'CA 125',
          value: 5,
          unit: 'mmol/L',
          effectiveDateTime: '2023-06-09T16:56:18+00:00',
        },
      ],
      Patient: {
        name: 'Test47',
        gender: 'female',
        birthDate: '1991-01-01',
      },
      ServiceRequest: {
        orderId: '0523060947',
      },
    }; // define the expected result here

    // Call the function with the input data
    const result = extractDHObservation(dhData);

    // Assert that the result matches the expected result
    expect(result).toEqual(expectedResult);
  });
});
