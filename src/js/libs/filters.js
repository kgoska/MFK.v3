var $ = require( "jquery" );
const filterHandlerLookup = {
	"number": {
		Update: function(filter){
			let input = filter.children('input[type="range"]');
			let value = input.val();
			let scale = filter.data('scale');
			switch(scale) {
				case "exponential":
					let base = filter.data('exp-base');
					if(base == 'undefined'){
						console.error("undefined exponential base for filter", filter);
					}
					let mult = filter.data('exp-mult');
					if(mult == 'undefined'){
						mult = 1;
					}
					value = Math.pow(base, value*mult);
					break;
				case "breakpoints":
					let breakpoints = JSON.parse(filter.data('breakpoints')).breakpoints;
					let stepsLeft = value/input[0].step;
					let realValue = 0;
					
					for (let i = 0; i < breakpoints.length; i++){

						if(breakpoints[i].startpoint){
							realValue = breakpoints[i].startpoint;
						}
						let last = (i == breakpoints.length-1);
						if(stepsLeft > breakpoints[i].steps && !last){
							realValue += breakpoints[i].steps*breakpoints[i].multiplier;
							stepsLeft -= breakpoints[i].steps;
						}
						else{
							realValue += stepsLeft*breakpoints[i].multiplier;
							stepsLeft = 0;
							break;
						}
						
					}
					value = realValue;
					break;
				case "linear":
				default:
					break;		
			}
			filter.data("filter-value",{value:value});


			//LABEL CODE ///Remove this shite later!!! (I don't have time to add a cleaner implementation)
			if(filter.data('label-selector')){
				let label = filter.find(filter.data('label-selector'));
				let labelContent = '';
				switch(filter.data('label-preset')){
					case "time":
						labelContent = FormReadableTime(value);
						break;
					case "price":
						labelContent = FormReadablePrice(value);
						break;
					default:
						break;
				}
				label.html(labelContent);
			}
		},
		Evaluate: function(filterFieldData, objectfieldData){
			if(objectfieldData.type == 'comparison'){
				return this.comparisonLookup[objectfieldData.comparison](filterFieldData.value,objectfieldData.value)
			}
			else if(objectfieldData.type == 'range'){
				return (objectfieldData.min < filterFieldData.value) && (objectfieldData.max > filterFieldData.value);
			}
			
		},
		comparisonLookup: {
			'>': function(leftValue, rightValue){
				return leftValue > rightValue;
			},
			'>=': function(leftValue, rightValue){
				return leftValue >= rightValue;
			},
			'<': function(leftValue, rightValue){
				return leftValue < rightValue;
			},
			'<=': function(leftValue, rightValue){
				return leftValue <= rightValue;
			},
			'==': function(leftValue, rightValue){
				return leftValue == rightValue;
			},
		}
	},
	"boolean": {
		Update: function(filter){
			let selector = filter.data('truthfull-selector');
			let value = filter.find(selector).length > 0;
			filter.data("filter-value",{value:value});
		},
		Evaluate: function(filterfieldData, objectfieldData){
			return filterfieldData.value == objectfieldData.value || !filterfieldData.value;
		}
	},
	"text": {
		Update: function(filter){
			let input = filter.children('input[type="text"]');
			let value = input.val();
			filter.data("filter-value",{value:value});
		},
		Evaluate: function(filterfieldData, objectfieldData){

			return filterfieldData.value.includes(objectfieldData.value) || objectfieldData.value.includes(filterfieldData.value);
		}
	},
	"enum": {
		Update: function(filter, trigger){
			let values;
			
			if(trigger){
				values = $(trigger).data('enum-values');
				if(!filter.data('radio')){
					let enumButtons = filter.children('[data-enum-values]');
					enumButtons.removeClass('active');
					$(trigger).addClass('active');
				}	
			}
			else{
				if(filter.data('radio')){
					values = filter.children('[data-enum-values]:checked').data('enum-values');
				}
				else{
					values = filter.children('[data-enum-values].active').data('enum-values');
				}
			}
			
			filter.data("filter-value",{value:values});
		},
		Evaluate: function(filterfieldData, objectfieldData){
			return filterfieldData.value.includes(objectfieldData.value);
		}
	},
};
$(document).on('click input change', '.filter-trigger', function(){
	let filter = $(this).closest('.filter');
	if(filter.length == 0){
		console.error("could not find filter a filter for the trigger", this);
	}
	UpdateFilter(filter,this);
});
function InitializeFilters(){
	let filters = $('.filter');
	for (var i = 0; i < filters.length; i++) {
		InitializeFilter($(filters[i]));
	}
	let filterContainers = $('.filters');
	for (var i = 0; i < filterContainers.length; i++) {
		if($(filterContainers[i]).data("apply-on-load")){
			ApplyFilters($(filterContainers[i]));	
		}
	}
}
function UpdateFilter(filter, trigger){
	let filterType = filter.data('filter-type');
	filterHandlerLookup[filterType].Update(filter,trigger);

	let filtersContainer = filter.closest('.filters');
	if(filtersContainer.data('auto-update') || filter.data('auto-update')){
		ApplyFilters(filtersContainer);
	}
}
function InitializeFilter(filter){
	let filterType = filter.data('filter-type');
	filterHandlerLookup[filterType].Update(filter);
}
function ApplyFilters(filtersContainer){
	let filterElements = filtersContainer.find('.filter:not(.disabled)');

	let filters = {};
	for (let i = 0; i < filterElements.length; i++) {
		filterElements[i] = $(filterElements[i]);
		let filterObject = {
			data: filterElements[i].data("filter-value"),
			name: filterElements[i].data("filter-name"),
			type: filterElements[i].data("filter-type")
		};
		filters[filterObject.name] = filterObject;
	}
	console.log(filters);
	let filteredItems = $('#' + filtersContainer.data('filtered-items-container-id')).children('.filtered-item');
	//hide all elements
	filteredItems.each(function(index){
		$(this).addClass("filtered-hidden");
	})
	for (let i = 0; i < filteredItems.length; i++) {
		
		filteredItems[i] = $(filteredItems[i]);
		filteredItemData = filteredItems[i].data('item-filter-data');
		if(typeof filteredItemData == 'string'){
			filteredItemData = JSON.parse(filteredItemData);
		}
		let show = true;
		for(let filterName in filters){
			let filter = filters[filterName];
			if(!(filterName in filteredItemData)){//no corresponding filter in item
				console.error(filterName + " was not set in the following item:");
				console.error(filteredItems[i][0]);
			}
			else{
				let itemFilter = filteredItemData[filterName];
				let curShow = filterHandlerLookup[filter.type].Evaluate(filter.data, itemFilter);
				show = show && curShow;
				// if(!show){
				// 	break;
				// }
			}
		}
		if(show){
			filteredItems[i].removeClass("filtered-hidden");
		}
	}

}
$(document).ready(function(){
	InitializeFilters();
});
$(document).on('click','.filter-apply-button', function(){
	ApplyFilters($(this).closest('.filters'));
});


