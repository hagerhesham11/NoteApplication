import './App.css';
import Layout from './components/Layout/Layout.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Notes from './components/Notes/Notes.jsx';
import NotFound from './components/NotFound/NotFound.jsx'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';

function App() {
   const router = createHashRouter([
    {path:'/',element:<Layout/>,children:[
      {path:'/',element:<ProtectedRoutes><Notes/></ProtectedRoutes>},
      {path:'/signup',element:<Register/>},
      {path:'/login',element:<Login/>},
      {path:'*',element:<NotFound/>}
    ]}
   ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
