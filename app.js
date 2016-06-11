// For any third party dependencies, like jQuery, place them in the lib folder.

requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        app: '../app',
        jquery: 'jquery/dist/jquery.min',
        react: 'react/react-with-addons',
        reactDOM: 'react/react-dom',
        jsx: 'requirejs-react-jsx/jsx',
        babel: "requirejs-react-jsx/babel-5.8.34.min",
        cytoscape: 'cytoscape/dist/cytoscape.min',
        text: "requirejs-text/text"
    },
    shim: {
        "react": {
            "exports": "React"
        }
    },
    config: {
        babel: {
            sourceMaps: "inline", // One of [false, 'inline', 'both']. See https://babeljs.io/docs/usage/options/
            fileExtension: ".jsx" // Can be set to anything, like .es6 or .js. Defaults to .jsx
        }
    }
});

requirejs(['jsx!app/main']);