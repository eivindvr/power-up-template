/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var fruitSelector = document.getElementById('fruit');
var vegetableSelector = document.getElementById('vegetable');

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'fruit'),
    t.get('card', 'shared', 'vegetable')
  ])
  .spread(function(savedFruit, savedVegetable){
    if(savedFruit && /[a-z]+/.test(savedFruit)){
      fruitSelector.value = savedFruit;
    }
    if(savedVegetable && /[a-z]+/.test(savedVegetable)){
      vegetableSelector.value = savedVegetable;
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){
  return t.set('card', 'shared', 'vegetable', vegetableSelector.value)
  .then(function(){
    return t.set('card', 'shared', 'fruit', fruitSelector.value);
  })
  .then(function(){
    t.closePopup();
  })
})
