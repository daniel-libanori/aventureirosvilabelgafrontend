import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { Login, Error, Books, Chapters, ChapterEdit} from './views'
import { GlobalProvider } from "./context/globalState";
import { GlobalUserProvider } from "./context/userState";

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
    path: "/:bookId/chapters",
    element: <Chapters/>,
    errorElement: <Error/>
  },
  {
    path: "/:bookId/chapters/:chapterId",
    element: <ChapterEdit/>,
    errorElement: <Error/>
  }

]);

function App() {

  return (
    <>
      <GlobalProvider>
        <GlobalUserProvider>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </GlobalUserProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
