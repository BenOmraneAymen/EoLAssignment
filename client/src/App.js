import './App.css';
import DashboardScreen from './screens/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/login';
import BottleScreen from './components/bottle';
import ProcessScreen from './components/process';
import CalculateScreen from './components/caculate';
import ProcessFlow from './components/processFlow';
import ProcessDiagram from './components/processDiagram';
import BottleComparison from './components/bottleComparison';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard/bottle" element={<DashboardScreen >
          <BottleScreen title={"PET"} />
          <BottleScreen title={"GLASS"} />
          <div className="h-28"></div>
        </DashboardScreen>} />
        <Route path="/dashboard/process" element={<DashboardScreen >
          <ProcessScreen title={"PET"} />
          <ProcessScreen title={"GLASS"} />
          <div className="h-28"></div>
        </DashboardScreen>} />
        <Route path="/dashboard/calculator" element={<DashboardScreen >
          <CalculateScreen />
          <div className="h-28"></div>
        </DashboardScreen>} />
        <Route path="/dashboard/processFlow" element={<>
          <ProcessFlow />
          <div className="h-28"></div>
        </>} />
        <Route path="/dashboard/compare" element={<DashboardScreen>
          <BottleComparison />
          <div className="h-28"></div>
        </DashboardScreen>}
        />
      </Routes>
    </Router>
  );
}

export default App;
