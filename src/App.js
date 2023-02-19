import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/movie/:id',
    element: <Detail />,
  },
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
