import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const buttonBase = {
    color: "white",
    padding: "12px 24px",
    marginRight: "10px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px",
      gap: "10px",
      flexWrap: "wrap",
    },
    back: {
      ...buttonBase,
      background: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)",
    },
    forward: {
      ...buttonBase,
      background: "linear-gradient(135deg, #a7f3d0 0%, #10b981 100%)",
    },
    logout: {
      ...buttonBase,
      background: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate(-1)}
        style={styles.back}
        onMouseEnter={(e) =>
          Object.assign(e.target.style, { transform: "scale(1.05)" })
        }
        onMouseLeave={(e) =>
          Object.assign(e.target.style, { transform: "scale(1)" })
        }
      >
        ⬅ Back
      </button>

      <button
        onClick={() => navigate(1)}
        style={styles.forward}
        onMouseEnter={(e) =>
          Object.assign(e.target.style, { transform: "scale(1.05)" })
        }
        onMouseLeave={(e) =>
          Object.assign(e.target.style, { transform: "scale(1)" })
        }
      >
        ➡ Forward
      </button>

      <button
        onClick={handleLogout}
        style={styles.logout}
        onMouseEnter={(e) =>
          Object.assign(e.target.style, { transform: "scale(1.05)" })
        }
        onMouseLeave={(e) =>
          Object.assign(e.target.style, { transform: "scale(1)" })
        }
      >
        🚪 Logout
      </button>
    </div>
  );
}
