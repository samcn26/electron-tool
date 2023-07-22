// dhdata,
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import ReactJson from 'react-json-view';
import { get } from 'lodash';
import { extractDHObservation } from '../../utils';

type ExtractDHObservationType = typeof extractDHObservation;

interface Props {
  type: 'Observation' | 'Order';
  // other pending
  // dhData?: any;
  // onClick?: () => any;
}

const DHDataConverter: React.FC<Props> = ({ type = 'Observation' }) => {
  const [origin, setOrigin] = useState<any>('');
  const [result, setResult] = useState<any>({});
  const extractFunc = useRef<ExtractDHObservationType | null>(null);

  const isDhObservation = (data: string): boolean => {
    const d = data ? JSON.parse(data) : {};
    const entry = get(d, 'entry[0]', {});
    return typeof entry.resource === 'object';
  };

  useEffect(() => {
    if (type === 'Observation') {
      extractFunc.current = extractDHObservation;
    }
  }, [type]);

  useEffect(() => {
    if (isDhObservation(origin) && extractFunc.current) {
      setResult(extractFunc.current(JSON.parse(origin)));
    } else {
      setResult({});
    }
  }, [origin]);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      if (!event.target.value) return setOrigin('');
      // const newJson = JSON.parse(event.target.value);
      // JSON.stringify(origin, null, 2)
      JSON.parse(event.target.value);
      setOrigin(event.target.value);
    } catch (error) {
      setResult({});
      // Handle JSON parsing error
      console.error('Invalid JSON');
    }
  };

  return (
    <div>
      <p>{type}</p>
      <textarea
        value={origin}
        onChange={handleTextareaChange}
        rows={10}
        cols={50}
      />
      <ReactJson src={result} displayDataTypes={false} />
    </div>
  );
};

export default DHDataConverter;
