import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styling/History.css';
import API_BASE_URL from '../api';

function History() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analyze/history/`);
                setHistory(response.data)
            } catch (error) {
                setError("Error Fetching History")
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className='history'>
            <h1>Analysis History</h1>
            
            {loading && <p>Loading...</p>}
            
            {error && <p className='error'>{error}</p>}
            
            {!loading && !error && history.length > 0 && (
                <ol>
                    {history.map((item) => (
                        <li key={item.id}> 
                            <p><strong>Analyzer:</strong> {item.analyzer}</p>
                            <p><strong>Text:</strong> {item.text}</p>
                            <p><strong>Sentiment:</strong> {item.sentiment}</p>
                            <p><strong>Score:</strong> {item.score}</p>
                        </li>
                    ))}
                </ol>
            )}

            {!loading && !error && history.length === 0 && (
                <p>No analysis history available.</p>
            )}
        </div>
    );
}

export default History