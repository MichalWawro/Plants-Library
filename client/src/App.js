import { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';

import './App.css';
import PAGES from './constants/enums';

//components
import Navbar from './components/NavBar/NavBar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import PlantPage from './components/PlantPage/PlantPage';
import SearchPage from './components/SearchPage/SearchPage';
import MyPlantsPage from './components/MyPlantsPage/MyPlantsPage';
import HomePageLoggedOut from './components/HomePage/HomePageLoggedOut';


function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={
          <>
            <header>
              <Navbar
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
          <Route index element={<HomePageLoggedOut />}/>
          {isUserLogedIn &&
            <>
              <Route path={PAGES.SEARCH} element={
                <SearchPage profileDetails={profileDetails} />}
              />
              <Route path={PAGES.MYPLANTS} element={
                <MyPlantsPage
                  setProfileDetails={setProfileDetails}
                  profileDetails={profileDetails} />}
              />
              <Route path={PAGES.PLANT} element={<PlantPage userId={profileDetails[0].userId} />} />
            </>

          }
          <Route path={PAGES.REGISTER}
            element={
              <RegisterPage
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
