	"use strict";
	$(document).ready(function() {
	    $('#external-events .fc-event').each(function() {

	        // store data so the calendar knows to render an event upon drop
	        $(this).data('event', {
	            title: $.trim($(this).text()), // use the element's text as the event title
	            stick: true // maintain when user navigates (see docs on the renderEvent method)
	        });

	        // make the event draggable using jQuery UI
	        $(this).draggable({
	            zIndex: 999,
	            revert: true, // will cause the event to go back to its
	            revertDuration: 0 //  original position after the drag
	        });

	    });


	    setTimeout(function(){
	    $('#calendar').fullCalendar({
	        header: {
	            left: 'prev,next today',
	            center: 'title',
	            right: 'month,agendaWeek,agendaDay,listMonth'
	        },
	        defaultDate: '2019-04-04',
	        navLinks: true, // can click day/week names to navigate views
	        businessHours: true, // display business hours
	        editable: true,
	        droppable: true, // this allows things to be dropped onto the calendar
	        drop: function() {

	            // is the "remove after drop" checkbox checked?
	            if ($('#checkbox2').is(':checked')) {
	                // if so, remove the element from the "Draggable Events" list
	                $(this).remove();
	            }
	        },
	        events: [{
	                title: 'Darstellungslehre und Maschinenelemente 1',
	                start: '2019-04-01T09:00:00',
					end: '2019-04-01T11:30:00',
	                constraint: 'Vorlesung',
					borderColor: '#ff5252',
					backgroundColor: '#ff5252',
					textColor: '#fff'
	            }, {
	                title: 'Mathematik 2',
	                start: '2019-04-01T15:00:00',
					end: '2019-04-01T16:30:00',
	                constraint: 'availableForMeeting',
	                editable: true,
	                borderColor: '#448aff',
	                backgroundColor: '#448aff',
	                textColor: '#fff'
	            }, {
	                title: 'Makroökonomie',
	                start: '2019-04-01T17:00:00',
					end: '2019-04-01T18:30:00',
					borderColor: '#ff5252',
					backgroundColor: '#ff5252',
					textColor: '#fff'
	            }, {
	                title: 'Makroökonomie',
	                start: '2019-04-01T18:45:00',
					end: '2019-04-01T19:30:00',
					borderColor: '#ff5252',
					backgroundColor: '#ff5252',
					textColor: '#fff'
	            },

	            // areas where "Meeting" must be dropped
	            {
	                id: 'availableForMeeting',
	                start: '2018-09-11T10:00:00',
	                end: '2018-09-11T16:00:00',
	                rendering: 'background',
					borderColor: '#ab7967',
					backgroundColor: '#ab7967',
					textColor: '#fff'
	            }, {
	                id: 'availableForMeeting',
	                start: '2018-09-13T10:00:00',
	                end: '2018-09-13T16:00:00',
	                rendering: 'background',
					borderColor: '#39ADB5',
					backgroundColor: '#39ADB5',
					textColor: '#fff'
	            },

	            // red areas where no events can be dropped
	            {
	                start: '2018-09-24',
	                end: '2018-09-28',
	                overlap: false,
	                rendering: 'background',
					borderColor: '#FFB64D',
					backgroundColor: '#FFB64D',
	                color: '#d8d6d6'
	            }, {
	                start: '2018-09-06',
	                end: '2018-09-08',
	                overlap: false,
	                rendering: 'background',
					borderColor: '#ab7967',
					backgroundColor: '#ab7967',
	                color: '#d8d6d6'
	            }
	        ]
	    });
		},350);
	});
