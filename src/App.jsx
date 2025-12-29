import React, { useState } from 'react';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Report from './pages/Report';

// Simple Router handling state
function App() {
  const [view, setView] = useState('home'); // home, assessment, report
  const [profile, setProfile] = useState(null);

  const startAssessment = () => setView('assessment');

  const completeAssessment = (data) => {
    setProfile(data);
    setView('report');
  };

  const reset = () => {
    setProfile(null);
    setView('home');
  };

  return (
    <>
      {view === 'home' && <Home onStart={startAssessment} />}
      {view === 'assessment' && <Assessment onComplete={completeAssessment} />}
      {view === 'report' && profile && <Report profile={profile} onReset={reset} />}
    </>
  );
}

export default App;
