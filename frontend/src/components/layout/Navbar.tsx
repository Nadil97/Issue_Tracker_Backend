import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">🐛</div>
        <span className="brand-name">IssueTrack</span>
      </div>

      <nav className="navbar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/issues" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Issues
        </NavLink>
        <NavLink to="/issues/create" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          + New Issue
        </NavLink>
      </nav>

      {user && (
        <div className="navbar-user">
          <div className="user-avatar">{getInitials(user.name)}</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            ⎋
          </button>
        </div>
      )}
    </header>
  );
}
