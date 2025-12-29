import React from 'react';

const Home = ({ onStart }) => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Virtual CISO & GRC Advisor
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6' }}>
                    Secure your startup from Day 1. <br />
                    Get a tailored Governance, Risk, and Compliance roadmap in under 2 minutes.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                    <div className="feature-item">
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🛡️</span>
                        <strong>Auto-Generated Policies</strong>
                    </div>
                    <div className="feature-item">
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⚖️</span>
                        <strong>Compliance Checks</strong>
                    </div>
                    <div className="feature-item">
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🔒</span>
                        <strong>Access Control Models</strong>
                    </div>
                </div>

                <button className="btn" onClick={onStart} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                    Start Free Assessment
                </button>
            </div>
        </div>
    );
};

export default Home;
