import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useContext } from "react";
import { ContextUser } from "./contextUser.jsx";
const SignUp = () => {
    const {setUser} = useContext(ContextUser);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "USER"
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4001/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log("Token from server:", token);

        const decoded = jwtDecode(data.token);
        setUser({token:data.token, ...decoded});
        localStorage.setItem("currentToken", data.token);
    };
    const setForm = (data) => {
        setFormData({ ...formData, [data.name]: data.value });
    }
    return (
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" type="text" name="username" required onChange={(e) => setForm(e.target)}/>
                <br />
                <input placeholder="Password" type="password" name="password" required onChange={(e) => setForm(e.target)}/>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
