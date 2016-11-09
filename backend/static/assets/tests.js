'use strict';

define('super-rentals/tests/acceptance/list-rentals-test', ['exports', 'qunit', 'super-rentals/tests/helpers/module-for-acceptance', 'ember'], function (exports, _qunit, _superRentalsTestsHelpersModuleForAcceptance, _ember) {

  var StubMapService = _ember['default'].Service.extend({
    getMapElement: function getMapElement() {
      return document.createElement('div');
    }
  });

  (0, _superRentalsTestsHelpersModuleForAcceptance['default'])('Acceptance | list rentals', {
    beforeEach: function beforeEach() {
      this.application.register('service:stubMaps', StubMapService);
      this.application.inject('component:location-map', 'maps', 'service:stubMaps');
    }
  });

  (0, _qunit.test)('should redirect to rentals route', function (assert) {
    visit('/');
    andThen(function () {
      assert.equal(currentURL(), '/rentals', 'should redirect automatically');
    });
  });

  (0, _qunit.test)('should list available rentals.', function (assert) {
    visit('/');
    andThen(function () {
      assert.equal(find('.listing').length, 3, 'should see 3 listings');
    });
  });

  (0, _qunit.test)('should link to information about the company.', function (assert) {
    visit('/');
    click('a:contains("About")');
    andThen(function () {
      assert.equal(currentURL(), '/about', 'should navigate to about');
    });
  });

  (0, _qunit.test)('should link to contact information.', function (assert) {
    visit('/');
    click('a:contains("Contact")');
    andThen(function () {
      assert.equal(currentURL(), '/contact', 'should navigate to contact');
    });
  });

  (0, _qunit.test)('should filter the list of rentals by city.', function (assert) {
    visit('/');
    fillIn('.list-filter input', 'seattle');
    keyEvent('.list-filter input', 'keyup', 69);
    andThen(function () {
      assert.equal(find('.listing').length, 1, 'should show 1 listing');
      assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
    });
  });

  (0, _qunit.test)('should show details for a specific rental', function (assert) {
    visit('/rentals');
    click('a:contains("Grand Old Mansion")');
    andThen(function () {
      assert.equal(currentURL(), '/rentals/grand-old-mansion', 'should navigate to show route');
      assert.equal(find('.show-listing h2').text(), "Grand Old Mansion", 'should list rental title');
      assert.equal(find('.description').length, 1, 'should list a description of the property');
    });
  });
});
define('super-rentals/tests/acceptance/list-rentals-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/list-rentals-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/list-rentals-test.js should pass jshint.');
  });
});
define('super-rentals/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('super-rentals/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('super-rentals/tests/components/list-filter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/list-filter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/list-filter.js should pass jshint.');
  });
});
define('super-rentals/tests/components/location-map.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/location-map.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/location-map.js should pass jshint.');
  });
});
define('super-rentals/tests/components/rental-listing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/rental-listing.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rental-listing.js should pass jshint.');
  });
});
define('super-rentals/tests/controllers/rentals.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/rentals.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rentals.js should pass jshint.');
  });
});
define('super-rentals/tests/controllers/rentals/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/rentals/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rentals/index.js should pass jshint.');
  });
});
define('super-rentals/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
    server.shutdown();
  }
});
define('super-rentals/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('super-rentals/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'super-rentals/tests/helpers/start-app', 'super-rentals/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _superRentalsTestsHelpersStartApp, _superRentalsTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _superRentalsTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _superRentalsTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('super-rentals/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('super-rentals/tests/helpers/rental-property-type.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/rental-property-type.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/rental-property-type.js should pass jshint.');
  });
});
define('super-rentals/tests/helpers/resolver', ['exports', 'super-rentals/resolver', 'super-rentals/config/environment'], function (exports, _superRentalsResolver, _superRentalsConfigEnvironment) {

  var resolver = _superRentalsResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _superRentalsConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _superRentalsConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('super-rentals/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('super-rentals/tests/helpers/start-app', ['exports', 'ember', 'super-rentals/app', 'super-rentals/config/environment'], function (exports, _ember, _superRentalsApp, _superRentalsConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _superRentalsConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _superRentalsApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('super-rentals/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('super-rentals/tests/integration/components/list-filter-test', ['exports', 'ember-qunit', 'ember-test-helpers/wait', 'rsvp'], function (exports, _emberQunit, _emberTestHelpersWait, _rsvp) {

  (0, _emberQunit.moduleForComponent)('list-filter', 'Integration | Component | list filter', {
    integration: true
  });

  var ITEMS = [{ city: 'San Francisco' }, { city: 'Portland' }, { city: 'Seattle' }];
  var FILTERED_ITEMS = [{ city: 'San Francisco' }];

  (0, _emberQunit.test)('should update with matching listings', function (assert) {
    var _this = this;

    // we want our actions to return promises, since they are potentially fetching data asynchronously
    this.on('filterByCity', function (val) {
      if (val === '') {
        return _rsvp['default'].resolve(ITEMS);
      } else {
        return _rsvp['default'].resolve(FILTERED_ITEMS);
      }
    });

    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              'revision': 'Ember@2.9.0',
              'loc': {
                'source': null,
                'start': {
                  'line': 4,
                  'column': 6
                },
                'end': {
                  'line': 8,
                  'column': 6
                }
              }
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode('        ');
              dom.appendChild(el0, el1);
              var el1 = dom.createElement('li');
              dom.setAttribute(el1, 'class', 'city');
              var el2 = dom.createTextNode('\n          ');
              dom.appendChild(el1, el2);
              var el2 = dom.createComment('');
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode('\n        ');
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode('\n');
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
              return morphs;
            },
            statements: [['content', 'item.city', ['loc', [null, [6, 10], [6, 23]]], 0, 0, 0, 0]],
            locals: ['item'],
            templates: []
          };
        })();

        return {
          meta: {
            'revision': 'Ember@2.9.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 10,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('ul');
            var el2 = dom.createTextNode('\n');
            dom.appendChild(el1, el2);
            var el2 = dom.createComment('');
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode('      ');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [['block', 'each', [['get', 'results', ['loc', [null, [4, 14], [4, 21]]], 0, 0, 0, 0]], [], 0, null, ['loc', [null, [4, 6], [8, 15]]]]],
          locals: ['results'],
          templates: [child0]
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.9.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 11,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'list-filter', [], ['filter', ['subexpr', 'action', ['filterByCity'], [], ['loc', [null, [2, 26], [2, 49]]], 0, 0]], 0, null, ['loc', [null, [2, 4], [10, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    return (0, _emberTestHelpersWait['default'])().then(function () {
      assert.equal(_this.$('.city').length, 3);
      assert.equal(_this.$('.city').first().text().trim(), 'San Francisco');
    });
  });
});
define('super-rentals/tests/integration/components/list-filter-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/list-filter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/list-filter-test.js should pass jshint.');
  });
});
define('super-rentals/tests/integration/components/location-map-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var StubMapService = _ember['default'].Service.extend({
    getMapElement: function getMapElement(location) {
      this.set('calledWithLocation', location);
      return document.createElement('div');
    }
  });

  (0, _emberQunit.moduleForComponent)('location-map', 'Integration | Component | location map', {
    integration: true,
    beforeEach: function beforeEach() {
      //run before each test
      this.register('service:maps', StubMapService);
      this.inject.service('maps', { as: 'mapsService' });
    }
  });

  (0, _emberQunit.test)('should append map element to container element', function (assert) {
    this.set('myLocation', 'New York');
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.9.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 36
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'location-map', [], ['location', ['subexpr', '@mut', [['get', 'myLocation', ['loc', [null, [1, 24], [1, 34]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 36]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));
    assert.equal(this.$('.map-container').children().length, 1, 'the map element should be put onscreen');
    assert.equal(this.get('mapsService.calledWithLocation'), 'New York', 'a map of New York should be requested');
  });
});
define('super-rentals/tests/integration/components/location-map-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/location-map-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/location-map-test.js should pass jshint.');
  });
});
define('super-rentals/tests/integration/components/rental-listing-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForComponent)('rental-listing', 'Integration | Component | rental listing', {
    integration: true
  });

  (0, _emberQunit.test)('should toggle wide class on click', function (assert) {
    assert.expect(3);
    var stubRental = _ember['default'].Object.create({
      image: 'fake.png',
      title: 'test-title',
      owner: 'test-owner',
      type: 'test-type',
      city: 'test-city',
      bedrooms: 3
    });
    this.set('rentalObj', stubRental);
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.9.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 35
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'rental-listing', [], ['rental', ['subexpr', '@mut', [['get', 'rentalObj', ['loc', [null, [1, 24], [1, 33]]], 0, 0, 0, 0]], [], [], 0, 0]], ['loc', [null, [1, 0], [1, 35]]], 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.image.wide').length, 0, 'initially rendered small');
    this.$('.image').click();
    assert.equal(this.$('.image.wide').length, 1, 'rendered wide after click');
    this.$('.image').click();
    assert.equal(this.$('.image.wide').length, 0, 'rendered small after second click');
  });
});
define('super-rentals/tests/integration/components/rental-listing-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/rental-listing-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rental-listing-test.js should pass jshint.');
  });
});
define('super-rentals/tests/models/rental.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/rental.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/rental.js should pass jshint.');
  });
});
define('super-rentals/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('super-rentals/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('super-rentals/tests/routes/about.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/about.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass jshint.');
  });
});
define('super-rentals/tests/routes/contact.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/contact.js should pass jshint.');
  });
});
define('super-rentals/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('super-rentals/tests/routes/rentals.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/rentals.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals.js should pass jshint.');
  });
});
define('super-rentals/tests/routes/rentals/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/rentals/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals/index.js should pass jshint.');
  });
});
define('super-rentals/tests/routes/rentals/show.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/rentals/show.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals/show.js should pass jshint.');
  });
});
define('super-rentals/tests/services/maps.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/maps.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/maps.js should pass jshint.');
  });
});
define('super-rentals/tests/test-helper', ['exports', 'super-rentals/tests/helpers/resolver', 'ember-qunit'], function (exports, _superRentalsTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_superRentalsTestsHelpersResolver['default']);
});
define('super-rentals/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('super-rentals/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/controllers/rentals-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:rentals', 'Unit | Controller | rentals', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('super-rentals/tests/unit/controllers/rentals-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/rentals-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rentals-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/controllers/rentals/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:rentals/index', 'Unit | Controller | rentals/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('super-rentals/tests/unit/controllers/rentals/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/rentals/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rentals/index-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/helpers/rental-property-type-test', ['exports', 'super-rentals/helpers/rental-property-type', 'qunit'], function (exports, _superRentalsHelpersRentalPropertyType, _qunit) {

  (0, _qunit.module)('Unit | Helper | rental property type');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _superRentalsHelpersRentalPropertyType.rentalPropertyType)([42]);
    assert.ok(result);
  });
});
define('super-rentals/tests/unit/helpers/rental-property-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/rental-property-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/rental-property-type-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/models/rental-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('rental', 'Unit | Model | rental', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('super-rentals/tests/unit/models/rental-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/rental-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rental-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/routes/about-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('super-rentals/tests/unit/routes/about-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/about-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/routes/contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:contact', 'Unit | Route | contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('super-rentals/tests/unit/routes/contact-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject({
      //make it run only test (not its written logic)
      replaceWith: function replaceWith(routeName) {
        assert.equal(routeName, 'rentals', 'replace with route name rentals');
      }
    });
    route.beforeModel();
  });
});
define('super-rentals/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/routes/rentals-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:rentals', 'Unit | Route | rentals', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('super-rentals/tests/unit/routes/rentals-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/rentals-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/routes/rentals/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:rentals/index', 'Unit | Route | rentals/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('super-rentals/tests/unit/routes/rentals/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/rentals/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals/index-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/routes/rentals/show-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:rentals/show', 'Unit | Route | rentals/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('super-rentals/tests/unit/routes/rentals/show-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/rentals/show-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals/show-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/services/maps-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var DUMMY_ELEMENT = {};

  var MapUtilStub = _ember['default'].Object.extend({
    createMap: function createMap(element, location) {
      this.assert.ok(element, 'createMap called with Element');
      this.assert.ok(location, 'createMap called with location');
      return DUMMY_ELEMENT;
    }
  });

  (0, _emberQunit.moduleFor)('service:maps', 'Unit | Service | maps', {
    needs: ['util:google-maps']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('should create a new map if one isnt cached for location', function (assert) {
    assert.expect(4);
    var stubMapUtil = MapUtilStub.create({ assert: assert });
    var mapService = this.subject({ mapUtil: stubMapUtil });
    var element = mapService.getMapElement('San Francisco');
    assert.ok(element, 'element exists');
    assert.equal(element.className, 'map', 'element has class name of map');
  });

  (0, _emberQunit.test)('should use existing map if one is cached for location', function (assert) {
    assert.expect(1);
    var stubCachedMaps = _ember['default'].Object.create({
      sanFrancisco: DUMMY_ELEMENT
    });
    var mapService = this.subject({ cachedMaps: stubCachedMaps });
    var element = mapService.getMapElement('San Francisco');
    assert.equal(element, DUMMY_ELEMENT, ' element fetched from cache');
  });
});
define('super-rentals/tests/unit/services/maps-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/maps-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/maps-test.js should pass jshint.');
  });
});
define('super-rentals/tests/unit/utils/google-maps-test', ['exports', 'super-rentals/utils/google-maps', 'qunit'], function (exports, _superRentalsUtilsGoogleMaps, _qunit) {

  (0, _qunit.module)('Unit | Utility | google maps');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = _superRentalsUtilsGoogleMaps['default'];
    assert.ok(result);
  });
});
define('super-rentals/tests/unit/utils/google-maps-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/utils/google-maps-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/google-maps-test.js should pass jshint.');
  });
});
define('super-rentals/tests/utils/google-maps.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | utils/google-maps.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/google-maps.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
