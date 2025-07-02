import { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch('/.netlify/functions/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      setAnswer('Er is iets misgegaan bij het ophalen van het antwoord.');
      return;
    }

    const data = await response.json();
    setAnswer(data.result);
  };

  return (
    <div
      style={{
        backgroundColor: '#0b1f4b', // Donkerblauw
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        Mijn AI Zoekmachine
      </h1>
      <form
        onSubmit={handleSearch}
        style={{ display: 'flex', width: '60%', maxWidth: '600px' }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Typ je vraag hier..."
          style={{
            flexGrow: 1,
            padding: '1rem',
            borderRadius: '8px 0 0 8px',
            border: 'none',
            fontSize: '1.2rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          Zoek
        </button>
      </form>

      {answer && (
        <div
          style={{
            marginTop: '2rem',
            backgroundColor: '#1e3a8a',
            padding: '2rem',
            borderRadius: '8px',
            width: '60%',
            maxWidth: '600px',
            fontSize: '1.2rem',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
