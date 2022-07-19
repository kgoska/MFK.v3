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
					let totalSteps = 0;
					let multiplier = 1;
					let realValue = value;
					for (var i = 0; i < breakpoints.length; i++) {
						totalSteps += breakpoints[i].steps;
						if(value <= breakpoints[i].steps || i == breakpoints.length-1){
							multiplier = breakpoints[i].multiplier;
							break;
						}
						value -= breakpoints[i].steps;
					}
					value *= multiplier;
					break;
				case "linear":
				default:
					break;		
			}
			filter.data("filter-value",{value:value});
			//LABEL CODE
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
			return filterfieldData.value == objectfieldData.value;
		}
	},
};
$(document).on('click input change', '.filter-trigger', function(){
	let filter = $(this).closest('.filter');
	if(filter.length == 0){
		console.error("could not find filter a filter for the trigger", this);
	}
	UpdateFilter(filter);
});
function InitializeFilters(){
	let filters = $('.filter');
	for (var i = 0; i < filters.length; i++) {
		InitializeFilter($(filters[i]));
	}
	let filterContainers = $('.filters');
	for (var i = 0; i < filterContainers.length; i++) {
		ApplyFilters($(filterContainers[i]));
	}
}
function UpdateFilter(filter){

	let filterType = filter.data('filter-type');
	filterHandlerLookup[filterType].Update(filter);

	let filtersContainer = filter.closest('.filters');
	if(filtersContainer.data('auto-update')){
		ApplyFilters(filtersContainer);
	}
}
function InitializeFilter(filter){
	let filterType = filter.data('filter-type');
	filterHandlerLookup[filterType].Update(filter);
}
function ApplyFilters(filtersContainer){
	let filterElements = filtersContainer.find('.filter');
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
	let filteredItems = $('#' + filtersContainer.data('filtered-items-container-id')).children('.filtered-item');
	//hide all elements
	filteredItems.each(function(index){
		$(this).addClass("filtered-hidden");
	})
	for (let i = 0; i < filteredItems.length; i++) {
		
		filteredItems[i] = $(filteredItems[i]);
		let filteredItemData = JSON.parse(filteredItems[i].data('item-filter-data'));
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
	quantity = quantity.toString();
	let lastDigit = quantity.slice(quantity.length - 1);
	let penultimateDigit = 0;
	if(quantity.length > 1){
		penultimateDigit = quantity.slice(quantity.length - 2).slice(0,1);
	}
	switch(unit){
		case 'year':
			if(lastDigit == 0 || lastDigit > 4 || penultimateDigit == 1){
				return "Лет";
			}
			else if (lastDigit == 1){
				return "Год";
			}
			else{
				return "Года";
			}
			break;
		case 'month':
			if(lastDigit == 0 || lastDigit > 4 || penultimateDigit == 1){
				return "Месяцев";
			}
			else if (lastDigit == 1){
				return "Месяц";
			}
			else{
				return "Месяца";
			}
			break;
		case 'day':
			if(lastDigit == 0 || lastDigit > 4 || penultimateDigit == 1){
				return "Дней";
			}
			else if (lastDigit == 1){
				return "День";
			}
			else{
				return "Дня";
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
			return Math.floor(days/roundedTime[i].days) + " " + FormTimeQuantity(Math.floor(days/roundedTime[i].days), roundedTime[i].unit);
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