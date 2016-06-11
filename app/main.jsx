define(function(require) {
  var React = require('react');
  var ReactDOM = require('reactDOM');



  var RegulateGraph = React.createClass({
    getInitialState: function() {
      return {
        selectedNode: null,
        simulating: false,
        timer: 0
      };
    },
    render: function() {
      return(
        <div id="graph">
        </div>
      );
    },
    stepSim: function() {
      var nodes = this.mainGraph.nodes("");
      var edges = this.mainGraph.edges("");
      for (var i = 0; i < nodes.length; i++) {
        // Find the predecessors
        var predecessors = [];
        var graph = this.mainGraph;
        edges.forEach(function(edge) {
          if (edge.data('target') === nodes[i].id()) {
            predecessors.push(graph.$("#" + edge.data('source')));
          }
        });
        // Compute the new value
        if (predecessors.length === 0) {
          // Skip
        }
        else if (nodes[i].data('name') === "AND") {
          var result = true;
          for (var j = 0; j < predecessors.length; j++) {
            result = result && predecessors[j].data('state_val');
          }
          nodes[i].data('state_val', result);
        }
        else if (nodes[i].data('name') === "OR") {
          var result = false;
          for (var j = 0; j < predecessors.length; j++) {
            result = result || predecessors[j].data('state_val');
          }
          nodes[i].data('state_val', result);
        }
        else if (nodes[i].data('name') === "NOT") {
          var result = !predecessors[0].data('state_val');
          nodes[i].data('state_val', result);
        }
        else {
          var result = predecessors[0].data('state_val');
          nodes[i].data('state_val', result);
        }
      }
      this.mainGraph.style().update();
      this.evaluate();
    },
    evaluate: function() {
      var success = true
      this.mainGraph.nodes("").forEach(function(node) {
        success &= (typeof (node.data('target_val')) === 'undefined') || (node.data('state_val') === node.data('target_val'));
      })
      if (success) {
        this.stopSimulating();
      }
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
        if (selectedNode === null) {
          selectedNode = e.cyTarget;
        }
        else {
          mainGraph.add({ group: "edges", data: { id: selectedNode.id() + e.cyTarget.id(), source: selectedNode.id(), target: e.cyTarget.id() } })
          selectedNode = null;
        }
      });

      var simulating = this.state.simulating;
      var stepSimFun = this.stepSim;
      var that = this;
      window.addEventListener('keydown', function(event){
        if(event.keyCode === 32) {
          if (!that.simulating) {
            that.simulating = true;
            that.interval = setInterval(stepSimFun, 1500);
            console.log('simulating');
          }
        }
      });
    },
    stopSimulating: function() {
      if (this.simulating) {
        console.log('stop');
        clearInterval(this.interval);
        this.simulating = false;
        document.getElementById('title').innerHTML = "VICTORY";
      }
    },
    componentWillUnmount: function() {
      this.stopSimulating();
    }
  });

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
          <div id="subtitle">@AdamStreck
          </div>
          <RegulateGraph />
        </div>
      )
    },
    componentDidMount: function() {

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
