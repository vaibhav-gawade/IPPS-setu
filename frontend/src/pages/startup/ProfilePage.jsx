import { useState } from 'react';
import { Save, User, Building, MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'NovaTech Solutions',
    description: 'An AI and Robotics startup focused on autonomous systems for defense and civilian applications.',
    industry: 'Aerospace & Defense',
    founded: '2020',
    dpiit: 'DIPP12345',
    website: 'https://novatech.example.com',
    email: 'contact@novatech.example.com',
    phone: '+91 9876543210',
    address: 'Bengaluru, Karnataka, India',
    teamSize: '15-50'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, API call goes here
    setIsEditing(false);
  };

  return (
    <div className="page-enter">
      <div className="section-header">
        <div>
          <h1 className="section-title">Company Profile</h1>
          <p className="section-subtitle">Manage your startup details, certifications, and public information</p>
        </div>
        <div className="section-actions">
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--teal-500)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            NT
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>{profile.name}</h2>
          <span className="badge badge-submitted" style={{ marginBottom: '16px' }}>DPIIT Recognised</span>
          
          <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)' }}><Mail size={16} /> <span style={{ fontSize: '14px' }}>{profile.email}</span></div>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)' }}><Phone size={16} /> <span style={{ fontSize: '14px' }}>{profile.phone}</span></div>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)' }}><Globe size={16} /> <span style={{ fontSize: '14px' }}>{profile.website.replace('https://', '')}</span></div>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)' }}><MapPin size={16} /> <span style={{ fontSize: '14px' }}>{profile.address}</span></div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Company Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Company Name</label>
              {isEditing ? (
                <input type="text" name="name" value={profile.name} onChange={handleChange} style={{ width: '100%', padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
              ) : (
                <div style={{ fontSize: '15px' }}>{profile.name}</div>
              )}
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Description</label>
              {isEditing ? (
                <textarea name="description" value={profile.description} onChange={handleChange} rows={3} style={{ width: '100%', padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
              ) : (
                <div style={{ fontSize: '15px' }}>{profile.description}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Industry</label>
              {isEditing ? (
                <input type="text" name="industry" value={profile.industry} onChange={handleChange} style={{ width: '100%', padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
              ) : (
                <div style={{ fontSize: '15px' }}>{profile.industry}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>DPIIT Number</label>
              {isEditing ? (
                <input type="text" name="dpiit" value={profile.dpiit} onChange={handleChange} style={{ width: '100%', padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
              ) : (
                <div style={{ fontSize: '15px' }}>{profile.dpiit}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Founded Year</label>
              {isEditing ? (
                <input type="text" name="founded" value={profile.founded} onChange={handleChange} style={{ width: '100%', padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }} />
              ) : (
                <div style={{ fontSize: '15px' }}>{profile.founded}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Team Size</label>
              {isEditing ? (
                <select name="teamSize" value={profile.teamSize} onChange={handleChange} style={{ width: '100%', padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                </select>
              ) : (
                <div style={{ fontSize: '15px' }}>{profile.teamSize}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
