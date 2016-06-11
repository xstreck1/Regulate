define(function(require) {
  var React = require('react');
  var ReactDOM = require('reactDOM');

  var RegulateGraph = React.createClass({
    getInitialState: function() {
      return {
        mainGraph: null,
        selectedNode: null
      };
    },
    render: function() {
      return(
        <div id="graph">
        </div>
      );
    },
    componentDidMount: function() {
      this.mainGraph = require('jsx!app/graph')(document.querySelector('#graph'));
      var selectedNode = this.state.selectedNode;
      var mainGraph = this.mainGraph;

      this.mainGraph.on('tap', 'edge', function(e){
        console.log('tap edge');
        this.remove([e.cyTarget]);
      });

      this.mainGraph.on('tap', 'node', function(e){
        console.log(selectedNode);
        if (selectedNode === null) {
          selectedNode = e.cyTarget;
        }
        else {
          mainGraph.add({ group: "edges", data: { id: selectedNode.id() + e.cyTarget.id(), source: selectedNode.id(), target: e.cyTarget.id() } })
          selectedNode = null;
        }
      });
    }
  });

  var RegulateApp = React.createClass({
    render: function() {
      return (
        <div id="regulate_app">
          <div id="title">REGULATE
          </div>
          <RegulateGraph />
        </div>
      )
    }
  });

  var regulate_main = document.getElementById('regulate_main');
  ReactDOM.render(
    <RegulateApp />,
    regulate_main
  );


  // ReactDOM.render(
  //   <h1>
  //     Hello, world   !
  //   </h1>,
  //   document.getElementById('cy')
  // );

});
