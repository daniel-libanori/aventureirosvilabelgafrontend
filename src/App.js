import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import {
  Login,
  Error,
  Books,
  Chapters,
  ChapterEdit,
  AddMap,
  Chapter,
  AddEnemy,
} from "./views";
import { GlobalProvider } from "./context/globalState";
import { GlobalUserProvider } from "./context/userState";
// import MyDocument from "./views/pdf/pdf";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: <Books />,
    errorElement: <Error />,
  },
  {
    path: "/:bookId/chapters",
    element: <Chapters />,
    errorElement: <Error />,
  },
  {
    path: "/:bookId/chapters/:chapterId/edit",
    element: <ChapterEdit />,
    errorElement: <Error />,
  },
  {
    path: "/admin/addMap",
    element: <AddMap />,
    errorElement: <Error />,
  },
  {
    path: "/admin/addEnemy",
    element: <AddEnemy />,
    errorElement: <Error />,
  },
  {
    path: "/:bookId/chapters/:chapterId",
    element: <Chapter />,
    errorElement: <Error />,
  },
  // {
  //   path: "/pdf",
  //   element: <MyDocument />,
  // },
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
