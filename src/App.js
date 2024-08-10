
import './App.css';
import { Header, Footer } from './components/';
import { AllRoutes } from './routes/AllRoutes';
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  return (
    <div className="App dark:bg-slate-900	">
      <Header ></Header >
      <AllRoutes />
      <Footer ></Footer >
      
    </div>
  );
}

export default App;

