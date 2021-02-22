import React, {useEffect, useState} from 'react';
import {executeApi} from "./utils";
import {Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";

export function Profile() {
    <div> prikaz za editora ili za pisca</div>
}

export function Register() {
    const [redirect, setRedirect] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        const formData = {
            username: event.target.username.value,
            password: event.target.password.value,
            is_editor: event.target.editor.checked,
            email: event.target.email.value,
        }
        const resp = executeApi("/account/auth/create", "POST", formData)
        resp.then(data => {
            if (data.status === 201) {
                setRedirect(true)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" required placeholder="email" name="email"/><br/>
                <input type="text" required placeholder="username" name="username"/><br/>
                <input type="password" required placeholder="password" name="password"/><br/>
                <label> are you editor</label>
                <input type="checkbox" placeholder="editor?" name="editor"/> <br/>
                <button type="submit"> create</button>
            </form>

            {redirect ? <Redirect push to="/login"/> : null}
        </div>
    )
}

export function Login() {
    const [redirect, setRedirect] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()

        const formData = {
            username: event.target.username.value,
            password: event.target.password.value,

        }
        const resp = executeApi("/account/auth/login", "POST", formData)
        resp.then(data => {
            if (data.status === 200) {
                var decoded = jwt_decode(data.data.access);
                console.log(decoded)
                localStorage.setItem("access", data.data.access)
                localStorage.setItem("isAuth", true)
                localStorage.setItem("refresh", data.data.refresh)
                localStorage.setItem("username", decoded.username)
                localStorage.setItem("isEditor", decoded.is_editor)
                setRedirect(true)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" required placeholder="username" name="username"/><br/>
                <input type="password" required placeholder="password" name="password"/><br/>

                <button type="submit"> login</button>
            </form>
            {redirect ? <Redirect push to="/"/> : null}
        </div>
    )
}
export function Logout() {
    useEffect(()=>{
        localStorage.setItem("isAuth", false)
        localStorage.setItem("access", null)
        localStorage.setItem("access", null)

    },[])
    return (
        <div> you logged out

        </div>
    )
}