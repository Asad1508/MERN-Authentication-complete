import Layout from './component/pages/layout';
import Home from './component/pages/Home';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import './App.css';
import Contact from './component/pages/Contact';
import Loginreg from './component/pages/auth/Loginreg';
import Sendpassresetemail from './component/pages/auth/sendpassresetemail';
import Resetpassword from './component/pages/auth/Resetpassword';
import Dashboard from './component/pages/Dashboard';
import { useSelector } from 'react-redux';
// function App() {
//   //isme jo auth likha wo store me ha
//   const {token}=useSelector(state=> state.auth)
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Layout/>}>
//       <Route path='/' element={<Home/>}/>
//       <Route path='contact' element={<Contact/>}/>
//       {/* isme condition lagai k token ha tu login dikhao wrna token ha tu dahsboard dikhao  */}
//       <Route path='login' element={!token ?<Loginreg/>: <Navigate to="/dashboard"/>}/>
//       {/* <Route path='login' element={ <Loginreg/>}/> */}
//       <Route path='Sendpassresetemail' element={<Sendpassresetemail/>}/>
//       <Route path='api/user/reset/:id/:token' element={<Resetpassword/>}/>
//       </Route>

//       {/* <Route path='dashboard' element={ <Dashboard/>}/> */}
//       <Route path='dashboard' element={token ? <Dashboard/>:<Navigate to="/login"/>}/>



//     </Routes>
//     </BrowserRouter>
//     </>
//   );
// }
function App() {
  //yaha token lia takay route ko secure kia ja sky aur isme jo auth likha wo 
  const { token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            {/* <Route path="login" element={ <Loginreg /> } /> */}
            <Route path="login" element={!token ? <Loginreg /> : <Navigate to="/dashboard" />} />
            <Route path="Sendpassresetemail" element={<Sendpassresetemail />} />
            <Route path="api/user/reset/:id/:token" element={<Resetpassword />} />
          
          </Route>
          {/* <Route path="/dashboard" element={<Dashboard /> } /> */}
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
