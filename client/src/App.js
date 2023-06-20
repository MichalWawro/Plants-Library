import { useRef, useState, useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Searchpage from './components/Searchpage';


function App() {

  const [myPlants, setMyPlants] = useState([])

  const PAGES = useRef({
    HOME: "/home",
    MYPLANTS: "/myplants",
    SEARCH: "/search",
    PROFILE: "/profile"
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={
          <>
            <header>
              <Navbar PAGES={PAGES}/>
            </header>
            <main>
              <Outlet />
            </main>
          </>
        }>
          <Route path={PAGES.current.HOME} element={<h1>Test</h1>} />
          <Route path={PAGES.current.SEARCH} element={<Searchpage setMyPlants={setMyPlants} myPlants={myPlants}/>}/>
          <Route path={PAGES.current.MYPLANTS} element={<h2>Test2</h2>} />
          <Route path={PAGES.current.PROFILE} element={<h2>Test4</h2>} />
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
