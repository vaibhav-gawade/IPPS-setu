import { useState } from 'react';
import { Search, MapPin, Tag, Briefcase, Eye, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const dpiitStartups = [
  { id: 'DIPP12345', name: 'NovaTech Solutions', sector: 'Defense & Aerospace', tech: 'AI / Computer Vision', state: 'Karnataka', founded: 2020 },
  { id: 'DIPP89234', name: 'SecureLink Networks', sector: 'Cybersecurity', tech: 'Cryptography', state: 'Maharashtra', founded: 2021 },
  { id: 'DIPP45901', name: 'AeroDynamics AI', sector: 'Aerospace', tech: 'Robotics & UAVs', state: 'Telangana', founded: 2019 },
  { id: 'DIPP23456', name: 'GreenEnergy IoT', sector: 'Renewable Energy', tech: 'IoT / Smart Grid', state: 'Tamil Nadu', founded: 2022 },
  { id: 'DIPP78912', name: 'DataShield Analytics', sector: 'Information Technology', tech: 'Big Data / AI', state: 'Delhi', founded: 2018 }
];

export default function StartupsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  const filtered = dpiitStartups.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesSector = sectorFilter === 'All' || s.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Startup Registry</h1>
          <p className="section-subtitle">Browse and filter DPIIT recognized startups for procurement</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', flex: 1, minWidth: '250px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search by name or DPIIT number..." 
            style={{ background: 'transparent', border: 'none', padding: '12px', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="form-select" 
          style={{ width: '200px' }} 
          value={sectorFilter} 
          onChange={e => setSectorFilter(e.target.value)}
        >
          <option value="All">All Sectors</option>
          <option value="Defense & Aerospace">Defense & Aerospace</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Aerospace">Aerospace</option>
          <option value="Renewable Energy">Renewable Energy</option>
          <option value="Information Technology">Information Technology</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Startup Details</th>
              <th>Sector & Tech</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ fontWeight: '600' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.id}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <Briefcase size={14} color="var(--text-muted)" /> {s.sector}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <Tag size={12} /> {s.tech}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <MapPin size={14} color="var(--text-muted)" /> {s.state}
                  </div>
                </td>
                <td>
                  <span className="badge badge-published" style={{ gap: '4px' }}><ShieldCheck size={12} /> DPIIT Recognized</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => alert(`Viewing details for ${s.name}`)}>
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No startups found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
