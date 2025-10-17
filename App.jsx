import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import IssueRecord from "./pages/IssueRecord";
import AnnouncementPage from "./pages/AnnouncementPage";



import NavigationButtons from "./pages/NavigationButtons";

function AppContent() {
  const location = useLocation();

  // ✅ Hide navigation buttons only on login page
  const hideNavButtons = location.pathname === "/";

  return (
    <>
      {!hideNavButtons && <NavigationButtons />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/issuebook" element={<IssueBook />} />
        <Route path="/returnbook" element={<ReturnBook />} />
        <Route path="/issuerecord" element={<IssueRecord />} />
        <Route path="*" element={<Navigate to="/" />} />
        // in App.jsx (you already added)
        <Route path="/announcements" element={<AnnouncementPage />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
