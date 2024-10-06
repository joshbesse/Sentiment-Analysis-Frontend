import React from 'react';
import '../styling/Description.css';

function Description() {
    return (
        <div className='description'>
            <h1>Sentiment Analysis Methods</h1>
            <h2>What is Sentiment Analysis?</h2>
            <p>Sentiment analysis is a field of natural language processing, which is the ability for computers to process human-created text. Sentiment analysis involves analyzing, understanding, and interpreting text to determine if the emotional tone of the message is positive, negative, or neutral.</p>
            <h2>Basic Lexicon Analyzer</h2>
            <p>The input text is broken down into individual words. Those words are then checked against lists of predefined positive and negative words. If the word is part of the positive words list, the sentiment score is incremented by 1. If the word is part of the negative words list, the sentiment score is decremented by 1. Based on the final sentiment score, a sentiment of positive, negative, or neutral is assigned.</p>
            <h2>Advanced Lexicon Analyzer</h2>
            <p>The advanced analyzer works similarly to the basic analyzer but with added features, specifically negation, intensifying, and diminishing handling. It has additional lists of negation words (example: didn't), intensifier words (example: very), and diminisher words (example: somewhat). The advanced analyzer checks the previous word to see if it part of the negation, intensifier, or diminisher lists. If it is a negation word, the score for the current word is multiplied by -1. If it is an intensifier word, the score for the current word is multiplied by 1.5. If it is a diminisher word, the score for the current word is multiplied by 0.5. </p>
            <h2>Logistic Regression Analyzer</h2>
            <p>The input text is first transformed into numerical features using TF-IDF (Term Frequency-Inverse Document Frequency). These features represent the importance of each word in the text. The logistic regression model then calculates a weighted sum of these features, applies a logistic (sigmoid) function, and produces a probability score for each category (positive, negative, and neutral). The category with the highest probability is assigned as the sentiment.</p>
            <h2>Random Forest Model</h2>
            <p>The input text is converted into numerical features using TF-IDF (Term Frequency-Inverse Document Frequency). The random forest model then uses an ensemble of decision trees, each trained on differnet random subsets of the data. Each decision tree splits the features into branches based on conditions, ultimately arriving at a classification (positive, negative, or neutral). The final sentiment is determined by majority voting, where the most common sentiment prediction among the trees is chosen.</p>
            <h2>BERT Model</h2>
            <p>The input text is tokenized into word pieces and then passed through a pre-trained BERT (Bidirectional Encoder Representations from Transformers) model. BERT considers the context of each word in both directions (left-to-right and right-to-left) to generate contextualized embeddings for the entire sentence. These embeddings are then processed by a classification layer that assigns a probability score for each sentiment class (positive, negative, and neutral). The class with the highest probability is selected as the sentiment.</p>
        </div>
    );
}

export default Description