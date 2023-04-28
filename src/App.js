import logo from './logo.svg';
import './App.css';
import ContainerComponent from './Components/Container';
import { useEffect } from 'react';

function App() {

  useEffect(()=> {
    let subscribed = true;
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if(subscribed){
        console.log(res.json())
      }
    });
       return () => {
        subscribed = false;
       };
  }, []);
  return (
    <div className="App">
     <ContainerComponent/>
    </div>
  );
}

export default App;
