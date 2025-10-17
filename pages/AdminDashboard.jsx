import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ make sure this line exists

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "STUDENT" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // ✅ Approve user
  const approveUser = (id) => {
    axios
      .put(
        `http://localhost:8081/admin/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setUsers(users.map((u) => (u.id === id ? { ...u, approved: true } : u))))
      .catch((err) => console.error(err));
  };

  // ✅ Delete user
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8081/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setUsers(users.filter((u) => u.id !== id)))
      .catch((err) => console.error(err));
  };

  // ✅ Add new user
  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/admin/add", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessage("✅ User added successfully");
        setNewUser({ username: "", password: "", role: "STUDENT" });
        // refresh users
        axios
          .get("http://localhost:8081/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUsers(res.data));
      })
      .catch(() => setMessage("❌ Failed to add user"));
  };

  // ✅ Styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)",
      padding: "24px",
    },
    header: {
      textAlign: "center",
      marginBottom: "48px",
    },
    headerIcon: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #f59e0b 0%, #d946ef 100%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #d97706 0%, #c026d3 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#6b7280",
      maxWidth: "600px",
      margin: "0 auto",
    },
    button: {
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "white",
      padding: "12px 24px",
      borderRadius: "12px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* 🔹 Header Section */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <span style={{ fontSize: "32px", color: "white" }}>👑</span>
          </div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>
            Manage all users (Approve, Delete, Add new users)
          </p>

          {/* ✅ Manage Announcements Button */}
          <div style={{ marginTop: "20px" }}>
            <Link to="/announcements">
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  Object.assign(e.target.style, {
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 20px rgba(99,102,241,0.3)",
                  })
                }
                onMouseLeave={(e) =>
                  Object.assign(e.target.style, {
                    transform: "scale(1)",
                    boxShadow: "none",
                  })
                }
              >
                📢 Manage Announcements
              </button>
            </Link>
          </div>
        </div>

        {/* 🔹 Add User Section */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <form onSubmit={addUser} style={{ display: "inline-block" }}>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              style={{ padding: "8px", marginRight: "8px", borderRadius: "8px" }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              style={{ padding: "8px", marginRight: "8px", borderRadius: "8px" }}
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              style={{ padding: "8px", marginRight: "8px", borderRadius: "8px" }}
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
            <button type="submit" style={styles.button}>
              Add User
            </button>
          </form>

          {message && (
            <p style={{ marginTop: "10px", fontWeight: "500" }}>{message}</p>
          )}
        </div>

        {/* 🔹 Users Table */}
        <div style={{ marginTop: "40px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <thead style={{ background: "#f3f4f6" }}>
              <tr>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>Username</th>
                <th style={{ padding: "12px" }}>Role</th>
                <th style={{ padding: "12px" }}>Approved</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ textAlign: "center" }}>
                  <td style={{ padding: "10px" }}>{u.id}</td>
                  <td style={{ padding: "10px" }}>{u.username}</td>
                  <td style={{ padding: "10px" }}>{u.role}</td>
                  <td style={{ padding: "10px" }}>
                    {u.approved ? "✅" : "❌"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {!u.approved && (
                      <button
                        onClick={() => approveUser(u.id)}
                        style={{
                          background: "#10b981",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "6px 10px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(u.id)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
