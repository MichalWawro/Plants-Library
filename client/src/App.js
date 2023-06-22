import { useRef, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';

import './App.css';

//components
import Navbar from './components/NavBar/NavBar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import PlantPage from './components/PlantPage/PlantPage';
import SearchPage from './components/SearchPage/SearchPage';


function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [myPlants, setMyPlants] = useState([])

  const PAGES = useRef({
    HOME: "/home",
    MYPLANTS: "/myplants",
    SEARCH: "/search",
    PROFILE: "/profile",
    REGISTER: "/register",
    PLANT: "/plant/:id"
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={
          <>
            <header>
              <Navbar PAGES={PAGES} isUserLogedIn={isUserLogedIn}/>
            </header>
            <main className='flex-column-center-center'>
              <Outlet />
            </main>
          </>
        }>
          <Route path={PAGES.current.HOME} element={<h1>Test</h1>} />
          <Route path={PAGES.current.SEARCH} element={<SearchPage setMyPlants={setMyPlants} myPlants={myPlants}/>}/>
          <Route path={PAGES.current.MYPLANTS} element={<h2>Test2</h2>} />
          <Route path={PAGES.current.PROFILE} element={<h2>Test4</h2>} />
          <Route path={PAGES.current.REGISTER} element={<RegisterPage PAGES={PAGES} setIsUserLogedIn={setIsUserLogedIn}/>} />
          <Route path={PAGES.current.PLANT} element={<PlantPage/>}/>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
