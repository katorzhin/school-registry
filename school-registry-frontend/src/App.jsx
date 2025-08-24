import './App.css'
import SchoolTable from "./components/schoolTable/SchoolTable.jsx";
import Header from "./layout/header/Header.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import RegisterForm from "./components/forms/registerForm/RegisterForm.jsx";
import LoginForm from "./components/forms/loginForm/LoginForm.jsx";
import {useState} from "react";
import ToastNotifications from "@/components/ToastNotifications/ToastNotifications.jsx";

function App() {
    const { token } = useAuth();
    const [registerOpen, setRegisterOpen] = useState(false);

    return (
        <div>
            <Header />
            {token ? (
                <SchoolTable />
            ) : (
                <>
                    <LoginForm onOpenRegister={() => setRegisterOpen(true)} />
                    <RegisterForm open={registerOpen} onClose={() => setRegisterOpen(false)} />
                </>
            )}
            <ToastNotifications />
        </div>
    );
}

export default App
