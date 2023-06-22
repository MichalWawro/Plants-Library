import { useRef, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
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
import MyPlants from './components/MyPlants/MyPlants';
import HomePage from './components/HomePage/HomePage';
import MyPlantsPage from './components/MyPlantsPage/MyPlantsPage';


function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const PAGES = useRef({
    HOME: "/home",
    MYPLANTS: "/myplants",
    SEARCH: "/search",
    PROFILE: "/profile",
    REGISTER: "/register",
    PLANT: "/plant/:id"
  })
  //profilePlants={profileDetails[0].plants}
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={
          <>
            <header>
              <Navbar
                PAGES={PAGES}
                isUserLogedIn={isUserLogedIn}
                setIsUserLogedIn={setIsUserLogedIn}
                setProfileDetails={setProfileDetails}
              />
            </header>
            <main className='flex-column-center-center'>
              <Outlet />
            </main>
          </>
        }>
          <Route path={PAGES.current.HOME} element={
            <HomePage
              isUserLogedIn={isUserLogedIn}
              profileDetails={profileDetails}
              PAGES={PAGES}
            />} />

          {isUserLogedIn &&
            <>
              <Route path={PAGES.current.SEARCH} element={
                <SearchPage profileDetails={profileDetails} />}
              />
              <Route path={PAGES.current.MYPLANTS} element={
                <MyPlantsPage
                  setProfileDetails={setProfileDetails}
                  profileDetails={profileDetails} />}
              />
              <Route path={PAGES.current.PROFILE} element={<h2>Test4</h2>} />
              <Route path={PAGES.current.PLANT} element={<PlantPage />} />
            </>
            
          }
          <Route path={PAGES.current.REGISTER}
            element={
              <RegisterPage
                PAGES={PAGES}
                setIsUserLogedIn={setIsUserLogedIn}
                setProfileDetails={setProfileDetails}
              />} />

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
