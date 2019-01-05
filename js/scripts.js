var assignmentCategory = document.getElementById("assignment-category");
var assignmentPoints = document.getElementById("assignment-points");
var assignmentTotal = document.getElementById("assignment-total");

var result = document.getElementById("result");

var categories = [];
var categoriesElement = document.getElementById("categories");

function category() {
	var result = {
		position: categories.length
	};

	var element = document.createElement("div");
	element.setAttribute("class", "category");

	var h2 = document.createElement("h2");
	h2.textContent = "CATEGORY " + (result.position + 1);
	element.appendChild(h2);

	var inputWeight = document.createElement("input");
	inputWeight.setAttribute("type", "number");
	inputWeight.setAttribute("placeholder", "weight %");
	element.appendChild(inputWeight);

	var inputCurrentPoints = document.createElement("input");
	inputCurrentPoints.setAttribute("type", "number");
	inputCurrentPoints.setAttribute("placeholder", "current points");
	element.appendChild(inputCurrentPoints);

	var inputTotalPoints = document.createElement("input");
	inputTotalPoints.setAttribute("type", "number");
	inputTotalPoints.setAttribute("placeholder", "total possible points");
	element.appendChild(inputTotalPoints);

	var button = document.createElement("button");
	button.setAttribute("class", "delete");
	button.textContent = "DELETE";
	element.appendChild(button);

	button.addEventListener("click", function() {
		element.parentNode.removeChild(element);
		categories.splice(result.position, 1);

		for (var i = 0; i < categories.length; i++) {
			var category = categories[i];
			category.position = i;
			category.h2.textContent = "CATEGORY " + (i + 1);
		}
	});

	result.h2 = h2;
	result.inputWeight = inputWeight;
	result.inputCurrentPoints = inputCurrentPoints;
	result.inputTotalPoints = inputTotalPoints;

	categories.push(result);

	return element;
}

function add() {
	categoriesElement.appendChild(category());
}

function calculate() {
	var num = 0, dem = 0;

	for (var i = 0; i < categories.length; i++) {
		var category = categories[i];
		var weight = parseInt(category.inputWeight.value) / 100;

		if (category.position + 1 === parseInt(assignmentCategory.value)) {
			num += parseInt(assignmentPoints.value) / parseInt(assignmentTotal.value) * weight;
			dem += weight;
		}

		num += parseInt(category.inputCurrentPoints.value) / parseInt(category.inputTotalPoints.value) * weight;
		dem += weight;
	}

	return num / dem;
}

document.getElementById("add").addEventListener("click", add);
document.getElementById("calculate").addEventListener("click", function() {
	var calculation = (calculate() * 100).toFixed(2);

	if (calculation === "NaN") {
		result.textContent = "invalid category";
	} else {
		result.textContent = calculation + "%";
	}
});

add();

