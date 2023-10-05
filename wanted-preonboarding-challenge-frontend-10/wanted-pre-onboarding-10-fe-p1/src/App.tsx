import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginWithMockAPI from './pages/LoginWithMockAPI'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginWithMockAPI/>,
  },
]);

function App() {
  return (
    <div className="content">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
