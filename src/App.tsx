import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import HomePage from './Component/ClassComponent/HomePage';
import ClassPage from './Component/ClassComponent/ClassPage';
import List from './Component/StudentComponent/List';
import AddnewStudent from './Component/StudentComponent/AddStudent';
import ListAccount from './Component/AccountComponent/List';
import { LogOut } from './Component/LogOut/LogOut';
import AddCcount from './Component/AccountComponent/AddCcount';
import { Demo } from './Component/Hook/Hook';
import StudentList from './Component/StudentComponent/StudentList';
import FileClass from './Component/URL/Demoxx';
/**
 * 
 * @author DuongDT 19
 * 
 * @version 1.0
 * 
 * @Date 2/6/2021
 * 
 * 
 * Modification Logs:
 * 
 * Date				AUTHOR 				DESCRIPTION
 * ------------------------------------------------------
 * 2/6/2021			DuongDT19			Create
 *
 */
function App() {
  return (
    <Router>
    <div className="App">
        <Route path="/" exact component={HomePage} />
        <Route path="/addnew" exact component={ClassPage} />
        <Route path="/update/:id" exact component={ClassPage}/>
        <Route path="/listStudent" exact component={List} />
        <Route path="/addstudent" exact component={AddnewStudent} />
        <Route path="/updateStudent/:id" exact component={AddnewStudent}/>
        <Route path="/ListAccount" exact component={ListAccount}/>
        <Route path="/Logout" exact component={LogOut}/>
        <Route path="/AddCcount" exact component={AddCcount}/>
        <Route path="/EditAcount/:id" exact component={AddCcount}/>
        <Route path="/uploadFileClass" exact component ={FileClass}/>
        <Route path="/demohook" exact component={Demo}/>
        <Route path="/ListSudentByIDClass/:malop" exact component={StudentList}/>
    </div>
    </Router>
  );
}

export default App;
