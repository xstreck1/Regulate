define(['react', 'reactDOM', 'jsx!app/graph'], function(React, ReactDOM, myGraph){
   return React.createClass({
    getInitialState: function() {
      return {
        selectedNode: null,
        simulating: false,
        timer: 0
      };
    },
    render: function() {
      const text = this.state.simulating ? 'STOP SIMULATION' : 'START SIMULATION';
      return(
        <div id="graph_holder">
          <div id="graph">
          </div>
          <div id="controls">
              <button type="button" id="simulate_button" onClick={this.handleClick} >
                { text }
              </button>
          </div>
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
      this.mainGraph = myGraph(document.querySelector('#graph'));
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

    },
    stopSimulating: function() {
        clearInterval(this.interval);
        this.setState({ simulating : false});
        console.log('stopped');
        document.getElementById('title').innerHTML = "VICTORY";
    },
    startSimulating: function() {
      this.setState({ simulating : true});
      this.interval = setInterval(this.stepSim, 1500);
      console.log('simulating');
    },
    componentWillUnmount: function() {
      this.stopSimulating();
    },
    handleClick: function() {
          if (!this.state.simulating) {
            this.startSimulating();
          }
          else {
            this.stopSimulating();
          }
      }
  });
});
