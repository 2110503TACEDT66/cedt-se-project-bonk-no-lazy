'use client'

import { TextField,Button } from "@mui/material"
import { useState } from "react";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import registerUser from "@/libs/registerUser";

export default function Register(){
    
    const dispatch = useDispatch<AppDispatch>();

    const [fname, setFName] = useState('');
    const [lastname, setLastname] = useState('');
    const [citizenID, setCitizenID] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
  

    const register = () => {
        if (fname && lastname && citizenID && email && tel && password) {
            const item:any = {
                _id: citizenID,
                name: fname + ' ' + lastname,
                tel: tel,
                email: email,
                role: 'user',
                password: password
            }
            registerUser(item).then( () => {
                alert('Registration successful');
                setFName('');
                setLastname('');
                setCitizenID('');
                setEmail('');
                setTel('');
                setPassword('');
            }).catch( (error:Error) => {
                console.error("Registration failed", error)
                alert('Registration failed');
            })
        }
    }

    return (
        <main className="w-[100%] flex flex-col items-center space-y-10">
            <div className="bg-blue-200 p-10 rounded-lg ring-2 items-center flex flex-col my-20">
                <div className="text-2xl font-medium underline text-center text-blue-700 transition transform duration-150 hover:text-blue-900">
                    Register
                </div>
                <div className="table-auto border-separate border-spacing-10">
                    <table className="p-10">
                        <tbody>
                            <tr>
                                <td className="px-20 py-2">
                                    <TextField
                                        variant="standard"
                                        name="Name"
                                        label="Name"
                                        value={fname}
                                        onChange={(e) => setFName(e.target.value)}
                                    />
                                </td>
                                <td className="px-20 py-2">
                                    <TextField
                                        variant="standard"
                                        name="Surname"
                                        label="Surname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="px-20 py-2">
                                    <TextField
                                        variant="standard"
                                        name="Email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                                <td className="px-20 py-2">
                                    <TextField
                                        variant="standard"
                                        name="Tel"
                                        label="Telephone Number"
                                        value={tel}
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="px-20 py-2">
                                    <TextField
                                        variant="standard"
                                        name="Citizen ID"
                                        label="Citizen ID"
                                        value={citizenID}
                                        onChange={(e) => setCitizenID(e.target.value)}
                                    />
                                </td>
                                <td className="px-20 py-2">
                                    <TextField
                                        variant="standard"
                                        type="password"
                                        name="Password"
                                        label="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Button
                    onClick={register}
                    className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full align-left">
                    Register
                </Button>
            </div>
        </main>
    );
}