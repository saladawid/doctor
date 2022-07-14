
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomeScreen} from './screens/HomeScreen';
import {PatientAddScreen} from './screens/PatientAddScreen';
import {PatientsScreen} from './screens/PatientsScreen';
import {PatientScreen} from './screens/PatientScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {LoginScreen} from './screens/LoginScreen';
import {createContext, useState} from 'react';
import {UserProfileScreen} from './screens/UserProfileScreen';
import {TestScreen} from './screens/TestScreen';
import {PatientTestResultScreen} from './screens/PatientTestResultScreen';
import {Header} from './components/Header';

export const UserContext = createContext(null);


function App() {
    const [userLog, setUserLog] = useState(false);

    return (
        <UserContext.Provider value={{userLog, setUserLog}}>
            <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomeScreen/>}/>
                        <Route path="/patients" element={<PatientsScreen/>}/>
                        <Route path="/patients/:id" element={<PatientScreen/>}/>
                        <Route path="/add-patient" element={<PatientAddScreen/>}/>
                        <Route path="/register" element={<RegisterScreen/>}/>
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path="/profile" element={<UserProfileScreen/>}/>
                        <Route path="patients/:id/test" element={<TestScreen/>}/>
                        <Route path="patients/:id/tests-results" element={<PatientTestResultScreen/>}/>
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
