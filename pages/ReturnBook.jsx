import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReturnBook() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch all active issued books
  useEffect(() => {
    fetchIssuedBooks();
  }, [token]);

  const fetchIssuedBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8081/issue/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssuedBooks(response.data);
    } catch (error) {
      console.error("Error fetching issued books:", error);
      setMessage("❌ Failed to load issued books");
    }
    setLoading(false);
  };

  // Return a book
  const returnBook = async (issueId) => {
    if (!window.confirm("Are you sure you want to return this book?")) return;
    
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8081/issue/return/${issueId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setMessage(response.data);
      // Refresh the issued books list
      await fetchIssuedBooks();
    } catch (error) {
      setMessage("❌ Failed to return book");
    }
    setLoading(false);
  };

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      padding: '24px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    headerIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
      borderRadius: '50%',
      marginBottom: '24px',
      boxShadow: '0 10px 25px rgba(14, 165, 233, 0.3)'
    },
    title: {
      background: 'linear-gradient(135deg, #0284c7 0%, #075985 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    subtitle: {
      color: '#475569',
      fontSize: '18px',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
      padding: '24px 32px'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    cardContent: {
      padding: '32px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px'
    },
    th: {
      padding: '16px 20px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#1e293b',
      backgroundColor: '#f8fafc',
      borderBottom: '2px solid #e2e8f0'
    },
    td: {
      padding: '16px 20px',
      fontSize: '14px',
      color: '#475569',
      borderBottom: '1px solid #f1f5f9'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    returnButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease'
    },
    buttonHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 5px 15px rgba(16, 185, 129, 0.3)'
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #0ea5e9',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px'
    },
    emptyIcon: {
      width: '80px',
      height: '80px',
      backgroundColor: '#f1f5f9',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px'
    },
    message: {
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center',
      fontWeight: '500',
      marginBottom: '20px'
    }
  };

  const activeIssuedBooks = issuedBooks.filter(book => !book.returned);
  const returnedBooks = issuedBooks.filter(book => book.returned);

  return (
    <div style={styles.container}>
      {/* Loading Overlay */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <span style={{ fontSize: '32px', color: 'white' }}>📗</span>
          </div>
          <h1 style={styles.title}>Return Books</h1>
          <p style={styles.subtitle}>
            Manage book returns and track currently issued books in the library
          </p>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <span style={{ fontSize: '20px' }}>🔄</span>
              Book Return Management
            </h2>
          </div>

          <div style={styles.cardContent}>
            {/* Statistics */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{activeIssuedBooks.length}</div>
                <div style={styles.statLabel}>Currently Issued</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{returnedBooks.length}</div>
                <div style={styles.statLabel}>Returned Books</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{issuedBooks.length}</div>
                <div style={styles.statLabel}>Total Transactions</div>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div style={{
                ...styles.message,
                ...(message.includes("✅") || message.includes("successfully") 
                  ? { backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' } 
                  : { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' })
              }}>
                {message}
              </div>
            )}

            {/* Currently Issued Books Table */}
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1e293b', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>📚</span>
              Currently Issued Books ({activeIssuedBooks.length})
            </h3>

            {activeIssuedBooks.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Issue ID</th>
                      <th style={styles.th}>Book Title</th>
                      <th style={styles.th}>ISBN</th>
                      <th style={styles.th}>Issued To</th>
                      <th style={styles.th}>Issue Date</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeIssuedBooks.map((record) => (
                      <tr 
                        key={record.id}
                        style={{ 
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <td style={styles.td}>
                          <span style={{ 
                            fontFamily: 'monospace', 
                            fontWeight: '600',
                            color: '#0f172a'
                          }}>
                            #{record.id}
                          </span>
                        </td>
                        <td style={{...styles.td, fontWeight: '600'}}>
                          {record.book?.title}
                        </td>
                        <td style={{...styles.td, fontFamily: 'monospace'}}>
                          {record.book?.isbn}
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            backgroundColor: '#dbeafe',
                            color: '#1e40af'
                          }}>
                            {record.user?.username}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {new Date(record.issueDate).toLocaleDateString()}
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            backgroundColor: '#fef3c7',
                            color: '#92400e'
                          }}>
                            ⏳ Issued
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={() => returnBook(record.id)}
                            style={styles.returnButton}
                            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.returnButton)}
                            disabled={loading}
                          >
                            <span>↩️</span>
                            Return
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <span style={{ fontSize: '32px' }}>📖</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                  No Books Currently Issued
                </h3>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>
                  All books are available in the library. Books will appear here when issued to students.
                </p>
              </div>
            )}

            {/* Recently Returned Books */}
            {returnedBooks.length > 0 && (
              <>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#1e293b', 
                  marginTop: '40px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>✅</span>
                  Recently Returned Books ({returnedBooks.length})
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Issue ID</th>
                        <th style={styles.th}>Book Title</th>
                        <th style={styles.th}>Issued To</th>
                        <th style={styles.th}>Issue Date</th>
                        <th style={styles.th}>Return Date</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnedBooks.slice(0, 5).map((record) => (
                        <tr key={record.id}>
                          <td style={styles.td}>#{record.id}</td>
                          <td style={styles.td}>{record.book?.title}</td>
                          <td style={styles.td}>{record.user?.username}</td>
                          <td style={styles.td}>
                            {new Date(record.issueDate).toLocaleDateString()}
                          </td>
                          <td style={styles.td}>
                            {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.badge,
                              backgroundColor: '#dcfce7',
                              color: '#166534'
                            }}>
                              ✅ Returned
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add CSS animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}