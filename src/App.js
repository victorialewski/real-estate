import './App.css';

import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SowPage from './components/SowPage';

function App() {
  return (
    <div className="App">
<Router>
    <Routes>
    <Route path='/real-estate' element={<SowPage />} />
    </Routes>
     </Router>

    </div>
    
  );
}

export default App;
