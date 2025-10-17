import React, { useEffect, useState } from "react";
import axios from "axios";

export default function IssueRecord() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("http://localhost:8081/teacher/issues");
        setRecords(res.data);
      } catch (err) {
        setError("❌ Failed to load issue records.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  // Calculate stats
  const totalRecords = records.length;
  const currentlyIssued = records.filter(r => !r.returned && new Date(r.dueDate) >= new Date()).length;
  const overdue = records.filter(r => !r.returned && new Date(r.dueDate) < new Date()).length;
  const returned = records.filter(r => r.returned).length;

  // Inline styles as fallback
  const styles = {
    container: { padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' },
    subtitle: { color: '#6b7280' },
    statsGrid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(1, 1fr)', 
      gap: '1.5rem', 
      marginBottom: '2rem',
      '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)' }
    },
    statCard: { 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
      border: '1px solid #e5e7eb', 
      padding: '1.5rem', 
      textAlign: 'center' 
    },
    statNumber: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' },
    tableContainer: { 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
      border: '1px solid #e5e7eb', 
      overflow: 'hidden' 
    },
    table: { width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' },
    tableHeader: { backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
    tableHeaderCell: { 
      padding: '0.75rem 1rem', 
      textAlign: 'left', 
      fontWeight: '600', 
      color: '#374151', 
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableCell: { padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.625rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    badgeReturned: { backgroundColor: '#dcfce7', color: '#166534' },
    badgeOverdue: { backgroundColor: '#fecaca', color: '#dc2626' },
    badgeIssued: { backgroundColor: '#fef3c7', color: '#d97706' },
    footer: { 
      backgroundColor: '#f9fafb', 
      padding: '0.75rem 1rem', 
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '24rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          animation: 'spin 1s linear infinite', 
          borderRadius: '9999px', 
          height: '3rem', 
          width: '3rem', 
          borderBottom: '2px solid #4f46e5',
          margin: '0 auto 1rem auto'
        }}></div>
        <p style={{ fontSize: '1.125rem', color: '#6b7280', fontWeight: '500' }}>Loading issue records...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '24rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '4rem', 
          height: '4rem', 
          backgroundColor: '#fecaca', 
          borderRadius: '9999px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
        </div>
        <p style={{ fontSize: '1.125rem', color: '#dc2626', fontWeight: '500' }}>{error}</p>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>📚 Issued Book Records</h2>
        <p style={styles.subtitle}>Manage and track all book transactions</p>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#2563eb'}}>{currentlyIssued}</div>
          <div style={{ color: '#6b7280', fontWeight: '500' }}>Currently Issued</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#dc2626'}}>{overdue}</div>
          <div style={{ color: '#6b7280', fontWeight: '500' }}>Overdue</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statNumber, color: '#16a34a'}}>{returned}</div>
          <div style={{ color: '#6b7280', fontWeight: '500' }}>Returned</div>
        </div>
      </div>

      {records.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 0', 
          backgroundColor: 'white', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ 
            width: '5rem', 
            height: '5rem', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '9999px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <span style={{ fontSize: '1.875rem' }}>📖</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            No Issue Records Found
          </h3>
          <p style={{ color: '#6b7280', maxWidth: '28rem', margin: '0 auto' }}>
            There are no book issue records available at the moment.
          </p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>ID</th>
                  <th style={styles.tableHeaderCell}>Book Title</th>
                  <th style={styles.tableHeaderCell}>User</th>
                  <th style={styles.tableHeaderCell}>Issue Date</th>
                  <th style={styles.tableHeaderCell}>Due Date</th>
                  <th style={styles.tableHeaderCell}>Return Date</th>
                  <th style={styles.tableHeaderCell}>Status</th>
                  <th style={styles.tableHeaderCell}>Fine</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const isOverdue = !r.returned && new Date(r.dueDate) < new Date();
                  
                  return (
                    <tr key={r.id} style={{ hover: { backgroundColor: '#f9fafb' } }}>
                      <td style={styles.tableCell}>
                        <span style={{ fontWeight: '500', color: '#111827' }}>#{r.id}</span>
                      </td>
                      <td style={{...styles.tableCell, fontWeight: '500', color: '#111827'}}>
                        {r.book?.title || "N/A"}
                      </td>
                      <td style={styles.tableCell}>{r.user?.username || "N/A"}</td>
                      <td style={styles.tableCell}>{r.issueDate}</td>
                      <td style={{
                        ...styles.tableCell,
                        fontWeight: '500',
                        color: isOverdue ? '#dc2626' : '#6b7280'
                      }}>
                        {r.dueDate || "—"}
                      </td>
                      <td style={styles.tableCell}>{r.returnDate || "—"}</td>
                      <td style={styles.tableCell}>
                        {r.returned ? (
                          <span style={{...styles.badge, ...styles.badgeReturned}}>
                            Returned
                          </span>
                        ) : isOverdue ? (
                          <span style={{...styles.badge, ...styles.badgeOverdue}}>
                            Overdue
                          </span>
                        ) : (
                          <span style={{...styles.badge, ...styles.badgeIssued}}>
                            Issued
                          </span>
                        )}
                      </td>
                      <td style={styles.tableCell}>
                        {r.fine > 0 ? `₹${r.fine}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Footer */}
          <div style={styles.footer}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Showing <span style={{ fontWeight: '600' }}>{records.length}</span> records
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                color: '#6b7280',
                cursor: 'pointer'
              }}>
                Export CSV
              </button>
              <button style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                color: '#6b7280',
                cursor: 'pointer'
              }}>
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}