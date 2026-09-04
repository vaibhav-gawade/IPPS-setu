import { TrendingUp, BarChart, ExternalLink } from 'lucide-react';

export default function GovScaleupPage() {
  const projects = [
    { id: 'SCL-2024-001', title: 'AI Drones Deployment', startup: 'NovaTech Solutions', stage: 'Planning', targetTRL: 9, locations: '3 Border Commands' }
  ];

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Scale-Up Management</h1>
          <p className="section-subtitle">Oversee successful pilots transitioning to large scale deployments</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {projects.map(proc => (
          <div key={proc.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <code style={{ fontSize: '12px', color: 'var(--teal-400)' }}>{proc.id}</code>
                <span className="badge badge-pilot">
                  {proc.stage}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{proc.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Startup: {proc.startup} • Target TRL: {proc.targetTRL} • Locations: {proc.locations}</p>
            </div>
            
            <div>
              <button className="btn btn-secondary">
                Manage Project <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
