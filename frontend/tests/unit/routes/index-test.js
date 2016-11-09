import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject({
    //make it run only test (not its written logic)
    replaceWith(routeName){
      assert.equal(routeName,'rentals','replace with route name rentals');
    }
  });
  route.beforeModel();
});
