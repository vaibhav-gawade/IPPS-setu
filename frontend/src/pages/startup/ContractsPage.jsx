import { useState } from 'react';
import { FileSignature, Download, Search } from 'lucide-react';

export default function ContractsPage() {
  const [search, setSearch] = useState('');

  const contracts = [
    { id: 'CTR-2024-001', title: 'Procurement of AI Drones', agency: 'Ministry of Defense', value: '₹1.5 Cr', status: 'Active', date: '12 Aug 2024' },
    { id: 'CTR-2023-089', title: 'Cybersecurity Audit Software', agency: 'MeitY', value: '₹45 Lakhs', status: 'Completed', date: '04 Nov 2023' },
    { id: 'CTR-2024-042', title: 'Smart City Traffic Sensors', agency: 'MoHUA', value: '₹2.1 Cr', status: 'Pending Signature', date: '28 Sep 2024' }
  ];

  const filtered = contracts.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Contracts</h1>
          <p className="section-subtitle">View and manage your procurement contracts</p>
        </div>
      </div>

      <div className="search-bar" style={{ marginBottom: '24px', maxWidth: '400px', display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px' }}>
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search contracts..." 
          style={{ background: 'transparent', border: 'none', padding: '12px', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map(contract => (
          <div key={contract.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <code style={{ fontSize: '12px', color: 'var(--teal-400)' }}>{contract.id}</code>
                <span className={`badge ${contract.status === 'Active' ? 'badge-pilot' : contract.status === 'Completed' ? 'badge-shortlisted' : 'badge-submitted'}`}>
                  {contract.status}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{contract.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{contract.agency} • Signed: {contract.date}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Contract Value</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{contract.value}</div>
              </div>
              <button className="btn btn-secondary" title="Download PDF">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No contracts found matching your search.</div>
        )}
      </div>
    </div>
  );
}
