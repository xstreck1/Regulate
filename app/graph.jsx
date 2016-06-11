define(['cytoscape'], function(cytoscape) {
  return function(_container) {
    return cytoscape({
      container: _container,

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'content': 'data(id)',
        'text-valign': 'center',
        'color': 'black',
        'background-color': 'white',
        'border-color': 'black',
        'border-width': 1,
        'shape': 'rectangle',
        'width': 100,
        'height': 25,
        'font-size': 15
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
          { data: { id: 'j', name: 'Jerry' } },
          { data: { id: 'e', name: 'Elaine' } },
          { data: { id: 'k', name: 'Kramer' } },
          { data: { id: 'g', name: 'George' } }
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
