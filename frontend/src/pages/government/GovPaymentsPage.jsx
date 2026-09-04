import { useState } from 'react';
import { CreditCard, CheckCircle, Clock } from 'lucide-react';

export default function GovPaymentsPage() {
  const [tab, setTab] = useState('All');

  const payments = [
    { id: 'PAY-8910', invoice: 'INV-2024-001', startup: 'NovaTech Solutions', amount: '₹50,00,000', date: '15 Sep 2024', status: 'Completed' },
    { id: 'PAY-8911', invoice: 'INV-2024-002', startup: 'NovaTech Solutions', amount: '₹50,00,000', date: 'Expected 15 Oct 2024', status: 'Pending' },
    { id: 'PAY-7822', invoice: 'INV-2023-014', startup: 'SecureLink Networks', amount: '₹15,00,000', date: '10 Dec 2023', status: 'Completed' }
  ];

  const displayed = tab === 'All' ? payments : payments.filter(p => p.status === tab);

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Payments</h1>
          <p className="section-subtitle">Manage payments and disbursals to startups</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {['All', 'Pending', 'Completed'].map(t => (
          <button 
            key={t} 
            className={`btn ${tab === t ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-table-head)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>Transaction ID</th>
              <th style={{ padding: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>Startup / Invoice</th>
              <th style={{ padding: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>Amount</th>
              <th style={{ padding: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map(pay => (
              <tr key={pay.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px' }}><code style={{ color: 'var(--teal-400)' }}>{pay.id}</code></td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500' }}>{pay.startup}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{pay.invoice}</div>
                </td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{pay.date}</td>
                <td style={{ padding: '16px', fontWeight: '600' }}>{pay.amount}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                    background: pay.status === 'Completed' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                    color: pay.status === 'Completed' ? 'var(--green-400)' : 'var(--amber-400)'
                  }}>
                    {pay.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
