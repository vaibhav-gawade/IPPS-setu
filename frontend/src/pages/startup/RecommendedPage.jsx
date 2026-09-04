import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChallenges } from '../../data/mockData';
import { Sparkles, ChevronRight, Filter } from 'lucide-react';

export default function RecommendedPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  // Add mock match score to existing challenges for UI demo
  const recommendations = mockChallenges.map((c, i) => ({
    ...c,
    matchScore: 98 - i * 5,
    reasons: ['Skill match', 'Industry fit']
  }));

  const displayed = filter === 'All' ? recommendations : recommendations.filter(r => r.category === filter);

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Recommended Challenges</h1>
          <p className="section-subtitle">Opportunities tailored to your startup profile and capabilities</p>
        </div>
        <div className="section-actions">
          <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Defense">Defense</option>
            <option value="SpaceTech">SpaceTech</option>
            <option value="AI">AI</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {displayed.map(challenge => (
          <div key={challenge.id} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-submitted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> {challenge.matchScore}% Match
                </span>
                <code style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{challenge.id}</code>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{challenge.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                {challenge.description.slice(0, 150)}...
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {challenge.reasons.map(r => (
                  <span key={r} style={{ fontSize: '12px', padding: '4px 8px', background: 'var(--bg-card-hover)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    ✓ {r}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={() => navigate(`/startup/marketplace/${challenge.id}`)}>
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
