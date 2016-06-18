var people = [];

$('#menuToggle').on('click', function() { // jquery select div
  $('nav ul').toggle(400); // jquery select element
});

$('a[data-remote="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href') + '?callback=loadResults', // As event handlers, [this] is the object that fired the event - in this case 'a'
    method: 'get',
    dataType: 'jsonp'
  });
});

$('a[data-remote-mutants="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'get',
    success: loadMutants
  });
});

$('a[data-remote-pokemon="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'get',
    success: getAllPokemon
  });
});

// data is passed automatically by JS from get request
function loadResults(data) {
// if ONE person
  if (data.firstName) {
    people.push(data); // add data to array called people
  }
// if ALL people
  else if (data.people) {
    people = people.concat(data.people); // The concat() method returns a new array comprised of the array on which it is called joined with the array(s) and/or value(s) provided as arguments.
  }
  listPeople();
}

function loadMutants(data) {
  $.each(data, function(i, mutant) {
    people.push({
      firstName: mutant.mutant_name,
      lastName: '[' + mutant.real_name + ']',
      secret: mutant.power
    });
  });
  listPeople();
}

function getAllPokemon(data) {
  $.each(data.results, function(i, pokemon) {
    $.ajax({
      url: pokemon.url,
      method: 'get',
      success: loadPokemon
    });
  });
  setTimeout(function() {
    listPeople();
  }, 5000);
}

function loadPokemon(pokemon) {
  people.push({
    firstName: pokemon.name,
    lastName: '',
    secret: pokemon.abilities[0].ability.name
  });
}

function listPeople() {
  $('#people').slideUp(); // The slideUp() method slides-up (hides) the selected elements.
  $('#people').empty();
  $.each(people, function(index, person) {
    var item = $('#template').clone().attr('id', '');
    item.html(item.html().replace('{{ person.firstName }}', person.firstName)
      .replace('{{ person.lastName }}', person.lastName)
      .replace('{{ person.secret }}', person.secret))
      .removeClass('hide');
    $('#people').append(item);
  });

  $('#people').slideDown();
}

listPeople();
