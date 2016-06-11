define(['cytoscape'], function(cytoscape) {
  return function(_container) {
    var stateValToColor = function(ele) {
      return stateToColor(ele.data('state_val'));
    }
    var stateTarToColor = function(ele) {
      return stateToColor(ele.data('target_val'));
    }

    var stateToColor = function(state){
      if (typeof state === 'undefined') {
        return 'white';
      } else if (state === 0) {
        return '#DD0000';
      } else if (state === 1) {
        return '#00DD00';
      } else {
        return 'black';
      }
    }

    return cytoscape({
      container: _container,
      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'content': 'data(name)',
        'text-valign': 'center',
        'color': 'black',
        'background-color': stateValToColor,
        'border-color': stateTarToColor,
        'border-width': 5,
        'shape': 'data(myShape)',
        'width': 150,
        'height': 35,
        'font-size': 25
      })
      .selector('edge')
      .css({
        'text-outline-color': 'black',
        'text-outline-width': 1,
        'color': 'white',
        'width': 2,
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#ccc',
        'line-color': '#ccc',
      })
      .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black'
      })
      .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),

      elements: {
        nodes: [
          { data: { id: 'j', name: 'Jerry', myShape: 'rectangle', target_val: 1, state_val: 0 } },
          { data: { id: 'e', name: 'AND', myShape: 'diamond'} },
        ],
        edges: [ ]
      },

      layout: {
        name: 'grid',
        padding: 10
      }
    });
  };
})
