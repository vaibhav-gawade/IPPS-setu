import { useState } from 'react';
import { ShoppingCart, Download, Shield, Eye } from 'lucide-react';

export default function ProcurementPage() {
  const procurements = [
    { id: 'PRC-2024-001', title: 'AI Drones Batch 1', startup: 'NovaTech Solutions', stage: 'Contract Signed', value: '₹1.5 Cr', date: '12 Aug 2024' },
    { id: 'PRC-2024-002', title: 'Secure Comms Hardware', startup: 'SecureLink Networks', stage: 'Negotiation', value: '₹80 Lakhs', date: '05 Sep 2024' }
  ];

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Procurement</h1>
          <p className="section-subtitle">Manage procurement processes for successful pilot projects</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {procurements.map(proc => (
          <div key={proc.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <code style={{ fontSize: '12px', color: 'var(--teal-400)' }}>{proc.id}</code>
                <span className={`badge ${proc.stage === 'Contract Signed' ? 'badge-completed' : 'badge-pending'}`}>
                  {proc.stage}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{proc.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Startup: {proc.startup} • Initiated: {proc.date}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Value</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{proc.value}</div>
              </div>
              <button className="btn btn-primary" title="View Process">
                <Eye size={18} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
