import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddMember() {
    const [userid, setUserid] =  useState('');
    const [password, setPassword] =  useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name , setName] = useState('');
    const [age, setAge] = useState(0);
    const [phoneNum, setPhoneNum] = useState('');
    const navigate = useNavigate();
    
    // add member and check input constraints
    const addMember = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setPassword("");
            setConfirmPassword("");
            navigate("/add");
        } else if (userid.length > 20) {
            alert("User ID is too long (over 20 characters)");
            setUserid("");
            navigate("/add");
        } else if (password.length > 20) {
            alert("Password is too long (over 20 characters)");
            setPassword("");
            setConfirmPassword("");
            navigate("/add");
        } else if (name.length > 20) {
            alert("Name is too long (over 20 characters)");
            setName("");
            navigate("/add");
        } else if (age < 0) {
            alert("Invalid Age");
            setAge(0);
            navigate("/add");
        } else if (phoneNum.length > 10) {
            alert("Invalid Phone Number (over 10 characters)");
            setPhoneNum("");
            navigate("/add");
        } else {
            await axios.post("http://localhost:5000/members",{
                userid: userid,
                password: password,
                name: name,
                age: age,
                phone_num: phoneNum
            });
            navigate("/");
        }
    }

    return (
        <div>   
            <form onSubmit={ addMember }>
                <div className="field mt-5">
                    <label className="label">User ID: </label>
                    <input className="input" type="text" placeholder="User ID" value={ userid } onChange = {e => setUserid(e.target.value) }></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Password: </label>
                    <input className="input" type="password" placeholder="Password" value={ password } onChange = {e => setPassword(e.target.value)} ></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Confirm Password: </label>
                    <input className="input" type="password" placeholder="Confirm Password" value={ confirmPassword } onChange = {e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Name: </label>
                    <input className="input" type="text" placeholder="Name" value={ name } onChange = {e => setName(e.target.value) }></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Age: </label>
                    <input className="input" type="number" placeholder="Age" value={ age } onChange = {e => setAge(e.target.value) }></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Phone Number: </label>
                    <input className="input" type="text" placeholder="Phone Number" value={ phoneNum } onChange = {e => setPhoneNum(e.target.value) }></input>
                </div>
                <div>
                    <input className="button is-primary mt-5" type="submit" />
                    <button className="button is-danger ml-3 mt-5" onClick={e => navigate("/")}>Back</button>
                </div>
            </form>
        </div>
    )
}
