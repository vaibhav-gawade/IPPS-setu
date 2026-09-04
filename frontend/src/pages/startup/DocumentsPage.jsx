import { useState } from 'react';
import { Upload, FileText, Download, Trash2, ShieldCheck, Clock } from 'lucide-react';

export default function DocumentsPage() {
  const [docs, setDocs] = useState([
    { id: 1, name: 'Certificate of Incorporation.pdf', category: 'Legal', date: '12 Jan 2024', status: 'Verified' },
    { id: 2, name: 'DPIIT_Recognition_Certificate.pdf', category: 'Certifications', date: '05 Mar 2024', status: 'Verified' },
    { id: 3, name: 'Q3_Financial_Audit.pdf', category: 'Financial', date: '10 Oct 2024', status: 'Pending Review' }
  ]);

  const [category, setCategory] = useState('All');

  const handleUpload = () => {
    // Mock upload
    const newDoc = {
      id: Date.now(),
      name: `New_Document_${Math.floor(Math.random()*1000)}.pdf`,
      category: 'Other',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending Review'
    };
    setDocs([newDoc, ...docs]);
  };

  const handleDelete = (id) => {
    setDocs(docs.filter(d => d.id !== id));
  };

  const displayed = category === 'All' ? docs : docs.filter(d => d.category === category);

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Documents</h1>
          <p className="section-subtitle">Securely store and manage your corporate documents and compliance certificates</p>
        </div>
        <div className="section-actions">
          <button className="btn btn-primary" onClick={handleUpload}>
            <Upload size={16} /> Upload Document
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {['All', 'Legal', 'Certifications', 'Financial', 'Other'].map(c => (
          <button 
            key={c}
            className={`btn ${category === c ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {displayed.map(doc => (
          <div key={doc.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'var(--bg-card-hover)', padding: '12px', borderRadius: '8px', color: 'var(--teal-400)' }}>
                <FileText size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{doc.name}</h4>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>{doc.category}</span>
                  <span>Uploaded: {doc.date}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px',
                color: doc.status === 'Verified' ? 'var(--green-400)' : 'var(--amber-400)'
              }}>
                {doc.status === 'Verified' ? <ShieldCheck size={14} /> : <Clock size={14} />}
                {doc.status}
              </span>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-sm btn-secondary" title="Download"><Download size={14} /></button>
                <button className="btn btn-sm btn-secondary" title="Delete" onClick={() => handleDelete(doc.id)} style={{ color: 'var(--red-400)' }}><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <div className="empty-state-title">No documents found</div>
            <p>Upload documents to this category to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
