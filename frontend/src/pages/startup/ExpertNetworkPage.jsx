import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { expertsAPI } from '../../services/api';
import { mockApplications, mockChallenges, mockPilots } from '../../data/mockData';
import {
  expertIndustries,
  expertExpertiseTags,
  expertSectors,
  mentorshipStages,
} from '../../data/expertMentors';
import { applyExpertFilters } from '../../lib/expertMatching';
import ExpertCard from '../../components/ExpertCard';
import {
  Search,
  Sparkles,
  X,
  Loader2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Info,
  Send,
  ChevronDown,
  Check,
} from 'lucide-react';

const MY_STARTUP_ID = 'ST-003';

const mentorshipStageIcons = {
  Requested: Send,
  Scheduled: CalendarCheck,
  Completed: CheckCircle2,
};

function useMyEngagements(proposals) {
  return useMemo(() => {
    const fromApps = [
      ...proposals,
      ...mockApplications.filter(a => a.startupId === MY_STARTUP_ID),
    ]
      .map(a => ({
        key: a.challengeId,
        kind: 'Application',
        label:
          mockChallenges.find(c => c.id === a.challengeId)?.title ||
          a.challengeId,
        status: a.status,
      }));

    const fromPilots = mockPilots
      .filter(
        p => p.startupId === MY_STARTUP_ID || p.id === 'PIL-2024-001'
      )
      .map(p => ({
        key: p.challengeId,
        kind: 'Pilot',
        label: p.challengeTitle,
        status: p.status,
      }));

    const seen = new Set();

    return [...fromApps, ...fromPilots].filter(e =>
      seen.has(e.key) ? false : seen.add(e.key)
    );
  }, [proposals]);
}

