import './App.css';
import { Route } from "react-router-dom";
import task from './component/task';
import { Switch, BrowserRouter } from "react-router-dom";




function App() {



    return (
        <>
            <BrowserRouter>

            <Switch>
        

     
                <Route exact path="/" component={task} />
                </Switch>
            </BrowserRouter>
            </>
          
              
  );
}

export default App;
