import {React,useEffect} from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Tab from "./components/Tab";
import {fetchSingleUser} from "./store/userSlice"
import { useDispatch } from 'react-redux';
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUser());
  }, [dispatch]);
  return (
    <div>
      <Header/>
      <Tab/>
      <BottomNav/>
    </div>
  );
};

export default App;
