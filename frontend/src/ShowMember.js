import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowMember() {
    const [members, setMembers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [showPass, setShowPass] = useState(false);
    const [curHover, setCurHover] = useState(-1);

    useEffect(() => {getMembers();}, []);

    const getMembers = async () => {
        const response = await axios.get("http://localhost:5000/members");
        setMembers(response.data);
    }

    const deleteMember = async (id) => {
        await axios.delete("http://localhost:5000/members/" + id);
        getMembers();
    }
                                                
    function deleteMembers() {
        selected.map(id => (deleteMember(id)));
        setSelected([]);
    }

    // handle selected members
    function handleSelect(checked, id) {
        var newSelected= [...selected];
        if (checked) {
            newSelected.push(id);
            setSelected(newSelected);
        } else {
            const index = newSelected.indexOf(id);
            if (index > -1) {
                newSelected.splice(index, 1);
            }
            setSelected(newSelected);
        }
    }   

    return (
        <div>
            {(selected.length > 0) && 
            (<div className="column is-flex is-align-items-center mt-5">
                <label className="label mt-1 mr-3">{selected.length} selected</label>
                <button className="button is-danger mr-3" onClick={deleteMembers}>Delete Selected</button>
                {(selected.length === 1) && <Link className="button is-info" to={"/edit/" + selected[0]}>Edit</Link>}
            </div>)}
            {(selected.length === 0) && 
            (<div className="column is-flex is-align-items-center mt-5">
                {showPass && <button className="button is-danger mr-3" onClick={e => setShowPass(false)}>Hide Password</button>}
                {!showPass && <button className="button is-danger mr-3" onClick={e => setShowPass(true)}>Show Password</button>}
                <Link className="button is-primary" to="/add">Add New</Link>
            </div>)}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>User Id</th>
                        {showPass && <th>Password</th>}
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>&emsp;</th>
                    </tr>
                </thead>
                <tbody>
                    { members.map((member) => (
                        <tr key={ member.id } onMouseEnter={e => setCurHover(member.id)} onMouseLeave={e => setCurHover(-1)} >
                            <td>{ member.userid }</td>
                            {showPass && <td>{ member.password }</td>}
                            <td>{ member.name }</td>
                            <td>{ member.age }</td>
                            <td>{ member.phone_num }</td>
                            <td>
                                {(curHover === member.id || selected.length > 0) && 
                                (<input type="checkbox" checked={selected.includes(member.id)} onChange={e => handleSelect(e.target.checked, member.id)}></input>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}