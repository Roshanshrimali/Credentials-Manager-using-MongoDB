import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ id: uuidv4(), site: "", username: "", password: ""});
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () =>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords);
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/eye-stroke-rounded.svg")) {
      ref.current.src = "/view-off-stroke-rounded.svg";
      passwordRef.current.type = "text"
    } else {
      ref.current.src = "/eye-stroke-rounded.svg";
      passwordRef.current.type = "password"
    }
  };

  const savePassword = async () => {
    if(form.site.length>3 && form.username.length > 3 && form.password.length > 3 ){

    await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})

    setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
    await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})

    setForm({ site: "", username: "", password: "" }); // Reset form fields to empty values
    toast.success('Password added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  }
  else{
    toast.error('Error: Please Enter Valid Properties!')
  }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
    }
  };

  const editPassword = (id) => {
    setForm({...passwordArray.filter(i=>i.id===id)[0], id: id});
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text)=>{
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      })      
    navigator.clipboard.writeText(text)
  }

  return (
    <main className="w-full">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition= "Bounce"/>
          {/* Same as */}
        <ToastContainer />
      <div className="phone:w-[100%] tab:w-[90%] mx-auto bg-cyan-50 min-h-[75vh] py-4 phone:px-2 tab:px-6 my-4 rounded-xl">
        <div className="flex flex-col logoText my-6">
          <h1 className="text-xl text-center font-bold">
            <span className="text-cyan-800">&lt;</span>Keep
            <span className="text-cyan-900">Secret/&gt;</span>
          </h1>
          <p className="text-base font-semibold text-cyan-900 text-center">Your Passwords, Your Peace of Mind</p>
        </div>
        <div className="flex flex-col addPassword w-full gap-6 items-center">
          <input value={form.site} onChange={handleChange} placeholder="Enter Website URL" className="rounded-full border border-cyan-900 px-2 py-1 w-full" type="text" name="site" id="site"/>
          <div className="flex w-full gap-4 justify-between">
            <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-cyan-900 px-2 py-1 w-full" type="text" name="username" id="username"/>
            <div className="relative z-9">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-cyan-900 px-2 py-1 w-full" type="password" name="password" id="password"/>
              <span className="absolute right-1 top-1 cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={26} src="/eye-stroke-rounded.svg" alt=""/>
              </span>
            </div>
          </div>
          <button onClick={savePassword} className="flex justify-center items-center bg-cyan-600 px-4 py-2 w-fit rounded-full font-semibold gap-1 border-2 border-cyan-900 hover:bg-cyan-500 transition-all duration-300">
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords my-2 phone:w-[98%] tab:w-[100%]">
          <h2 className="font-bold text-xl py-3">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !=0 && <table className="table-auto rounded-md overflow-hidden my-2 tab:w-[100%] phone:w-[98%]">
            <thead className="bg-cyan-800 text-white">
              <tr className="tab:text-lg phone:text-base">
                <th className="py-2">Sr</th>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-cyan-100">
              {passwordArray.map((item, index)=>{
                return<tr key={index}>
                <td className="phone:w-[10%] border border-white text-center py-2">{index+1}</td>
                <td className="phone:w-[30%] border border-white text-center py-2 cursor-pointer"><a className="copy flex gap-2 justify-center" href={item.site} target="_blank">{item.site}</a></td>
                <td className="phone:w-[20%] border border-white text-center py-2"><div className="copy flex gap-2 justify-center">{item.username}<img className="w-6 cursor-pointer" src="/copy-02-stroke-rounded.svg" onClick={()=>{copyText(item.username)}}/></div></td>
                <td className="phone:w-[20%] border border-white text-center py-2"><div className="copy flex gap-2 justify-center">{"*".repeat(item.password.length)}<img className="w-6 cursor-pointer" src="/copy-02-stroke-rounded.svg" onClick={()=>{copyText(item.password)}}/></div></td>
                <td className="phone:w-[20%] border border-white text-center py-2">
                  <div className="copy flex gap-4 justify-center items-center">
                    <span className="cursor-pointer"><img onClick={()=>{editPassword(item.id)}} src="/edit-01-stroke-rounded.svg" alt=""/></span>
                    <span className="cursor-pointer"><lord-icon onClick={()=>{deletePassword(item.id)}} src="https://cdn.lordicon.com/skkahier.json" trigger="hover"></lord-icon></span>
                  </div>
                </td>
              </tr>
              })}
            </tbody>
          </table>
          }
        </div>
      </div>
    </main>
  );
};

export default Manager;
