// For any third party dependencies, like jQuery, place them in the lib folder.

requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        app: '../app',
        jquery: 'jquery/dist/jquery.min'
    }
});

requirejs(['app/main']);