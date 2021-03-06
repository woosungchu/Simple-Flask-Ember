import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let StubMapService = Ember.Service.extend({
  getMapElement(location){
    this.set('calledWithLocation', location);
    return document.createElement('div');
  }
});

moduleForComponent('location-map', 'Integration | Component | location map', {
  integration: true,
  beforeEach(){//run before each test
    this.register('service:maps',StubMapService);
    this.inject.service('maps',{as:'mapsService'});
  }
});

test('should append map element to container element', function(assert) {
  this.set('myLocation','New York');
  this.render(hbs`{{location-map location=myLocation}}`);
  assert.equal(this.$('.map-container').children().length,1,'the map element should be put onscreen');
  assert.equal(this.get('mapsService.calledWithLocation'),'New York','a map of New York should be requested');
});
