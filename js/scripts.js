var people = [];

$('#menuToggle').on('click', function(){ // jquery select div
	$('nav ul').toggle(400); // jquery select element
});

$('a[data-remote="true"]').on('click', function(ev){
	ev.preventDefault();
	$.ajax({
		method: 'get',
		url: $(this).attr('href') + '?callback = loadResults', // As event handlers, [this] is the object that fired the event - in this case 'a'
		dataType: 'jsonp'
	});
});

// data is passed automatically by JS from get request
function loadResults(data){
	
	// if ONE person
	if(data.firstName){
		people.push(data); // add data to array called people
	}

	// if ALL people
	else if (data.people) {
		people = people.concat(data.people); // The concat() method returns a new array comprised of the array on which it is called joined with the array(s) and/or value(s) provided as arguments.
	}

	listPeople();
}

function listPeople(){
	$('#people').slideUp(); // The slideUp() method slides-up (hides) the selected elements.
	$('#people').empty();
	$.each(people, function(index, person){
		var item = $('template').clone().attr('id', '');
		item.html(item.html().replace('{{ person.firstName }}', person.firstName)
			.replace('{{ person.lastName }}', person.lastName)
        	.replace('{{ person.secret }}', person.secret));
		item.removeClass('hide');
    	$('#people').append(item);
    	$('#people').slideDown();			
	});
}

listPeople();
