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

    const analyzeClick = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/analyze/analyze/`, {text:text, analyzer_type:analyzerType});
            setResult(response.data)
        } catch (error) {
            setError("Error Analyzing Text")
        } finally {
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