export default function ExpertNetworkPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const {
    proposals,
    mentorships,
    requestMentorship,
    updateMentorshipStatus,
    saveMentorshipOutcome,
    showNotification,
  } = useApp();

  const engagements = useMyEngagements(proposals);

  const [tab, setTab] = useState('recommended');

  const [challengeId, setChallengeId] = useState(
    params.get('challenge') ||
      engagements[0]?.key ||
      'CH-2024-003'
  );

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [expertise, setExpertise] = useState('');
  const [sector, setSector] = useState('');
  const [minScore, setMinScore] = useState('');

  const [requestFor, setRequestFor] = useState(null);
  const [reason, setReason] = useState('');
  const [sending, setSending] = useState(false);
  const [outcomeDraft, setOutcomeDraft] = useState({});

  const [openDropdown, setOpenDropdown] = useState(null);

  const challenge = mockChallenges.find(c => c.id === challengeId);

  useEffect(() => {
    let alive = true;

    setLoading(true);
    setFailed(false);

    expertsAPI
      .getRecommended(challengeId)
      .then(list => {
        if (alive) {
          setExperts(list);
          setLoading(false);
        }
      })
      .catch(() => {
        if (alive) {
          setFailed(true);
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [challengeId]);

  const filtered = applyExpertFilters(experts, {
    industry,
    expertise,
    sector,
    minScore,
    search,
  });

  const recommended = filtered.slice(0, 4);

  const statusFor = expertId =>
    mentorships.find(
      m =>
        m.expertId === expertId &&
        m.challengeId === challengeId
    )?.status;

  const openRequest = expert => {
    setRequestFor(expert);
    setReason('');
  };

  const submitRequest = async e => {
    e.preventDefault();

    if (reason.trim().length < 10) {
      showNotification(
        'Add a short reason (min 10 characters) for the mentorship request.',
        'error'
      );
      return;
    }

    setSending(true);

    try {
      const res = await expertsAPI.requestMentorship({
        expertId: requestFor.id,
        expertName: requestFor.name,
        mentorshipType: requestFor.mentorship,
        challengeId,
        challengeTitle: challenge?.title || challengeId,
        reason: reason.trim(),
      });

      requestMentorship(res.request);

      showNotification(
        `Mentorship request sent to ${requestFor.name}`,
        'success'
      );

      setRequestFor(null);
      setTab('mentorships');
    } catch {
      showNotification(
        'Could not send the request. Please retry.',
        'error'
      );
    } finally {
      setSending(false);
    }
  };

  const advance = async (m, next) => {
    const res = await expertsAPI.updateMentorship(m.id, next);

    updateMentorshipStatus(
      m.id,
      next,
      res.scheduledFor
    );

    showNotification(
      next === 'Scheduled'
        ? `Session scheduled with ${m.expertName}`
        : `Session with ${m.expertName} marked complete`,
      'success'
    );
  };

  const saveOutcome = m => {
    const draft = outcomeDraft[m.id] || {};

    if (!draft.keyAdvice?.trim()) {
      showNotification(
        'Record at least the key advice from the session.',
        'error'
      );
      return;
    }

    saveMentorshipOutcome(m.id, {
      keyAdvice: draft.keyAdvice.trim(),
      recommendedActions: (
        draft.recommendedActions || ''
      ).trim(),
      expectedImpact: (
        draft.expectedImpact || ''
      ).trim(),
      nextSteps: (draft.nextSteps || '').trim(),
    });

    showNotification(
      'Mentorship outcomes recorded',
      'success'
    );
  };

  const setDraft = (id, field) => e =>
    setOutcomeDraft(d => ({
      ...d,
      [id]: {
        ...(d[id] || {}),
        [field]: e.target.value,
      },
    }));

  const clearFilters = () => {
    setSearch('');
    setIndustry('');
    setExpertise('');
    setSector('');
    setMinScore('');
  };

  const toggleDropdown = name => {
    setOpenDropdown(
      openDropdown === name ? null : name
    );
  };

  const challengeLabel =
    engagements.find(e => e.key === challengeId)?.label ||
    mockChallenges.find(c => c.id === challengeId)?.title ||
    challengeId;

  const industryLabel =
    industry || 'All Industries';

  const expertiseLabel =
    expertise || 'All Expertise';

  const sectorLabel =
    sector || 'All Challenge Sectors';

  const scoreLabel =
    minScore
      ? `${minScore}% and above`
      : 'Any Match Score';

  return (
    <div
      className="page-enter"
      data-testid="expert-network-page"
    >
      <div className="section-header">
        <div>
          <h1
            className="section-title"
            data-testid="expert-network-title"
          >
            Expert Network
          </h1>

          <p className="section-subtitle">
            Experienced entrepreneurs and domain experts matched
            to your selected government challenge
          </p>
        </div>

        <div className="section-actions">
          <span
            className="badge badge-pilot"
            data-testid="demo-data-badge"
          >
            Demo profiles only
          </span>
        </div>
      </div>

      {/* Challenge context */}
      <div
        className="card"
        style={{ marginBottom: 20 }}
        data-testid="expert-context-card"
      >
        <div className="card-header">
          <span className="card-title">
            Mentorship context — active application / pilot
          </span>
        </div>

        <div
          className="filter-row"
          style={{ marginTop: 10 }}
        >
          <div
            className="custom-filter-dropdown"
            style={{ minWidth: 240, flex: 1 }}
          >
            <button
              type="button"
              className={`custom-filter-trigger ${
                openDropdown === 'challenge'
                  ? 'custom-filter-trigger-open'
                  : ''
              }`}
              onClick={() =>
                toggleDropdown('challenge')
              }
              data-testid="expert-challenge-select"
            >
              <span>{challengeLabel}</span>

              <ChevronDown
                size={16}
                className={`custom-filter-arrow ${
                  openDropdown === 'challenge'
                    ? 'custom-filter-arrow-open'
                    : ''
                }`}
              />
            </button>

            {openDropdown === 'challenge' && (
              <div className="custom-filter-menu">
                {engagements.map(en => (
                  <button
                    key={en.key}
                    type="button"
                    className={`custom-filter-option ${
                      challengeId === en.key
                        ? 'custom-filter-option-selected'
                        : ''
                    }`}
                    onClick={() => {
                      setChallengeId(en.key);
                      setParams({
                        challenge: en.key,
                      });
                      setOpenDropdown(null);
                    }}
                  >
                    <span>
                      {en.kind} · {en.label} ({en.status})
                    </span>

                    {challengeId === en.key && (
                      <Check
                        size={14}
                        className="custom-filter-check"
                      />
                    )}
                  </button>
                ))}

                {mockChallenges
                  .filter(
                    c =>
                      !engagements.some(
                        e => e.key === c.id
                      )
                  )
                  .map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={`custom-filter-option ${
                        challengeId === c.id
                          ? 'custom-filter-option-selected'
                          : ''
                      }`}
                      onClick={() => {
                        setChallengeId(c.id);
                        setParams({
                          challenge: c.id,
                        });
                        setOpenDropdown(null);
                      }}
                    >
                      <span>
                        Challenge · {c.title}
                      </span>

                      {challengeId === c.id && (
                        <Check
                          size={14}
                          className="custom-filter-check"
                        />
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {challenge && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginTop: 12,
            }}
            data-testid="expert-context-tags"
          >
            <span className="tag teal">
              {challenge.sector}
            </span>

            {(challenge.tags || []).map(t => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}

            <span className="tag orange">
              {challenge.status}
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[
          ['recommended', 'Recommended'],
          ['directory', 'All Experts'],
          [
            'mentorships',
            `My Mentorships${
              mentorships.length
                ? ` (${mentorships.length})`
                : ''
            }`,
          ],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn ${
              tab === key ? 'active' : ''
            }`}
            onClick={() => setTab(key)}
            data-testid={`expert-tab-${key}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab !== 'mentorships' && (
        <>
          <div
            className="filter-row"
            style={{ margin: '18px 0' }}
          >
            <div className="search-bar">
              <Search size={15} />

              <input
                placeholder="Search experts, expertise, companies..."
                value={search}
                onChange={e =>
                  setSearch(e.target.value)
                }
                data-testid="expert-search-input"
              />
            </div>

            {/* Industry */}
            <div className="custom-filter-dropdown">
              <button
                type="button"
                className={`custom-filter-trigger ${
                  openDropdown === 'industry'
                    ? 'custom-filter-trigger-open'
                    : ''
                }`}
                onClick={() =>
                  toggleDropdown('industry')
                }
              >
                <span>{industryLabel}</span>

                <ChevronDown
                  size={16}
                  className={`custom-filter-arrow ${
                    openDropdown === 'industry'
                      ? 'custom-filter-arrow-open'
                      : ''
                  }`}
                />
              </button>

              {openDropdown === 'industry' && (
                <div className="custom-filter-menu">
                  <button
                    type="button"
                    className={`custom-filter-option ${
                      industry === ''
                        ? 'custom-filter-option-selected'
                        : ''
                    }`}
                    onClick={() => {
                      setIndustry('');
                      setOpenDropdown(null);
                    }}
                  >
                    <span>All Industries</span>
                    {industry === '' && (
                      <Check
                        size={14}
                        className="custom-filter-check"
                      />
                    )}
                  </button>

                  {expertIndustries.map(i => (
                    <button
                      key={i}
                      type="button"
                      className={`custom-filter-option ${
                        industry === i
                          ? 'custom-filter-option-selected'
                          : ''
                      }`}
                      onClick={() => {
                        setIndustry(i);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{i}</span>

                      {industry === i && (
                        <Check
                          size={14}
                          className="custom-filter-check"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Expertise */}
            <div className="custom-filter-dropdown">
              <button
                type="button"
                className={`custom-filter-trigger ${
                  openDropdown === 'expertise'
                    ? 'custom-filter-trigger-open'
                    : ''
                }`}
                onClick={() =>
                  toggleDropdown('expertise')
                }
              >
                <span>{expertiseLabel}</span>

                <ChevronDown
                  size={16}
                  className={`custom-filter-arrow ${
                    openDropdown === 'expertise'
                      ? 'custom-filter-arrow-open'
                      : ''
                  }`}
                />
              </button>

              {openDropdown === 'expertise' && (
                <div className="custom-filter-menu">
                  <button
                    type="button"
                    className={`custom-filter-option ${
                      expertise === ''
                        ? 'custom-filter-option-selected'
                        : ''
                    }`}
                    onClick={() => {
                      setExpertise('');
                      setOpenDropdown(null);
                    }}
                  >
                    <span>All Expertise</span>

                    {expertise === '' && (
                      <Check
                        size={14}
                        className="custom-filter-check"
                      />
                    )}
                  </button>

                  {expertExpertiseTags.map(x => (
                    <button
                      key={x}
                      type="button"
                      className={`custom-filter-option ${
                        expertise === x
                          ? 'custom-filter-option-selected'
                          : ''
                      }`}
                      onClick={() => {
                        setExpertise(x);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{x}</span>

                      {expertise === x && (
                        <Check
                          size={14}
                          className="custom-filter-check"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sector */}
            <div className="custom-filter-dropdown">
              <button
                type="button"
                className={`custom-filter-trigger ${
                  openDropdown === 'sector'
                    ? 'custom-filter-trigger-open'
                    : ''
                }`}
                onClick={() =>
                  toggleDropdown('sector')
                }
              >
                <span>{sectorLabel}</span>

                <ChevronDown
                  size={16}
                  className={`custom-filter-arrow ${
                    openDropdown === 'sector'
                      ? 'custom-filter-arrow-open'
                      : ''
                  }`}
                />
              </button>

              {openDropdown === 'sector' && (
                <div className="custom-filter-menu">
                  <button
                    type="button"
                    className={`custom-filter-option ${
                      sector === ''
                        ? 'custom-filter-option-selected'
                        : ''
                    }`}
                    onClick={() => {
                      setSector('');
                      setOpenDropdown(null);
                    }}
                  >
                    <span>
                      All Challenge Sectors
                    </span>

                    {sector === '' && (
                      <Check
                        size={14}
                        className="custom-filter-check"
                      />
                    )}
                  </button>

                  {expertSectors.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`custom-filter-option ${
                        sector === s
                          ? 'custom-filter-option-selected'
                          : ''
                      }`}
                      onClick={() => {
                        setSector(s);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{s}</span>

                      {sector === s && (
                        <Check
                          size={14}
                          className="custom-filter-check"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Score */}
            <div className="custom-filter-dropdown">
              <button
                type="button"
                className={`custom-filter-trigger ${
                  openDropdown === 'score'
                    ? 'custom-filter-trigger-open'
                    : ''
                }`}
                onClick={() =>
                  toggleDropdown('score')
                }
              >
                <span>{scoreLabel}</span>

                <ChevronDown
                  size={16}
                  className={`custom-filter-arrow ${
                    openDropdown === 'score'
                      ? 'custom-filter-arrow-open'
                      : ''
                  }`}
                />
              </button>

              {openDropdown === 'score' && (
                <div className="custom-filter-menu">
                  <button
                    type="button"
                    className={`custom-filter-option ${
                      minScore === ''
                        ? 'custom-filter-option-selected'
                        : ''
                    }`}
                    onClick={() => {
                      setMinScore('');
                      setOpenDropdown(null);
                    }}
                  >
                    <span>Any Match Score</span>

                    {minScore === '' && (
                      <Check
                        size={14}
                        className="custom-filter-check"
                      />
                    )}
                  </button>

                  {[95, 90, 85, 80].map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`custom-filter-option ${
                        minScore === String(s)
                          ? 'custom-filter-option-selected'
                          : ''
                      }`}
                      onClick={() => {
                        setMinScore(String(s));
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{s}% and above</span>

                      {minScore === String(s) && (
                        <Check
                          size={14}
                          className="custom-filter-check"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="btn btn-sm btn-secondary"
              onClick={clearFilters}
              data-testid="expert-clear-filters-button"
            >
              <X size={13} /> Clear
            </button>
          </div>

          {loading && (
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
              }}
              data-testid="expert-loading"
            >
              Matching experts to this challenge…
            </p>
          )}

          {!loading && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(min(420px, 100%), 1fr))',
                gap: 16,
              }}
              data-testid="expert-grid"
            >
              {(tab === 'recommended'
                ? recommended
                : filtered
              ).map(expert => (
                <ExpertCard
                  key={expert.id}
                  expert={expert}
                  onRequest={openRequest}
                  requestStatus={statusFor(expert.id)}
                />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div
              className="empty-state"
              data-testid="expert-empty-state"
            >
              <div className="empty-state-icon">
                🤝
              </div>

              <div className="empty-state-title">
                {failed
                  ? 'Expert directory unavailable'
                  : 'No experts match these filters'}
              </div>

              <p style={{ marginBottom: 16 }}>
                {failed
                  ? 'Reconnect to load the network.'
                  : 'Widen the expertise, sector or match-score filters.'}
              </p>

              {!failed && (
                <button
                  className="btn btn-primary"
                  onClick={clearFilters}
                  data-testid="expert-empty-clear-button"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Mentorships */}
      {tab === 'mentorships' && (
        <div
          style={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
          data-testid="mentorship-list"
        >
          {mentorships.length === 0 && (
            <div
              className="empty-state"
              data-testid="mentorship-empty-state"
            >
              <div className="empty-state-icon">
                🧭
              </div>

              <div className="empty-state-title">
                No mentorship requests yet
              </div>

              <p style={{ marginBottom: 16 }}>
                Request a session from a recommended expert
                to start tracking guidance.
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  setTab('recommended')
                }
                data-testid="mentorship-empty-browse-button"
              >
                See Recommended Experts
              </button>
            </div>
          )}

          {mentorships.map(m => {
            const stageIdx =
              mentorshipStages.indexOf(m.status);

            const draft =
              outcomeDraft[m.id] || {};

            return (
              <div
                className="card"
                key={m.id}
                data-testid={`mentorship-card-${m.id}`}
              >
                <div className="challenge-card-header">
                  <div>
                    <code
                      style={{
                        fontSize: 11.5,
                        color: 'var(--teal-600)',
                      }}
                    >
                      {m.id}
                    </code>

                    <div
                      className="challenge-card-title"
                      style={{ marginTop: 4 }}
                    >
                      {m.expertName}
                    </div>

                    <div
                      style={{
                        fontSize: 11.5,
                        color: 'var(--text-muted)',
                        marginTop: 2,
                      }}
                    >
                      {m.mentorshipType} ·{' '}
                      {m.challengeTitle}
                    </div>
                  </div>

                  <span
                    className={`badge ${
                      m.status === 'Completed'
                        ? 'badge-completed'
                        : m.status === 'Scheduled'
                        ? 'badge-active'
                        : 'badge-submitted'
                    }`}
                    data-testid={`mentorship-status-${m.id}`}
                  >
                    {m.status}
                  </span>
                </div>

                <div
                  className="timeline-track"
                  style={{
                    gridTemplateColumns: `repeat(${mentorshipStages.length}, minmax(0, 1fr))`,
                    marginTop: 16,
                  }}
                  data-testid={`mentorship-timeline-${m.id}`}
                >
                  {mentorshipStages.map((s, i) => {
                    const StageIcon =
                      mentorshipStageIcons[s];

                    const state =
                      i < stageIdx
                        ? 'completed'
                        : i === stageIdx
                        ? 'active'
                        : 'pending';

                    return (
                      <div
                        key={s}
                        className={`timeline-node ${
                          i <= stageIdx
                            ? 'seg-in-done'
                            : ''
                        } ${
                          i < stageIdx
                            ? 'seg-out-done'
                            : ''
                        }`}
                        title={s}
                      >
                        <div
                          className={`timeline-node-dot ${state}`}
                        >
                          <StageIcon
                            size={16}
                            strokeWidth={2.2}
                          />
                        </div>

                        <div
                          className={`timeline-node-label ${state}`}
                        >
                          {s}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  <strong
                    style={{
                      color: 'var(--text-primary)',
                    }}
                  >
                    Reason:
                  </strong>{' '}
                  {m.reason}
                </div>

                {m.scheduledFor && (
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      marginTop: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <CalendarCheck size={13} />
                    Session slot: {m.scheduledFor}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 14,
                    flexWrap: 'wrap',
                  }}
                >
                  {m.status === 'Requested' && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        advance(m, 'Scheduled')
                      }
                      data-testid={`mentorship-schedule-button-${m.id}`}
                    >
                      <CalendarCheck size={13} />
                      Mark Scheduled
                    </button>
                  )}

                  {m.status === 'Scheduled' && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        advance(m, 'Completed')
                      }
                      data-testid={`mentorship-complete-button-${m.id}`}
                    >
                      <CheckCircle2 size={13} />
                      Session Completed
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() =>
                      navigate(
                        `/startup/experts/${m.expertId}`
                      )
                    }
                    data-testid={`mentorship-view-expert-${m.id}`}
                  >
                    View Expert
                  </button>
                </div>

                {m.status === 'Completed' && (
                  <>
                    <div className="divider" />

                    <div
                      className="card-title"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 10,
                      }}
                    >
                      <ClipboardList
                        size={14}
                        style={{
                          color: 'var(--purple-500)',
                        }}
                      />
                      Mentorship Outcomes
                    </div>

                    {m.outcome ? (
                      <div
                        className="grid-2"
                        data-testid={`mentorship-outcome-${m.id}`}
                      >
                        {[
                          [
                            'Key Advice',
                            m.outcome.keyAdvice,
                          ],
                          [
                            'Recommended Actions',
                            m.outcome.recommendedActions,
                          ],
                          [
                            'Expected Impact',
                            m.outcome.expectedImpact,
                          ],
                          [
                            'Next Steps',
                            m.outcome.nextSteps,
                          ],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            style={{
                              marginBottom: 10,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 10.5,
                                letterSpacing: '0.06em',
                                textTransform:
                                  'uppercase',
                                color:
                                  'var(--text-muted)',
                              }}
                            >
                              {label}
                            </div>

                            <div
                              style={{
                                fontSize: 13,
                                color:
                                  'var(--text-primary)',
                                lineHeight: 1.55,
                              }}
                            >
                              {value || '—'}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        data-testid={`mentorship-outcome-form-${m.id}`}
                      >
                        <div className="form-row cols-2">
                          <div className="form-group">
                            <label className="form-label">
                              Key Advice *
                            </label>

                            <textarea
                              className="form-textarea"
                              rows={3}
                              value={
                                draft.keyAdvice || ''
                              }
                              onChange={setDraft(
                                m.id,
                                'keyAdvice'
                              )}
                              placeholder="What was the most important guidance from the session?"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              Recommended Actions
                            </label>

                            <textarea
                              className="form-textarea"
                              rows={3}
                              value={
                                draft.recommendedActions ||
                                ''
                              }
                              onChange={setDraft(
                                m.id,
                                'recommendedActions'
                              )}
                              placeholder="Concrete actions the expert recommended"
                            />
                          </div>
                        </div>

                        <div className="form-row cols-2">
                          <div className="form-group">
                            <label className="form-label">
                              Expected Impact
                            </label>

                            <textarea
                              className="form-textarea"
                              rows={3}
                              value={
                                draft.expectedImpact || ''
                              }
                              onChange={setDraft(
                                m.id,
                                'expectedImpact'
                              )}
                              placeholder="Expected effect on the pilot or proposal"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              Next Steps
                            </label>

                            <textarea
                              className="form-textarea"
                              rows={3}
                              value={
                                draft.nextSteps || ''
                              }
                              onChange={setDraft(
                                m.id,
                                'nextSteps'
                              )}
                              placeholder="What happens before the next session"
                            />
                          </div>
                        </div>

                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            saveOutcome(m)
                          }
                        >
                          Save Outcomes
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Request modal */}
      {requestFor && (
        <div
          className="modal-overlay"
          onClick={() => setRequestFor(null)}
          data-testid="mentorship-request-modal"
        >
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 560 }}
          >
            <div className="modal-header">
              <div>
                <div className="modal-title">
                  Request Mentorship
                </div>

                <div
                  style={{
                    fontSize: 12.5,
                    color: 'var(--text-muted)',
                    marginTop: 2,
                  }}
                >
                  {requestFor.name} ·{' '}
                  {requestFor.mentorship}
                </div>
              </div>

              <button
                className="btn btn-icon btn-secondary"
                onClick={() => setRequestFor(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div
              className="info-banner"
              style={{ marginBottom: 16 }}
            >
              <Sparkles
                size={14}
                style={{
                  color: 'var(--orange-500)',
                  flexShrink: 0,
                }}
              />

              <span>
                <strong
                  style={{
                    color: 'var(--teal-600)',
                  }}
                >
                  {requestFor.computedScore ??
                    requestFor.matchScore}
                  % Match
                </strong>{' '}
                —{' '}
                {requestFor.explanation ||
                  requestFor.matchReason}
              </span>
            </div>

            <form onSubmit={submitRequest}>
              <div className="form-group">
                <label className="form-label">
                  Challenge / Pilot context
                </label>

                <input
                  className="form-input"
                  value={
                    challenge?.title || challengeId
                  }
                  readOnly
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Reason for request *
                </label>

                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="What guidance do you need?"
                  value={reason}
                  onChange={e =>
                    setReason(e.target.value)
                  }
                />

                <div className="form-hint">
                  {reason.length} characters
                </div>
              </div>

              <div
                style={{
                  fontSize: 11.5,
                  color: 'var(--text-muted)',
                  display: 'flex',
                  gap: 6,
                  alignItems: 'flex-start',
                  marginBottom: 14,
                }}
              >
                <Info size={13} />

                Demo experts are fictional profiles used
                to showcase the matching and mentorship flow.
                No message is sent outside IPPS Setu.
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setRequestFor(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <Loader2
                        size={14}
                        style={{
                          animation:
                            'spin 1s linear infinite',
                        }}
                      />
                      Sending…
                    </>
                  ) : (
                    'Send Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}