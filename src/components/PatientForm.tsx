import { useState } from 'react';
import { db, saveDB } from '../db';

export default function PatientForm({ onAdd }: { onAdd: () => void }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await db.run(
            `INSERT INTO patients (name, age, gender, contact, address) VALUES ($1, $2, $3, $4, $5);`,
            [name, age, gender, contact, address]
        );
        saveDB();
        setName('');
        setAge('');
        setContact('');
        setAddress('');
        onAdd();
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                maxWidth: '400px',
            }}
        >
            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <input
                placeholder="Age"
                value={age}
                onChange={e => setAge(e.target.value)}
                type="number"
                required
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                }}
            >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
            <input
                placeholder="Contact"
                value={contact}
                onChange={e => setContact(e.target.value)}
                type="number"
                required
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <input
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#45a049')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4CAF50')}
            >
                Add Patient
            </button>
        </form>
    );
}
