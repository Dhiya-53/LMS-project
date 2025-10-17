import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔹 Fetch all books initially
  useEffect(() => {
    axios
      .get("http://localhost:8081/student/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // 🔹 Search books
  const handleSearch = async (e) => {
    e.preventDefault();
    const endpoint = search.trim()
      ? `http://localhost:8081/student/books/search?keyword=${search}`
      : "http://localhost:8081/student/books";
    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Styles object for consistency
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #faf5ff 100%)",
      padding: "30px 20px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    header: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
      borderRadius: "24px",
      padding: "40px 30px",
      marginBottom: "30px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      border: "1px solid rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)"
    },
    title: {
      fontSize: "42px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "12px",
      letterSpacing: "-0.5px"
    },
    subtitle: {
      fontSize: "18px",
      color: "#64748b",
      fontWeight: "500",
      marginBottom: "8px"
    },
    searchContainer: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
      borderRadius: "20px",
      padding: "30px",
      marginBottom: "30px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      border: "1px solid rgba(255,255,255,0.8)"
    },
    searchForm: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      flexWrap: "wrap"
    },
    searchInput: {
      flex: "1",
      maxWidth: "500px",
      padding: "18px 24px",
      border: "2px solid #e2e8f0",
      borderRadius: "16px",
      fontSize: "16px",
      fontWeight: "500",
      background: "rgba(255,255,255,0.8)",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
    },
    searchInputFocus: {
      border: "2px solid #4f46e5",
      boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)",
      background: "#ffffff",
      outline: "none"
    },
    searchButton: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      padding: "18px 32px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 20px rgba(79, 70, 229, 0.3)",
      minWidth: "140px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },
    searchButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 30px rgba(79, 70, 229, 0.4)",
      background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)"
    },
    tableContainer: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      border: "1px solid rgba(255,255,255,0.8)",
      marginBottom: "30px"
    },
    tableHeader: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      padding: "25px 30px"
    },
    tableTitle: {
      fontSize: "24px",
      fontWeight: "700",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "rgba(255,255,255,0.8)"
    },
    tableHead: {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      borderBottom: "2px solid #e2e8f0"
    },
    tableHeaderCell: {
      padding: "20px 24px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: "600",
      color: "#475569",
      borderBottom: "2px solid #e2e8f0"
    },
    tableRow: {
      transition: "all 0.3s ease",
      borderBottom: "1px solid #f1f5f9"
    },
    tableRowHover: {
      background: "linear-gradient(135deg, #f8faff 0%, #f0f9ff 100%)",
      transform: "scale(1.01)"
    },
    tableCell: {
      padding: "20px 24px",
      fontSize: "14px",
      fontWeight: "500"
    },
    idBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      borderRadius: "50%",
      fontSize: "12px",
      fontWeight: "700"
    },
    categoryBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
      color: "white",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600"
    },
    statusBadgeAvailable: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 16px",
      background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      color: "white",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      border: "2px solid #a7f3d0"
    },
    statusBadgeIssued: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 16px",
      background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
      color: "white",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      border: "2px solid #fde68a"
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "white"
    },
    emptyState: {
      padding: "60px 30px",
      textAlign: "center"
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "20px"
    },
    emptyText: {
      fontSize: "18px",
      color: "#64748b",
      fontWeight: "600",
      marginBottom: "8px"
    },
    emptySubtext: {
      fontSize: "14px",
      color: "#94a3b8"
    },
    logoutButton: {
      background: "linear-gradient(135deg, #475569 0%, #64748b 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      padding: "16px 32px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 20px rgba(100, 116, 139, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      margin: "0 auto"
    },
    logoutButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 30px rgba(100, 116, 139, 0.4)",
      background: "linear-gradient(135deg, #374151 0%, #4b5563 100%)"
    }
  };

  // State for hover effects
  const [hoverStates, setHoverStates] = useState({
    searchButton: false,
    logoutButton: false,
    tableRows: {}
  });

  const handleMouseEnter = (element) => {
    setHoverStates(prev => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setHoverStates(prev => ({ ...prev, [element]: false }));
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={{ textAlign: "center" }}>
            <h1 style={styles.title}>🎓 Student Dashboard</h1>
            <p style={styles.subtitle}>
              Browse and search available books in the library
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <form 
            onSubmit={handleSearch} 
            style={styles.searchForm}
          >
            <input
              type="text"
              placeholder="Search books by title, author, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                ...styles.searchInput,
                ...(hoverStates.searchInput ? styles.searchInputFocus : {})
              }}
              onFocus={() => handleMouseEnter("searchInput")}
              onBlur={() => handleMouseLeave("searchInput")}
            />
            <button
              type="submit"
              style={{
                ...styles.searchButton,
                ...(hoverStates.searchButton ? styles.searchButtonHover : {})
              }}
              onMouseEnter={() => handleMouseEnter("searchButton")}
              onMouseLeave={() => handleMouseLeave("searchButton")}
            >
              🔍 Search
            </button>
          </form>
        </div>

        {/* Books Table */}
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>
              <span>📚</span>
              Available Books
              <span>📚</span>
            </h2>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeaderCell}>ID</th>
                  <th style={styles.tableHeaderCell}>Title</th>
                  <th style={styles.tableHeaderCell}>Author</th>
                  <th style={styles.tableHeaderCell}>Category</th>
                  <th style={styles.tableHeaderCell}>Status</th>
                  <th style={styles.tableHeaderCell}>Issued To</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((b) => (
                    <tr
                      key={b.id}
                      style={{
                        ...styles.tableRow,
                        ...(hoverStates.tableRows[b.id] ? styles.tableRowHover : {}),
                        background: b.issued 
                          ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" 
                          : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                        color: b.issued ? "#92400e" : "#166534"
                      }}
                      onMouseEnter={() => handleMouseEnter(`tableRows.${b.id}`)}
                      onMouseLeave={() => handleMouseLeave(`tableRows.${b.id}`)}
                    >
                      <td style={styles.tableCell}>
                        <span style={styles.idBadge}>{b.id}</span>
                      </td>
                      <td style={{...styles.tableCell, fontWeight: "600", color: "#1e293b"}}>
                        {b.title}
                      </td>
                      <td style={{...styles.tableCell, color: "#475569"}}>
                        {b.author}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={styles.categoryBadge}>{b.category}</span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={b.issued ? styles.statusBadgeIssued : styles.statusBadgeAvailable}>
                          <span style={styles.statusDot}></span>
                          {b.issued ? "Issued ❌" : "Available ✅"}
                        </span>
                      </td>
                      <td style={{...styles.tableCell, color: b.issuedTo ? "#1e293b" : "#94a3b8"}}>
                        {b.issuedTo || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={styles.emptyState}>
                      <div style={styles.emptyIcon}>📖</div>
                      <div style={styles.emptyText}>No books found</div>
                      <div style={styles.emptySubtext}>Try adjusting your search terms</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Logout Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleLogout}
            style={{
              ...styles.logoutButton,
              ...(hoverStates.logoutButton ? styles.logoutButtonHover : {})
            }}
            onMouseEnter={() => handleMouseEnter("logoutButton")}
            onMouseLeave={() => handleMouseLeave("logoutButton")}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}