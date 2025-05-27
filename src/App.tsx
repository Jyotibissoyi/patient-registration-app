import { useEffect, useState } from 'react';
import { db, saveDB, setupDb } from './db';
import PatientForm from './components/PatientForm';
import SQLRun from './components/SqlRun';

function App() {
  const [patients, setPatients] = useState<any>([]);

  const fetchPatients = () => {
    const stmt = db.prepare('SELECT * FROM patients;');
    const rows: any[] = [];

    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }

    stmt.free();
    setPatients(rows);
  };

  useEffect(() => {
    setupDb().then(fetchPatients);
  }, []);

  const handleDelete = (id: number) => {
    db.run('DELETE FROM patients WHERE id = $1;', [id]);
    saveDB();
    fetchPatients();
  };

  const getIcon = (gender: any, age: any) => {
    if (gender === 'male' && age <= 18) {
      return "👦"
    } else if (gender === 'female' && age <= 18) {
      return "👧"
    } else if (gender === 'male' && age > 18 && age < 50) {
      return "👨"
    } else if (gender === 'female' && age > 18 && age < 50) {
      return "👩"
    } else if (gender === 'male' && age > 50) {
      return "👴"
    } else if (gender === 'female' && age > 50) {
      return "👵"
    }
  }


  return (
    <div style={{
      maxWidth: '700px',
      margin: '30px auto',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f7f9fc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Patient Registration</h1>

      <div
        style={{
          marginBottom: '30px',
          marginLeft: '140px'
        }}
      >
        <PatientForm onAdd={fetchPatients} />
      </div>


      <h2 style={{ color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>{patients.length > 0 ? "List of patients" : ""}</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {patients.map((p: any) => (
          <li
            key={p.id}
            style={{
              backgroundColor: '#fff',
              marginBottom: '10px',
              padding: '10px 15px',
              borderRadius: '5px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              color: '#444',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              🆔- {p.id}{getIcon(p.gender.toLowerCase(), Number(p.age))}{p.name} ({p.age}, {p.gender}, {p.contact}, {p.address})
            </span>
            <span
              style={{
                cursor: 'pointer',
                color: '#d00',
                marginLeft: '10px',
                fontSize: '18px',
              }}
              onClick={() => handleDelete(p.id)}
              title="Delete"
            >
              🗑️
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#555', borderBottom: '1px solid #ddd' }}>Run your query here</h2>
        <SQLRun />
      </div>
    </div>
  );
}

export default App;
