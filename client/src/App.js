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


function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [myPlants, setMyPlants] = useState([]);
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
          <Route path={PAGES.current.SEARCH} element={
            <SearchPage
              setMyPlants={setMyPlants}
              myPlants={myPlants} />}
          />
          {isUserLogedIn &&
            <>
              <Route path={PAGES.current.MYPLANTS} element={typeof profileDetails[0] !== 'undefined' ? (
                <MyPlants setMyPlants={setMyPlants} myPlants={myPlants} profilePlants={profileDetails[0].plants} />
              ) : (
                <div>You need to be logged in to see your plants</div>
              )} />
              <Route path={PAGES.current.PROFILE} element={<h2>Test4</h2>} />
            </>
          }
          <Route path={PAGES.current.REGISTER}
            element={
              <RegisterPage
                PAGES={PAGES}
                setIsUserLogedIn={setIsUserLogedIn}
                setProfileDetails={setProfileDetails}
              />} />
          <Route path={PAGES.current.PLANT} element={<PlantPage />} />

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
