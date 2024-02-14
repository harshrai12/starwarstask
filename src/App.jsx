import { useState } from 'react'
import './App.css'
import UserList from './components/UserList'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col items-center justify-center">
   
    <UserList/>
    </div>
    </>
  )
}

export default App
