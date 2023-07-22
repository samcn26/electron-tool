/* eslint-disable react/button-has-type */
import { MemoryRouter as Router } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';

export default function App() {
  return (
    <Router>
      <DefaultLayout />
    </Router>
  );
}
