import React, { useState } from 'react';
import '../styles/registerForm.css'; 

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    avatar: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    fullName: '',
    avatar: '',
    password: '',
  });

  const [avatarPreview, setAvatarPreview] = useState('');

  const { username, email, fullName, password } = formData;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
          setFormData({
            ...formData,
            avatar: file, 
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    if (!formData.avatar) {
      newErrors.avatar = 'Avatar is required';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('password', formData.password);

      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Registration successful');
        setFormData({
          username: '',
          email: '',
          fullName: '',
          avatar: '',
          password: '',
        });
        setAvatarPreview(''); 
      } else {
        const result = await response.json();
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="create-task-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="avatar-container">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar" className="avatar-label">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar Preview" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">Upload Image</div>
            )}
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="create-task-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
