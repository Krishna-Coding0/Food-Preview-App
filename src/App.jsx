import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Homepage from './Componets/Homepage';
import FoodCategories from './Componets/FoodCategories';
import Searchbutton from './Componets/Searchbutton';
import Foodinfo from './Componets/Foodinfo';
import Favoritepage from './Componets/Favoritepage';
import Layout from './Componets/Layout';
import ErrorElement from './Componets/ErrorElement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement:<ErrorElement />,
    children: [
      { index:true, element: <Homepage /> },
      { path: '/foodcategory', element: <FoodCategories /> },
      { path: '/searchpage', element: <Searchbutton /> },
      { path: '/foodinfo', element: <Foodinfo /> },
      { path: '/favoritepage', element: <Favoritepage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
