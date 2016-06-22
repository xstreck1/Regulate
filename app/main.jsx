define(function(require) {
  var React = require('react');
  var ReactDOM = require('reactDOM');

  var RegulateGraph = require('jsx!app/regulate_graph');

  var Description = React.createClass({
    render: function() {
      return (
        <div>
          <p class="desc">
              Your task is to match the in and out color of the nodes.
          </p>
          <p class="desc">
              <b>space:</b> Start a simulation. <br />
              <b>LMB:</b> Click on source and target to create an edge. <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Click on an edge to remove it.
            </p>

            <p class="desc">
                A node takes on the value of its predecessor. Special nodes work as follows:<br />
                <b>OR:</b> is green if any predecessor is green.<br />
                <b>AND:</b> is green if all predecessors are green.<br />
                <b>NOT:</b> is green if the predecessor is not green.<br />
            </p>

            <p class="desc">
                Only AND and OR can have more than one predecessor.
            </p>
        </div>
      )
    }
  })

  var RegulateApp = React.createClass({
    getInitialState: function() {
      return {
      };
    },

    render: function() {
      return (
        <div id="regulate_app">
          <div id="title">REGULATE
          </div>
          <div id="subtitle">A Gene Regulation Game
          </div>
          <RegulateGraph />
          <Description />
        </div>
      )
    },
    componentDidMount: function() {

    }
  });

  ReactDOM.render(
    <RegulateApp />,
    document.getElementById('regulate_main')
  );


  // ReactDOM.render(
  //   <h1>
  //     Hello, world   !
  //   </h1>,
  //   document.getElementById('cy')
  // );

});
