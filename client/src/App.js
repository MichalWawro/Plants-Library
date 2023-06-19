import { useRef } from 'react';
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

function App() {

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
          <Route path={PAGES.current.SEARCH} element={<h1>Test3</h1>} />
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
