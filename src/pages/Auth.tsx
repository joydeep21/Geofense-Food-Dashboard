import React, { useState, useEffect } from 'react';
import userBackground from '../asset/image/Seller-Bg.png';
import adminBackground from '../asset/image/Admin-Bg1.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/authSlice';
import { login } from '../asset/globalAPI';
// import axios from 'axios';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js'; // Importing the library
import { ChefHat } from 'lucide-react';



const SECRET_KEY = 'your-secret-key'; // Secret key for encryption/decryption

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'admin' | 'seller'>('seller');
  const [error, setError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Remember me state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Decrypt the data and safely handle any errors
  const decryptData = (encryptedData: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Decryption failed or malformed data.');
      }

      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      return ''; // Return an empty string if decryption fails
    }
  };

  // Encrypt the data and ensure it's correctly encoded
  const encryptData = (data: string): string => {
    try {
      return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return ''; // Return an empty string if encryption fails
    }
  };

  // Check localStorage for saved user details and pre-fill the form if "Remember Me" is checked
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      // Decrypt saved user data
      const decryptedUser = decryptData(savedUser);
      const user = JSON.parse(decryptedUser);
      // Pre-fill the email and role based on saved data but allow changes
      // console.log("userdccccfffccfg",user);
      if (role == user.role) {
        setMobile(user.mobileNumber);
        setRole(user.role); // Set role from localStorage but let the user change it
        setPassword(user.password)
        setRememberMe(true);

        // Auto-check "Remember Me" checkbox if user data exists
      }
      else {
        setMobile("");
        setRole(role); // Set role from localStorage but let the user change it
        setPassword("")
        setRememberMe(false);
      }
    }
  }, [role]); // Role is included in the dependency array to monitor changes

  const getBackgroundImage = (): string => {
    switch (role) {
      case 'seller':
        return `url(${userBackground})`;
      case 'admin':
        return `url(${adminBackground})`;
      default:
        return 'none';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobile || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const requestUser = {
      mobileNumber: mobile,
      password: password,
      role: role,
    };
    const saveUser = {
      mobileNumber: mobile,
      password: password,
      role: role,
    };

    console.log("userrequest data", requestUser);

    try {
      const response = await login(requestUser);

      if (response.status === 200) {
        console.log("userrequest data11111111111111111111111111111",response.data);

        const token = response.data.token;
        const user = {
          role: role,
          mobileNumber:mobile,
          email:response.data.email
        };
        localStorage.setItem('token', token);


        // Save to localStorage if Remember Me is checked
        if (rememberMe) {
          
          const encryptedUser = encryptData(JSON.stringify(saveUser));
          localStorage.setItem('user', encryptedUser);
        }

        dispatch(setUser(user));

        Swal.fire({
          icon: 'success',
          title: 'You Successfully Logged in',
          showConfirmButton: false,
          timer: 500,
        });

        navigate('/dashboard');
        // console.log("i am here hii ");

      }
    } catch (err) {
      console.log('error', err);
    } finally {
      setError('');
      setMobile('');
      setPassword('');
      setRole('seller');
    }
  };

  const backgroundStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: getBackgroundImage(),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f0f0f0',
  };

  const cardStyle: React.CSSProperties = {
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '2px 2px 15px rgba(0,0,0,0.1)',
    width: '350px',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        <div className="flex items-center justify-center mb-8">
          <ChefHat size={40} className="text-orange-500" />
        </div>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleLogin} style={formStyle}>
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'seller')}
              style={{
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              pattern="[0-9]{10}" // Optional: Ensure 10-digit numeric input
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" style={{ marginLeft: '8px' }}>Remember Me</label>
          </div>

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
