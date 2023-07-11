import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { Login, Error, Books, Chapters} from './views'
import { GlobalProvider } from "./context/globalState";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <Error/>,
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <Error/>,
  },
  {
    path: "/books",
    element: <Books/>,
    errorElement: <Error/>,
  },
  {
    path: "/chapters",
    element: <Chapters/>,
    errorElement: <Error/>
  }

]);

function App() {

  return (
    <>
      <GlobalProvider>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
