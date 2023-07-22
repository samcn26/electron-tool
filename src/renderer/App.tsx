/* eslint-disable react/button-has-type */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<span>TODO</span>} />
      </Routes>
    </Router>
  );
}
