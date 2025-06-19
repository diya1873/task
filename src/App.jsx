
import Branches from './pages/Branches';
import Dashboard from './pages/Dashboard';
import Loginform from './pages/Loginform';
import UserGroups from './pages/UserGroups';
import Users from './pages/Users';
import ProtectedRoute from './routes/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" />} />

        
        <Route
          path="/login"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/dashboard" />
            ) : (
              <Loginform />
            )
          }
        />

       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
           <Route
            path="user-groups"
            element={
              <ProtectedRoute>
                <UserGroups />
              </ProtectedRoute>
            }
          />
          <Route
            path="branches"
            element={
              <ProtectedRoute>
                <Branches />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
