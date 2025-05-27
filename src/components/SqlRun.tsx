import { useState } from 'react';
import { db, saveToLocalStorage } from '../db';

export default function SQLRun() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const prefields = [
    {
      type: "Get All",
      query: `SELECT * FROM patients;`
    },
    {
      type: "Get by Name",
      query: `SELECT * FROM patients WHERE name = 'put the name here';`
    },
    {
      type: "Get by Age",
      query: `SELECT * FROM patients WHERE age = 30;`
    },
    {
      type: "Get by Gender",
      query: `SELECT * FROM patients WHERE gender = 'Male';`
    },
    {
      type: "Get by Contact",
      query: `SELECT * FROM patients WHERE contact = '1234567890';`
    },
    {
      type: "Get by Address",
      query: `SELECT * FROM patients WHERE address LIKE '%some address%';`
    },
    {
      type: "Count Patients",
      query: `SELECT COUNT(*) AS total FROM patients;`
    },
    {
      type: "Delete by ID",
      query: `DELETE FROM patients WHERE id = 1;`
    },
    {
      type: "Update Contact by ID",
      query: `UPDATE patients SET contact = 'new_contact' WHERE id = 1;`
    },
  ];


  const runQuery = () => {
    try {
      setError(null);
      const stmt = db.prepare(query);
      const rows: any[] = [];

      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();

      saveToLocalStorage();

      setResult(rows);
    } catch (err: any) {
      setError(err.message);
      setResult([]);
    }
  };

  return (
    <div
      style={{
        marginTop: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '600px',
        backgroundColor: '#fafafa',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        {prefields.map((item, index) => (
          <button
            key={index}
            style={{ marginRight: '10px', marginBottom: '5px' }}
            onClick={() => setQuery(item.query)}
          >
            {item.type}
          </button>
        ))}
      </div>

      <textarea
        value={query}
        onChange={e => setQuery(e.target.value)}
        rows={6}
        cols={60}
        placeholder="Write your SQL query here... ex :- select * from patients where id = 1"
        style={{
          width: '100%',
          fontSize: '14px',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontFamily: 'monospace',
          boxSizing: 'border-box',
          resize: 'vertical',
        }}
      />
      <button
        onClick={runQuery}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          border: 'none',
          borderRadius: '6px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007BFF')}
      >
        Run
      </button>
      {error && (
        <pre
          style={{
            marginTop: '10px',
            color: 'red',
            backgroundColor: '#ffe6e6',
            padding: '10px',
            borderRadius: '6px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {error}
        </pre>
      )}
      {result.length > 0 && (
        <pre
          style={{
            marginTop: '10px',
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: '#f0f0f0',
            padding: '15px',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
