import { TrendingUp, BarChart, ExternalLink } from 'lucide-react';

export default function ScaleupPage() {
  const metrics = [
    { label: 'Current TRL', value: '7', subtitle: 'System Prototype Demonstration in Operational Environment' },
    { label: 'Target TRL', value: '9', subtitle: 'Actual System Proven Through Successful Mission Operations' },
    { label: 'Funding Required', value: '₹5 Cr', subtitle: 'For manufacturing and widespread deployment' }
  ];

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Scale-Up Opportunities</h1>
          <p className="section-subtitle">Accelerate your growth with targeted scale-up programs</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {metrics.map(m => (
          <div key={m.label} className="card">
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>{m.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--teal-400)', marginBottom: '8px' }}>{m.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.subtitle}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--teal-400)" /> Growth Milestones
          </h3>
          <div className="timeline-track" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', borderLeft: '2px solid var(--teal-500)', paddingLeft: '16px', paddingBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Complete Pilot 'AI Drones'</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Status: On Track (Oct 2024)</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', borderLeft: '2px dashed var(--border-color)', paddingLeft: '16px', paddingBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Achieve TRL 8</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Requirement: Final system completed and qualified</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', borderLeft: '2px dashed var(--border-color)', paddingLeft: '16px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Apply for iDEX Scale-up Grant</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Opens: Q1 2025</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart size={20} color="var(--teal-400)" /> Recommended Programs
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: '600' }}>iDEX PRIME</h4>
                <span className="badge badge-submitted">Matching: 92%</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Funding up to ₹10 Cr for deep-tech startups scaling defense technologies.</p>
              <button className="btn btn-secondary btn-sm">View Details <ExternalLink size={14} /></button>
            </div>
            <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: '600' }}>Startup India Seed Fund</h4>
                <span className="badge badge-submitted">Matching: 85%</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Financial assistance to startups for proof of concept, prototype development.</p>
              <button className="btn btn-secondary btn-sm">View Details <ExternalLink size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
