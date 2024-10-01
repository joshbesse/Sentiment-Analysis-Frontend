import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styling/History.css';
import API_BASE_URL from '../api';

function History() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analyze/history/`);
                setHistory(response.data)
            } catch (error) {
                setError("Error Fetching History")
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className='history'>
            <h1>Analysis History</h1>
            <ol>
                {history.map((item, index) => (
                    <li key={index}>
                        <p>Analyzer: {item.analyzer}</p>
                        <p>Text: {item.text}</p>
                        <p>Sentiment: {item.sentiment}</p>
                        <p>Score: {item.score}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default History