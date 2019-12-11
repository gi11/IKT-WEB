import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScoreDisplay_ from '../score/ScoreDisplay_score';

class ScorePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ScoreDisplay_/>
            </div>
        );
    }
}

export default ScorePage;
