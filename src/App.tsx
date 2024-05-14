import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Favrotes from './pages/Favrotes';
import SingleGift from './pages/SingleGift';
import Category from './pages/Category';
import GiftProvider from './context/gif-context';

const App = () => {
  const router = createBrowserRouter([
    {      
      element:<AppLayout/>,
      children:[
        {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/search/:qurey",
        element:<Search/>,
      },
      {
        path:"/faverotes",
        element:<Favrotes/>,
      },
      {
        path: "/:type/:slug",
        element:<SingleGift/>,
      },      
      {
        path:"/:category",
        element:<Category/>,
      },
    ]
    },    
  ]);
  return (
    <GiftProvider>
    <RouterProvider router={router} />
    </GiftProvider>
  )
}

export default App
