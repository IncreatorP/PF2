// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      showDashboard(userData);
    }
  });
  
  function showForm(formType) {
    document.getElementById('signInForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('signInTab').classList.remove('active');
    document.getElementById('registerTab').classList.remove('active');
  
    if (formType === 'signIn') {
      document.getElementById('signInForm').classList.add('active');
      document.getElementById('signInTab').classList.add('active');
    } else {
      document.getElementById('registerForm').classList.add('active');
      document.getElementById('registerTab').classList.add('active');
    }
  }
  async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        // Handle non-2xx responses gracefully
        const errorText = await response.text();
        document.getElementById('loginStatus').innerText = `Login failed: ${errorText || 'Unknown error'}`;
        return;
      }
  
      const data = await response.json();
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userData', JSON.stringify({ name: data.name, accessLevel: data.accessLevel }));
      showDashboard(data);
  
    } catch (error) {
      console.error('Error during login:', error.message || error);
      document.getElementById('loginStatus').innerText = 'Login failed: Network error';
    }
  }
  
  
  async function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify({ name: data.name, accessLevel: data.accessLevel }));
        showDashboard(data);
      } else {
        document.getElementById('registerStatus').innerText = `Registration failed: ${data.error}`;
      }
    } catch (error) {
      console.error('Error during registration:', error);
      document.getElementById('registerStatus').innerText = 'Registration failed: Network error';
    }
  }
  
  function handleLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    document.getElementById('dashboardContainer').classList.remove('active');
    document.getElementById('authContainer').style.display = 'block';
  }
  
  function showDashboard(userData) {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('dashboardContainer').classList.add('active');
  
    if (userData.accessLevel === 'admin' || userData.accessLevel === 'editor') {
      document.getElementById('editorsButton').style.display = 'block';
    } else {
      document.getElementById('editorsButton').style.display = 'none';
    }
  }
  
  function goToMainProgram() {
    alert('Main Program - Feature coming soon');
  }
  
  async function goToEditors() {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch('/api/editors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        alert('Editors - Feature coming soon');
      } else {
        alert('Access denied: You do not have permission to view this section');
      }
    } catch (error) {
      console.error('Error during editors access:', error);
      alert('Failed to access Editors: Network error');
    }
  }
  