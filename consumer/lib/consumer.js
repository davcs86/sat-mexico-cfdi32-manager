var di = require('didi'),
    core = require('./core');

/**
 * Bootstrap an injector from a list of modules, instantiating a number of default components
 *
 * @ignore
 * @param {Array<didi.Module>} bootstrapModules
 *
 * @return {didi.Injector} a injector to use to access the components
 */
function bootstrap(bootstrapModules) {

    var modules = [],
        components = [];

    function hasModule(m) {
        return modules.indexOf(m) >= 0;
    }

    function addModule(m) {
        modules.push(m);
    }

    function visit(m) {
        if (hasModule(m)) {
            return;
        }

        (m.__depends__ || []).forEach(visit);

        if (hasModule(m)) {
            return;
        }

        addModule(m);

        (m.__init__ || []).forEach(function(c) {
            components.push(c);
        });
    }

    bootstrapModules.forEach(visit);

    var injector = new di.Injector(modules);

    components.forEach(function(c) {

        try {
            // eagerly resolve component (fn or string)
            injector[typeof c === 'string' ? 'get' : 'invoke'](c);
        } catch (e) {
            console.error('Failed to instantiate component');
            console.error(e.stack);

            throw e;
        }
    });

    return injector;
}

/**
 * Creates an injector from passed options.
 *
 * @ignore
 * @param  {Object} options
 * @return {didi.Injector}
 */
function createInjector(options) {

    options = options || {};

    var configModule = {
        'config': ['value', options]
    };

    var modules = [ configModule, core ].concat(options.modules || []);

    return bootstrap(modules);
}

/**
 * @param {Object} options
 * @param {Array<didi.Module>} [options.modules] external modules to instantiate with the diagram
 * @param {didi.Injector} [injector] an (optional) injector to bootstrap the consumer with
 */
function Consumer(options, injector) {

    // create injector unless explicitly specified
    this.injector = injector = injector || createInjector(options);

    // API

    /**
     * Resolves a diagram service
     *
     * @method D3Canvas#get
     *
     * @param {String} name the name of the diagram service to be retrieved
     * @param {Boolean} [strict=true] if false, resolve missing services to null
     */
    this.get = injector.get;

    /**
     * Executes a function into which services are injected
     *
     * @method Consumer#invoke
     *
     * @param {Function|Object[]} fn the function to resolve
     * @param {Object} locals a number of locals to use to resolve certain dependencies
     */
    this.invoke = injector.invoke;

    // init

    // indicate via event

    /**
     * An event indicating that all plug-ins are loaded.
     *
     * Use this event to fire other events to interested plug-ins
     *
     * @memberOf Consumer
     *
     * @event consumer.init
     *
     * @example
     *
     * eventBus.on('diagram.init', function() {
   *   eventBus.emit('my-custom-event', { foo: 'BAR' });
   * });
     *
     * @type {Object}
     */
    this.get('eventBus').emit('consumer.init');
}

module.exports = Consumer;
