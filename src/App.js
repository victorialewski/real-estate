import './App.css';

import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/NavBar/Navbar';
import SowLeft from './components/Calculations/SowLeft';
import SowPage from './components/SowPage';
// import Investment from './components/ARV/Investment';
// import ArvCalculator from './components/ARV/Arv';
// import Rehab from './components/Rehab/Rehab';

// import ContactPage from './components/Contact/ContactPage';

function App() {
  return (
    <div className="App">

{/* <Navbar></Navbar> */}
<Router>
    <Routes>

      <Route path='/' element={<SowPage/>}/>
      <Route path='/test' element={<SowLeft/>} />
      {/* <Route path='/arv' element={<ArvCalculator/>} />
      <Route path='/rehab' element={<Rehab/>} /> */}



    </Routes>
     </Router>



    </div>
    
  );
}

export default App;
