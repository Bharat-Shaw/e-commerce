import { useEffect } from 'react'
import './App.css'
import Allrouter from './Router/Allrouter'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  const store = useSelector(state => state);
  const user = useSelector(val => val.IsAuth);
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!user.name) {
  //     navigate('/login')
  //   }
  // }, [user])

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

  return (
    <>
      <Navbar />
      <Allrouter />
    </>
  )
}

export default App
