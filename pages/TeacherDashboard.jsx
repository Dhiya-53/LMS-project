import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function TeacherDashboard() {
  
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "", author: "", category: "", isbn: "", availableCopies: 1,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, issued, available
  const token = localStorage.getItem("token");
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  // Fetch all books and issued books
  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksResponse, issuedResponse] = await Promise.all([
        axios.get("http://localhost:8081/teacher/books", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8081/issue/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setBooks(booksResponse.data);
      setIssuedBooks(issuedResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("❌ Failed to load data");
    }
    setLoading(false);
  };

  // Get all active issue records for a specific book
  const getIssueRecordsForBook = (bookId) => {
    return issuedBooks.filter(record => 
      record.book && record.book.id === bookId && !record.returned
    );
  };

  // Check if a book has any issued copies
  const hasIssuedCopies = (bookId) => {
    return getIssueRecordsForBook(bookId).length > 0;
  };

  // Add book
  const addBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8081/teacher/books/add", newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessage("✅ Book added successfully!");
      setNewBook({ title: "", author: "", category: "", isbn: "", availableCopies: 1 });
      await fetchData();
    } catch (error) {
      setMessage("❌ Failed to add book.");
    }
    setLoading(false);
  };

  // Delete book
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8081/teacher/books/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessage("🗑️ Book deleted!");
      setBooks(books.filter((b) => b.id !== id));
    } catch (error) {
      setMessage("❌ Failed to delete book.");
    }
    setLoading(false);
  };

  // Filter and search books
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.includes(searchTerm);

    const matchesFilter = 
      filterStatus === "all" ||
      (filterStatus === "issued" && hasIssuedCopies(book.id)) ||
      (filterStatus === "available" && !hasIssuedCopies(book.id));

    return matchesSearch && matchesFilter;
  });

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 100%)',
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
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f3f4f6',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block'
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
      borderColor: '#c7d2fe'
    },
    cardIcon: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      color: 'white',
      transition: 'transform 0.3s ease'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '4px'
    },
    cardDescription: {
      fontSize: '14px',
      color: '#6b7280'
    },
    formSection: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      marginBottom: '48px',
      overflow: 'hidden'
    },
    formHeader: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      padding: '24px 32px'
    },
    formTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    },
    form: {
      padding: '32px'
    },
    inputGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '16px',
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
    tableSection: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      overflow: 'hidden'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
      padding: '24px 32px'
    },
    tableTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    },
    searchSection: {
      padding: '24px 32px',
      backgroundColor: '#f8fafc',
      borderBottom: '1px solid #e5e7eb'
    },
    searchContainer: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    searchInput: {
      flex: '1',
      minWidth: '300px',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      backgroundColor: 'white',
      fontSize: '16px',
      transition: 'all 0.2s ease'
    },
    filterSelect: {
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      backgroundColor: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      minWidth: '150px'
    },
    searchButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    clearButton: {
      background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500'
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.2s ease'
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
    resultsInfo: {
      padding: '16px 32px',
      backgroundColor: '#f0fdf4',
      borderBottom: '1px solid #bbf7d0',
      color: '#166534',
      fontSize: '14px',
      fontWeight: '500'
    }
  };

  const issuedBooksCount = books.filter(book => hasIssuedCopies(book.id)).length;
  const availableBooksCount = books.length - issuedBooksCount;

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
            <span>📚</span>
          </div>
          <h1 style={styles.title}>Teacher Dashboard</h1>
          <p style={styles.subtitle}>
            Manage your library efficiently — {books.length} books in inventory
          </p>
        </div>

        {/* Quick Action Cards */}
        <div style={styles.cardGrid}>
          <Link
            to="/issuebook"
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={styles.cardIcon}>
                <span>📘</span>
              </div>
              <div>
                <h3 style={styles.cardTitle}>Issue Book</h3>
                <p style={styles.cardDescription}>Lend books to students</p>
              </div>
            </div>
          </Link>

          <Link
            to="/returnbook"
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{...styles.cardIcon, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                <span>📗</span>
              </div>
              <div>
                <h3 style={styles.cardTitle}>Return Book</h3>
                <p style={styles.cardDescription}>Accept book returns</p>
              </div>
            </div>
          </Link>

          <Link
            to="/issuerecord"

            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{...styles.cardIcon, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
                <span>🗂️</span>
              </div>
              <div>
                <h3 style={styles.cardTitle}>Issued Records</h3>
                <p style={styles.cardDescription}>View all transactions</p>
              </div>
            </div>
          </Link>
        </div>


        {/* Add Book Section */}
        <div style={styles.formSection}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              <span style={{width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px'}}>➕</span>
              Add New Book
            </h2>
          </div>
          
          <form onSubmit={addBook} style={styles.form}>
            <div style={styles.inputGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Book Title</label>
                <input
                  type="text"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Author</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Category</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>ISBN</label>
                <input
                  type="text"
                  placeholder="Enter ISBN number"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Available Copies</label>
                <input
                  type="number"
                  placeholder="Number of copies"
                  value={newBook.availableCopies}
                  onChange={(e) => setNewBook({ ...newBook, availableCopies: e.target.value })}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => !loading && Object.assign(e.target.style, styles.button)}
              disabled={loading}
            >
              <span>{loading ? "Adding..." : "Add Book to Library"}</span>
              <span>📖</span>
            </button>
            
            {message && (
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: '500',
                ...(message.includes("✅") || message.includes("successfully") 
                  ? { backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' } 
                  : { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' })
              }}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Books Table Section */}
        <div style={styles.tableSection}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>
              <span style={{width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px'}}>📖</span>
              Library Inventory ({books.length} books)
            </h2>
          </div>

          {/* Search and Filter Section */}
          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              {/* Search Input */}
              <input
                type="text"
                placeholder="🔍 Search by title, author, category, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.searchInput)}
              />
              
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="all">All Books</option>
                <option value="issued">Issued Only</option>
                <option value="available">Available Only</option>
              </select>

              {/* Clear Filters */}
              {(searchTerm || filterStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  style={styles.clearButton}
                  onMouseEnter={(e) => Object.assign(e.target.style, { transform: 'scale(1.05)' })}
                  onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'scale(1)' })}
                >
                  <span>🗑️</span>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {(searchTerm || filterStatus !== "all") && (
            <div style={styles.resultsInfo}>
              📊 Showing {filteredBooks.length} of {books.length} books
              {searchTerm && ` matching "${searchTerm}"`}
              {filterStatus !== "all" && ` (${filterStatus})`}
            </div>
          )}
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
                <tr>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>ID</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Title</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Author</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Category</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>ISBN</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Available</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Issued</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Issued To</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => {
                  const issueRecords = getIssueRecordsForBook(book.id);
                  const hasIssued = hasIssuedCopies(book.id);
                  
                  return (
                    <tr 
                      key={book.id}
                      style={{ 
                        transition: 'background-color 0.2s ease',
                        backgroundColor: hasIssued ? '#fff7ed' : 'transparent'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = hasIssued ? '#ffedd5' : '#f8fafc'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = hasIssued ? '#fff7ed' : 'transparent'}
                    >
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{book.id}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>{book.title}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{book.author}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                        <span style={{...styles.badge, backgroundColor: '#dbeafe', color: '#1e40af'}}>
                          {book.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontFamily: 'monospace', color: '#6b7280' }}>{book.isbn}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: book.availableCopies > 0 ? '#dcfce7' : '#fecaca',
                          color: book.availableCopies > 0 ? '#166534' : '#dc2626'
                        }}>
                          {book.availableCopies}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: hasIssued ? '#fef3c7' : '#dcfce7',
                          color: hasIssued ? '#92400e' : '#166534'
                        }}>
                          {hasIssued ? `📖 ${issueRecords.length} issued` : "✅ Available"}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                        {hasIssued ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {issueRecords.map((record, index) => (
                              <span 
                                key={record.id}
                                style={{
                                  ...styles.badge,
                                  backgroundColor: '#dbeafe',
                                  color: '#1e40af',
                                  marginBottom: index < issueRecords.length - 1 ? '2px' : '0'
                                }}
                              >
                                {record.user?.username}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Not issued</span>
                        )}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                        <button
                          onClick={() => deleteBook(book.id)}
                          style={styles.deleteButton}
                          onMouseEnter={(e) => Object.assign(e.target.style, { transform: 'scale(1.05)' })}
                          onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'scale(1)' })}
                          disabled={loading}
                        >
                          <span>🗑️</span>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredBooks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <span style={{ fontSize: '24px' }}>🔍</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                {searchTerm || filterStatus !== "all" ? "No books found" : "No books in library"}
              </h3>
              <p style={{ color: '#6b7280' }}>
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search terms or filters" 
                  : "Start by adding your first book to the library"}
              </p>
              {(searchTerm || filterStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  style={{
                    ...styles.button,
                    marginTop: '16px',
                    padding: '12px 24px'
                  }}
                >
                  <span>📚</span>
                  Show All Books
                </button>
              )}
            </div>
          )}
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

