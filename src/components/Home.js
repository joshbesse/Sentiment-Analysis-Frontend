import React, { useState } from 'react';
import axios from 'axios';
import '../styling/Home.css';
import { ClipLoader } from 'react-spinners';
import API_BASE_URL from '../api';

function Home() {
    const [text, setText] = useState('');
    const [analyzerType, setAnalyzerType] = useState("basic");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to poll the task status
    const pollTaskStatus = async (taskId) => {
        try {
            const statusResponse = await axios.get(`${API_BASE_URL}/task_status/${taskId}/`);
            const statusData = statusResponse.data;

            if (statusData.status === 'SUCCESS') {
                // If the task is successful, update the result state
                setResult({ sentiment: statusData.sentiment, score: statusData.score });
                setIsLoading(false);
            } else if (statusData.status === 'FAILURE') {
                // If the task failed, set the error message
                setError('Error analyzing text.');
                setIsLoading(false);
            } else {
                // If the task is still pending, wait and poll again
                setTimeout(() => pollTaskStatus(taskId), 2000);
            }
        } catch (error) {
            setError('Error fetching task status.');
            setIsLoading(false);
        }
    };

    // Modified analyzeClick to handle the asynchronous nature of Celery
    const analyzeClick = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            // Send the analysis request
            const response = await axios.post(`${API_BASE_URL}/analyze/`, { text: text, analyzer_type: analyzerType });
            
            if (response.status === 202) {
                const taskId = response.data.task_id;
                // Poll the task status using the task ID
                pollTaskStatus(taskId);
            } else {
                setError('Unexpected response from the server.');
                setIsLoading(false);
            }
        } catch (error) {
            setError('Error analyzing text.');
            setIsLoading(false);
        }
    };

    const renderResult = () => {
        if (isLoading) {
            return <ClipLoader color={"#60fc05"} loading={isLoading} size={50} />;
        } else if (result) {
            return (
                <div>
                    <h2>Result</h2>
                    <p>Sentiment: {result.sentiment}</p>
                    <p>Score: {result.score}</p>
                </div>
            );
        } else if (error) {
            return (
                <div>
                    <h2>{error}</h2>
                </div>
            );
        } else {
            return <p>Please input text and click "Analyze" to see the result.</p>;
        }
    };

    return (
        <div className='home'>
            <h1>Sentiment Analysis</h1>
            <div className='content'>
                <div className='select_container'>
                    <select value={analyzerType} onChange={(e) => setAnalyzerType(e.target.value)}>
                        <option value="basic">Basic Lexicon Analyzer</option>
                        <option value="advanced">Advanced Lexicon Analyzer</option>
                        <option value="logistic_regression">Logistic Regression Analyzer</option>
                        <option value="random_forest">Random Forest Analyzer</option>
                        <option value="BERT">BERT Analyzer</option>
                    </select>
                </div>
                <div className='textarea_container'>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter text to analyze.'/>
                    <button id='button' onClick={analyzeClick}>Analyze</button>
                </div>
                <div className='result_container'>
                    {renderResult()}
                </div>
            </div>
        </div>
    );
}

export default Home;