import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city:'San Francisco'}, {city:'Portland'},{city:'Seattle'}];
const FILTERED_ITEMS = [{city:'San Francisco'}];

test('should update with matching listings', function(assert) {
// we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByCity',(val)=>{
    if(val === ''){
      return RSVP.resolve(ITEMS);
    }else{
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
    `);

  return wait().then(() => {
    assert.equal(this.$('.city').length,3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});
