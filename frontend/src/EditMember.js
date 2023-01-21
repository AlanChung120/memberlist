import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMember() {
    const [userid, setUserid] =  useState('');
    const [password, setPassword] =  useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name , setName] = useState('');
    const [age, setAge] = useState(0);
    const [phoneNum, setPhoneNum] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    
    // update member and check input constraints
    const updateMember = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setPassword("");
            setConfirmPassword("");
            navigate("/edit/" + id);
        } else if (userid.length > 20) {
            alert("User ID is too long (over 20 characters)");
            setUserid("");
            navigate("/edit/" + id);
        } else if (password.length > 20) {
            alert("Password is too long (over 20 characters)");
            setPassword("");
            setConfirmPassword("");
            navigate("/edit/" + id);
        } else if (name.length > 20) {
            alert("Name is too long (over 20 characters)");
            setName("");
            navigate("/edit/" + id);
        } else if (age < 0) {
            alert("Invalid Age");
            setAge(0);
            navigate("/edit/" + id);
        } else if (phoneNum.length > 10) {
            alert("Invalid Phone Number (over 10 characters)");
            setPhoneNum("");
            navigate("/edit/" + id);
        } else {
            await axios.patch("http://localhost:5000/members/" + id,{
                userid: userid,
                password: password,
                name: name,
                age: age,
                phone_num: phoneNum
            });
            navigate("/");
        }
    }

    // get previous values
    const getMemberById = useCallback(async () => {
        const response = await axios.get("http://localhost:5000/members/" + id);
        setUserid(response.data.userid);
        setPassword(response.data.password);
        setConfirmPassword(response.data.password);
        setName(response.data.name);
        setAge(response.data.age);
        setPhoneNum(response.data.phone_num);
    }, [id]);

    useEffect(() => { getMemberById();}, [getMemberById]);

    
    return (
        <div>   
            <form onSubmit={ updateMember }>
                <div className="field mt-5">
                    <label className="label">User ID: </label>
                    <input className="input" type="text" value={ userid } onChange = {e => setUserid(e.target.value) }></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Password: </label>
                    <input className="input" type="password" value={ password } onChange = {e => setPassword(e.target.value)}></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Confirm Password: </label>
                    <input className="input" type="password" value={ confirmPassword } onChange = {e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Name: </label>
                    <input className="input" type="text" value={ name } onChange = {e => setName(e.target.value) }></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Age: </label>
                    <input className="input" type="number" value={ age } onChange = {e => setAge(e.target.value) }></input>
                </div>
                <div className="field mt-5">
                    <label className="label">Phone Number: </label>
                    <input className="input" type="text" value={ phoneNum } onChange = {e => setPhoneNum(e.target.value) }></input>
                </div>
                <div>
                    <input className="button is-primary mt-5" type="submit" />
                    <button className="button is-danger ml-3 mt-5" onClick={e => navigate("/")}>Back</button>
                </div>
            </form>
        </div>
    )
}
