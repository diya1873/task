import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Loginform.css';


function Loginform() {
  const [userName, setUserName] = useState('pos');
  const [password, setPassword] = useState('1010');
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('UserName', userName);
    formData.append('Password', password);

    try {
      const response = await fetch('https://retailapi.futec-soft.com/Profile/v1.0/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data?.Response?.Token) {
       
        localStorage.setItem('token', data.Response.Token);
        localStorage.setItem('username', data.Response.Username);
        localStorage.setItem('userNo', data.Response.UserNo);
        localStorage.setItem('branch', data.Response.DefaultBranch);
        localStorage.setItem('currency', data.Response.DefaultCurrency);

        toast.success('تم تسجيل الدخول بنجاح');
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        toast.error('فشل تسجيل الدخول');
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء الاتصال');
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
       
        <div className="login-left">
          <h2>FUTEC-SOFT © 2024</h2>
        </div>

       
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>تسجيل الدخول</h2>
            <p>تسجيل الدخول الى حسابك</p>

            <input
              type="text"
              placeholder="pos"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">تسجيل الدخول</button>
          </form>
        </div>
      </div>

      
      <ToastContainer />
    </div>
  );
}

export default Loginform;
