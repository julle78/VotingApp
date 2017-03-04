import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    // the props and state are immutable so we can use purerendering and render only when state changes
    mixins: [PureRenderMixin],
    render: function () {
        return <div className="winner">
            Winner is {this.props.winner}!
    </div>;
    }
});