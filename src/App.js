import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { Login, Error, Books} from './views'

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

]);

function App() {

  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
