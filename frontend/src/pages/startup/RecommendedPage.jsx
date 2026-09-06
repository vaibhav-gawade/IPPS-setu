import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChallenges } from '../../data/mockData';
import { Sparkles, ChevronRight, ChevronDown } from 'lucide-react';

export default function RecommendedPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const recommendations = mockChallenges.map((c, i) => ({
    ...c,
    matchScore: 98 - i * 5,
    reasons: ['Skill match', 'Industry fit'],
  }));

  const displayed =
    filter === 'All'
      ? recommendations
      : recommendations.filter((r) => r.category === filter);

  const filterOptions = [
    { value: 'All', label: 'All Categories' },
    { value: 'Defense', label: 'Defense' },
    { value: 'SpaceTech', label: 'SpaceTech' },
    { value: 'AI', label: 'AI' },
  ];

  const selectedFilter =
    filterOptions.find((option) => option.value === filter)?.label ||
    'All Categories';

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Recommended Challenges</h1>

          <p className="section-subtitle">
            Opportunities tailored to your startup profile and capabilities
          </p>
        </div>

        <div className="section-actions">
          <div className="custom-filter-dropdown">
            <button
              type="button"
              className={`custom-filter-trigger ${
                dropdownOpen
                  ? 'custom-filter-trigger-open'
                  : ''
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{selectedFilter}</span>

              <ChevronDown
                size={16}
                className={`custom-filter-arrow ${
                  dropdownOpen
                    ? 'custom-filter-arrow-open'
                    : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="custom-filter-menu">
                {filterOptions.map((option) => {
                  const isSelected = filter === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`custom-filter-option ${
                        isSelected
                          ? 'custom-filter-option-selected'
                          : ''
                      }`}
                      onClick={() => {
                        setFilter(option.value);
                        setDropdownOpen(false);
                      }}
                    >
                      <span>{option.label}</span>

                      {isSelected && (
                        <span className="custom-filter-check">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {displayed.map((challenge) => (
          <div
            key={challenge.id}
            className="card"
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  className="badge badge-submitted"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Sparkles size={12} />
                  {challenge.matchScore}% Match
                </span>

                <code
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {challenge.id}
                </code>
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}
              >
                {challenge.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                }}
              >
                {(challenge.description || 'No description available').slice(
                  0,
                  150
                )}
                ...
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {challenge.reasons.map((reason) => (
                  <span
                    key={reason}
                    style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      background: 'var(--bg-card-hover)',
                      borderRadius: '4px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    ✓ {reason}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/startup/marketplace/${challenge.id}`)
                }
              >
                View Details
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}