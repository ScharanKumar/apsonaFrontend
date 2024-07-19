import {Switch,Route} from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Archieve from "./components/Archieve"
import Bin from "./components/Bin"


const App=()=>{
  return(
  
       <Switch>
        <ProtectedRoute exact path="/" component={Home}/>
        <ProtectedRoute exact path="/archieve" component={Archieve}/>
        <ProtectedRoute exact path="/bin" component={Bin}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
       </Switch>
  
  )
}

export default App;