function FormTimeQuantity(quantity, unit) { // THIS IS LITERAL HELL, preceed with heavy caution
	
	let lastUnit = quantity%10;
	quantity = quantity.toString();
	let lastDigit = quantity.slice(quantity.length - 1);
	let penultimateDigit = 0;
	if(quantity.length > 1){
		penultimateDigit = quantity.slice(quantity.length - 2).slice(0,1);
	}
	switch(unit){
		case 'year':
			if(lastUnit == 0 || lastUnit >= 5 || penultimateDigit == 1){
				return "лет";
			}
			else if (lastUnit == 1){
				return "год";
			}
			else{
				return "года";
			}
			break;
		case 'month':
			if(lastUnit == 0 || lastUnit > 4 || penultimateDigit == 1){
				return "месяцев";
			}
			else if (lastUnit == 1){
				return "месяц";
			}
			else{
				return "месяца";
			}
			break;
		case 'day':
			if(lastUnit == 0 || lastUnit > 4 || penultimateDigit == 1){
				return "дней";
			}
			else if (lastUnit == 1){
				return "день";
			}
			else{
				return "дня";
			}
			break;
		default:
			break;
	}
}
const roundedTime = [
	{
		days: 360,
		unit: "year"
	},
	{
		days: 30,
		unit: "month"
	},
	{
		days: 1,
		unit: "day"
	}
]
function FormReadableTime(days) { // 360=>year/30=>month/1=>day
	for (var i = 0; i < roundedTime.length; i++) {
		let finalTime = Math.floor(roundedTime[i].days % days);
		if(days >= roundedTime[i].days){
			return days/roundedTime[i].days + " " + FormTimeQuantity(days/roundedTime[i].days, roundedTime[i].unit);
		}
	}
}
function FormReadablePrice(thousands) {
	if(thousands < 1000){
		return thousands + " тыс. рублей";
	}
	else{
		return Math.floor(thousands/1000) + " млн. рублей";
	}
}


//FIlter disabling
$('.filter-disabler').on('click', function(e){
	e.stopPropagation();
	$(this).closest('.filter').toggleClass('disabled', !$(this).find('input')[0].checked);
});
$(document).ready(function(){
	$('.filter-disabler').each(function(){
		$(this).closest('.filter').toggleClass('disabled', !$(this).find('input')[0].checked);
	});
});
$('.filter').on('click', function(){
	$(this).removeClass('disabled');
	$(this).find('.filter-disabler').find('input')[0].checked = true;
});