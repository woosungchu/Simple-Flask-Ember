import Ember from 'ember';

export default Ember.Route.extend({
  model() {//will be called when a user enters the rentals route.
    return this.get('store').findAll('rental');
  }
});
