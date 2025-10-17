import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await axios.post("http://localhost:8081/auth/login", {
        username,
        password,
      });

      const token = response.data;

      if (token.startsWith("ey")) {
        localStorage.setItem("token", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload.role;

        if (role === "ADMIN") navigate("/admin");
        else if (role === "TEACHER") navigate("/teacher");
        else if (role === "STUDENT") navigate("/student");
        else setMessage("Unknown role");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setMessage("Login failed. Check credentials or approval status.");
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles for Tailwind v4 compatibility
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    },
    card: {
      maxWidth: '400px',
      width: '100%',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      padding: '40px 32px',
      textAlign: 'center'
    },
    headerIcon: {
      width: '80px',
      height: '80px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '16px'
    },
    form: {
      padding: '32px'
    },
    inputGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    inputContainer: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    input: {
      width: '100%',
      padding: '16px 16px 16px 40px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      backgroundColor: '#f9fafb',
      fontSize: '16px',
      transition: 'all 0.2s ease'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#6366f1',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      fontWeight: '600',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    buttonHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    message: {
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center',
      fontWeight: '500',
      marginTop: '16px'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginTop: '32px'
    },
    feature: {
      textAlign: 'center',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '12px',
      backdropFilter: 'blur(8px)'
    },
    featureIcon: {
      width: '40px',
      height: '40px',
      background: '#e0e7ff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 8px'
    },
    footer: {
      background: '#f9fafb',
      padding: '24px 32px',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <span style={{ fontSize: '32px' }}>📚</span>
          </div>
          <h1 style={styles.title}>Library Management</h1>
          <p style={styles.subtitle}>Sign in to access your account</p>
        </div>

        {/* Form Section */}
        <div style={styles.form}>
          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, styles.button)}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span>→</span>
                </>
              )}
            </button>

            {/* Message Display */}
            {message && (
              <div style={{
                ...styles.message,
                ...(message.includes("failed") || message.includes("Check credentials") 
                  ? { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' } 
                  : message.includes("Unknown")
                  ? { backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fed7aa' }
                  : { backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' })
              }}>
                {message}
              </div>
            )}
          </form>

          {/* Demo Credentials */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>
              Demo Credentials
            </p>
            <div style={{ display: 'grid', gap: '4px', fontSize: '12px', color: '#9ca3af' }}>
              <div>Admin: admin / admin123</div>
              <div>Teacher: teacher / teacher123</div>
              <div>Student: student / student123</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Library Management System v1.0
          </p>
          <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>
            Secure access for authorized personnel only
          </p>
        </div>
      </div>

      {/* Add CSS animation for spinner */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;