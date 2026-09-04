import { useState } from 'react';
import { Rocket, Clock, CheckCircle } from 'lucide-react';

export default function GovPilotsPage() {
  const [tab, setTab] = useState('Active');

  const pilots = [
    { id: 'PLT-1029', title: 'AI Surveillance Drone Testing', startup: 'NovaTech Solutions', dept: 'Ministry of Defense', status: 'Active', progress: 60, nextMilestone: 'Field Test 2 on Oct 15' },
    { id: 'PLT-1045', title: 'Secure Comms Protocol', startup: 'SecureLink Networks', dept: 'MeitY', status: 'Upcoming', progress: 0, nextMilestone: 'Kickoff meeting on Nov 1' },
    { id: 'PLT-0998', title: 'Autonomous Supply Vehicle', startup: 'AeroDynamics AI', dept: 'Ministry of Defense', status: 'Completed', progress: 100, nextMilestone: 'Final Report Approved' }
  ];

  const displayed = pilots.filter(p => p.status === tab);

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Pilot Management</h1>
          <p className="section-subtitle">Track and manage active pilot deployments</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {['Active', 'Upcoming', 'Completed'].map(t => (
          <button 
            key={t} 
            className={`btn ${tab === t ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t)}
          >
            {t === 'Active' && <Rocket size={16} />}
            {t === 'Upcoming' && <Clock size={16} />}
            {t === 'Completed' && <CheckCircle size={16} />}
            {t} Pilots
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {displayed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🚀</div>
            <div className="empty-state-title">No {tab.toLowerCase()} pilots</div>
            <p>There are no {tab.toLowerCase()} pilots at the moment.</p>
          </div>
        ) : (
          displayed.map(pilot => (
            <div key={pilot.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <code style={{ fontSize: '12px', color: 'var(--teal-400)' }}>{pilot.id}</code>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '4px' }}>{pilot.title}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {pilot.startup} • {pilot.dept}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span className={`badge ${pilot.status === 'Active' ? 'badge-evaluation' : pilot.status === 'Completed' ? 'badge-shortlisted' : 'badge-pending'}`}>
                    {pilot.status}
                  </span>
                  {pilot.status === 'Active' && <button className="btn btn-sm btn-outline">Approve Phase</button>}
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
                  <span style={{ fontWeight: '500' }}>{pilot.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill green" style={{ width: `${pilot.progress}%` }} />
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '6px', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Next Milestone: </span>
                <span style={{ fontWeight: '500' }}>{pilot.nextMilestone}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
