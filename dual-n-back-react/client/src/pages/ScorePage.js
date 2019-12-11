import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScoreDisplay from '../score/ScoreDisplay';

class ScorePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ScoreDisplay score={{ 'score': 500, 'name': "test"}}/>
            </div>
        );
    }
}

export default ScorePage;
