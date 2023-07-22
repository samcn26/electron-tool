export type DHObservation = {
  entry: Array<{
    resource: {
      resourceType: string;
      [key: string]: any; // This represents the dynamic structure of the resource object
    };
  }>;
};

export type Observation = {
  codeMachine: string;
  code: string;
  value: number;
  unit: string;
  effectiveDateTime: string;
};

export type Patient = {
  name: string;
  gender: string;
  birthDate: string;
};

export type ServiceRequest = {
  orderId: string;
};

export type ExtractedObservation = {
  [key: string]: Array<Observation> | Patient | ServiceRequest;
};

export type Content = Observation | Patient | ServiceRequest;
