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
      } else if (state === false) {
        return '#FF2222';
      } else if (state === true) {
        return '#22FF22';
      } else {
        return 'black';
      }
    }

    return cytoscape({
      container: _container,
      boxSelectionEnabled: false,
      autounselectify: true,
      wheelSensitivity : 0.1,
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
        'width': 200,
        'height': 50,
        'font-size': 25
      })
      .selector('edge')
      .css({
        'text-outline-color': 'black',
        'text-outline-width': 1,
        'color': 'black',
        'width': 5,
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'black',
        'line-color': 'black',
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
          { data: { id: 'a', name: 'Lac', myShape: 'rectangle', target_val: true, state_val: true } },
          { data: { id: 'b', name: 'Glu', myShape: 'rectangle', target_val: false, state_val: false } },
          { data: { id: 'c', name: 'Glucosidase', myShape: 'rectangle', target_val: false, state_val: true } },
          { data: { id: 'd', name: 'Lactosidase', myShape: 'rectangle', target_val: true, state_val: false } },
          { data: { id: 'e', name: 'NOT', myShape: 'diamond', state_val: false } },
          { data: { id: 'f', name: 'OR', myShape: 'diamond', state_val: false } },
          { data: { id: 'g', name: 'AND', myShape: 'diamond', state_val: false } }

        ],
        edges: [
        ]
      },

      layout: {
        name: 'grid',
        padding: 10
      }
    });
  };
})
