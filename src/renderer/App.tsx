/* eslint-disable react/button-has-type */
import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import obxData from './test/obxData.json';
import { extractDHObservation } from './utils';
import DHDataConverter from './components/DHDataCoverter';

function Test() {
  useEffect(() => {
    window.electron.ipcRenderer.on('api', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
    });
  }, []);
  const handleCreate = () => {
    window.electron.ipcRenderer.sendMessage('api', {
      type: 'create',
      db: 'Observation',
      data: extractDHObservation(obxData),
    });
  };
  const handleReade = () => {
    window.electron.ipcRenderer.sendMessage('api', {
      type: 'read',
      db: 'Observation',
      query: { 'ServiceRequest.orderId': '0523060947' },
    });
  };

  return (
    <>
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleReade}>Read</button>
      <DHDataConverter type="Observation" />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </Router>
  );
}
