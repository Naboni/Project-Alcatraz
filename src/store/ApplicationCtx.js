import {createContext, useState} from "react";
import {useHistory} from "react-router-dom";
//
import cookie from "js-cookie";


const data = cookie.getJSON("currentUser");
console.log(data.user_email);
const AppContext = createContext({
    user: data.user_email,
    login: (email, password) => {},
    logout: () => {}
})

export function AppContextProvider(props) {
    const history = useHistory();
    const [user, setUser] = useState(data.user_email);

    function login(email, password) {
        fetch("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"email": email, "password": password}
            )
            // {"email": "a@a", "password": "pass"}
        }).then((response) => response.json()).then((body) => {
            setUser(body.user_email);
            cookie.set("currentUser", body);
            console.log(body);
        }).then(() => {
            history.replace("/admin")
        }).catch((err) => console.log(err));
    }
    function logout() {
        const refresh_token = cookie.getJSON("currentUser").refresh_token;
        console.log(refresh_token);
        fetch("http://127.0.0.1:5000/auth/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                refresh_token
            )
        }).then((response) => response.json()).then((body) => {
            console.log(body);
        }).catch((err) => console.log(err));
    }
    const context = {
        user,
        login,
        logout
    }

    return <AppContext.Provider value={context}> {
        props.children
    } </AppContext.Provider>
}

export default AppContext;
