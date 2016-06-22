define(['react', 'reactDOM', 'jsx!app/graph'], function(React, ReactDOM, myGraph){
   return React.createClass({
    getInitialState: function() {
      return {
        selectedNode: null,
        simulating: false,
        timer: 0,
        won: false
      };
    },
    render: function() {
      const text = this.state.won ? 'RESET' : (this.state.simulating ? 'STOP SIMULATION' : 'START SIMULATION');
      const won_visible = this.state.won ? "visible" : "hidden";
      return(
        <div id="graph_holder">
          <div id="graph">
            <div id="won_message" style={{ visibility: won_visible}}><div id="won_text" >WON</div></div>
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
        this.setState({ won : true});
      }
    },
    resetNodes: function() {
      this.mainGraph.nodes().forEach(function(node) {node.data('state_val', node.data('init_val')); });
      this.mainGraph.style().update();
    },
    componentDidMount: function() {
      this.mainGraph = myGraph(document.querySelector('#graph'));
      this.resetNodes();

      var selectedNode = this.state.selectedNode;
      var mainGraph = this.mainGraph;

      this.mainGraph.on('tap', 'edge', function(e){
        this.remove([e.cyTarget]);
      });

      this.mainGraph.on('tap', 'node', function(e){
        if (selectedNode === null) {
          selectedNode = e.cyTarget;
        }
        else {
            var node = e.cyTarget;
            var edges = mainGraph.edges("");
            // Find the predecessors
            var predecessors = [];
            edges.forEach(function(edge) {
              if (edge.data('target') === node.id()) {
                predecessors.push(mainGraph.$("#" + edge.data('source')));
              }
            });
            if ((node.data('name') === "AND" || node.data('name') === "OR") || predecessors.length == 0) {
              mainGraph.add({ group: "edges", data: { id: selectedNode.id() + e.cyTarget.id(), source: selectedNode.id(), target: e.cyTarget.id() } });
            }
          selectedNode = null;
        }
      });
    },
    stopSimulating: function() {
        clearInterval(this.interval);
        this.setState({ simulating : false});
        console.log('stopped');
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
            if (this.state.won) {
              this.setState({ won : false});
              this.resetNodes();
            }
            else {
              this.startSimulating();
            }
          }
          else {
            this.resetNodes();
            this.stopSimulating();
          }
      }
  });
});
