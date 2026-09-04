import { Zap, MapPin, Briefcase, Award } from 'lucide-react';

export default function GovMatchingPage() {
  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">AI Matching Engine</h1>
          <p className="section-subtitle">Algorithmic capability matching between challenges and startups (Derived Scores)</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Top Match</h3>
          <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
            <div style={{ 
              width: '100px', height: '100px', borderRadius: '50%', 
              border: '6px solid var(--teal-500)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--teal-400)' }}>91%</span>
            </div>
            <div style={{ fontWeight: '600', fontSize: '18px' }}>NovaTech Solutions</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Matched for: AI Surveillance Challenge</div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
            * This score is algorithmically derived based on profile parameters.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Matching Breakdown</h3>
          {[
            { label: 'Technology Match (AI/Computer Vision)', score: 95, icon: Zap },
            { label: 'Sector Match (Defense)', score: 90, icon: Briefcase },
            { label: 'Location Match (Karnataka)', score: 100, icon: MapPin },
            { label: 'Experience Match', score: 80, icon: Award }
          ].map(criterion => (
            <div key={criterion.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '8px', color: 'var(--teal-400)' }}>
                <criterion.icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{criterion.label}</span>
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
