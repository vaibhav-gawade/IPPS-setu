import { Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';

export default function MatchingPage() {
  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">AI Matching Engine</h1>
          <p className="section-subtitle">Understand how your startup matches with procurement opportunities</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', 
            border: '8px solid var(--teal-500)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)' }}>87%</span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Profile Strength</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your profile is highly optimized for AI/ML and Defense tech challenges.</p>
          <button className="btn btn-primary" style={{ width: '100%' }}>Improve Match Score</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Matching Criteria Breakdown</h3>
          {[
            { label: 'Technical Capabilities', score: 95, icon: Zap },
            { label: 'Past Performance', score: 70, icon: TrendingUp },
            { label: 'Certifications (DPIIT, GeM)', score: 100, icon: CheckCircle },
            { label: 'Team Expertise', score: 85, icon: Target }
          ].map(criterion => (
            <div key={criterion.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '8px', color: 'var(--teal-400)' }}>
                <criterion.icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>{criterion.label}</span>
                  <span style={{ fontWeight: '600', color: 'var(--teal-400)' }}>{criterion.score}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${criterion.score}%`, background: 'var(--teal-500)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
