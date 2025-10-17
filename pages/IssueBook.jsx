import React, { useState, useEffect } from "react";
import axios from "axios";

const IssueBook = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableBooks, setAvailableBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksResponse, usersResponse] = await Promise.all([
        axios.get("http://localhost:8081/teacher/books", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8081/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setBooks(booksResponse.data);
      setUsers(usersResponse.data.filter(user => user.approved));
      
      // Filter available books (with copies > 0)
      const available = booksResponse.data.filter(book => book.availableCopies > 0);
      setAvailableBooks(available);
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage("❌ Failed to load data");
    }
    setLoading(false);
  };

  const handleIssue = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedBook) {
      setMessage("❌ Please select both student and book");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:8081/issue/add`, null, {
        params: { userId: selectedUser, bookId: selectedBook },
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data);
      
      // Reset form
      setSelectedBook("");
      setSelectedUser("");
      
      // Refresh data to update available books
      await fetchData();
    } catch (err) {
      setMessage("❌ Error issuing book. Please try again.");
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
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      borderRadius: '50%',
      marginBottom: '24px',
      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
    },
    title: {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    subtitle: {
      color: '#6b7280',
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
      maxWidth: '600px',
      margin: '0 auto'
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    select: {
      width: '100%',
      padding: '16px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      backgroundColor: '#f9fafb',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    selectFocus: {
      outline: 'none',
      borderColor: '#6366f1',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
    },
    button: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      fontWeight: '600',
      padding: '16px 32px',
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
      transform: 'scale(1.05)',
      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
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
      borderTop: '5px solid #6366f1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    message: {
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center',
      fontWeight: '500',
      marginTop: '20px'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      marginLeft: '8px'
    }
  };

  const approvedUsers = users.filter(user => user.approved);
  const availableBooksCount = availableBooks.length;
  const totalStudents = approvedUsers.length;

  return (
    <div style={styles.container}>
      {/* Loading Overlay */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <span style={{ fontSize: '32px', color: 'white' }}>📘</span>
          </div>
          <h1 style={styles.title}>Issue Books</h1>
          <p style={styles.subtitle}>
            Lend books to students and track issued copies in your library
          </p>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <span style={{ fontSize: '20px' }}>🎯</span>
              Issue Book to Student
            </h2>
          </div>

          <div style={styles.cardContent}>
            {/* Statistics */}
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{availableBooksCount}</div>
                <div style={styles.statLabel}>Available Books</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{totalStudents}</div>
                <div style={styles.statLabel}>Approved Students</div>
              </div>
            </div>

            <form onSubmit={handleIssue} style={styles.form}>
              {/* Student Selection */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <span>👤</span>
                  Select Student:
                  <span style={{...styles.badge, backgroundColor: '#dbeafe', color: '#1e40af'}}>
                    {approvedUsers.length} available
                  </span>
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  style={styles.select}
                  onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.select)}
                  required
                  disabled={loading}
                >
                  <option value="">-- Choose a student --</option>
                  {approvedUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Book Selection */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <span>📚</span>
                  Select Book:
                  <span style={{...styles.badge, backgroundColor: '#dcfce7', color: '#166534'}}>
                    {availableBooksCount} available
                  </span>
                </label>
                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  style={styles.select}
                  onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.select)}
                  required
                  disabled={loading}
                >
                  <option value="">-- Choose a book --</option>
                  {availableBooks.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} by {book.author} 
                      {book.availableCopies > 1 && ` (${book.availableCopies} copies)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue Button */}
              <button
                type="submit"
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={(e) => !loading && Object.assign(e.target.style, styles.button)}
                disabled={loading || !selectedUser || !selectedBook}
              >
                {loading ? (
                  <>
                    <div style={{width: '16px', height: '16px', border: '2px solid transparent', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
                    <span>Issuing Book...</span>
                  </>
                ) : (
                  <>
                    <span>📘</span>
                    <span>Issue Book</span>
                  </>
                )}
              </button>
            </form>

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

            {/* Quick Help */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💡</span>
                Quick Tips
              </h4>
              <ul style={{ fontSize: '14px', color: '#64748b', paddingLeft: '20px' }}>
                <li>Only approved students can borrow books</li>
                <li>Books with available copies will appear in the list</li>
                <li>Available copies count updates automatically</li>
              </ul>
            </div>
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
};

export default IssueBook;
