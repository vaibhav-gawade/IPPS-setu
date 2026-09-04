import { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Challenge Matches Your Profile', message: 'The Ministry of Defense has posted a new challenge in AI Surveillance.', time: '2 hours ago', read: false },
    { id: 2, title: 'Application Shortlisted', message: 'Your proposal for "Secure Comms Protocol" has been shortlisted for the next round.', time: '1 day ago', read: false },
    { id: 3, title: 'Document Verified', message: 'Your DPIIT Recognition Certificate has been successfully verified.', time: '3 days ago', read: true },
    { id: 4, title: 'Payment Initiated', message: 'Payment for INV-2024-001 has been initiated and should reflect in 3-5 working days.', time: '1 week ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Notifications</h1>
          <p className="section-subtitle">Stay updated on your applications, matches, and account activity</p>
        </div>
        <div className="section-actions">
          <button className="btn btn-secondary" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck size={16} /> Mark all as read
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {notifications.map(n => (
          <div key={n.id} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: n.read ? 'none' : '4px solid var(--teal-500)', padding: '16px 20px' }}>
            <div style={{ background: n.read ? 'var(--bg-card-hover)' : 'rgba(45, 212, 191, 0.1)', padding: '12px', borderRadius: '50%', color: n.read ? 'var(--text-muted)' : 'var(--teal-400)' }}>
              <Bell size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 style={{ fontWeight: n.read ? '500' : '600', color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{n.title}</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{n.message}</p>
              {!n.read && (
                <button 
                  onClick={() => markAsRead(n.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--teal-400)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}
                >
                  <Check size={14} /> Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-title">No notifications</div>
          </div>
        )}
      </div>
    </div>
  );
}
