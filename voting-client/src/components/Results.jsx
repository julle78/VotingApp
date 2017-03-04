
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import * as actionCreators from '../action_creators';


export const Results =  React.createClass({
    // the props and state are immutable so we can use purerendering and render only when state changes
    mixins: [PureRenderMixin],
    getPair: function() {
        return this.props.pair || [];
    },
    getVotes: function(entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }
        return 0;
    },
    render: function() {
      //if we have a winner render winner component else render results
        return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
        <div className="results">
        <div className="tally">
      {this.getPair().map(entry =>
        <div key={entry} className="entry">
          <h1>{entry}</h1>
          <div className="voteCount">
            {this.getVotes(entry)}
          </div>
        </div>
      )}
      </div>
      <div className="management">
        <button ref="next"
                className="next"
                onClick={this.props.next}>
          Next
        </button>
      </div>
    </div>;
    }
});

//map state from store to props. This function is called every time the store/state changes
function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    };
}
// this binds the state and actions to the result component
export const ResultsContainer = connect(mapStateToProps,actionCreators)(Results);