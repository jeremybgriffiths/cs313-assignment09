const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/postal-calculator', getData);

app.listen(port, function () {
	console.log('Node app is running on port', port);
});


function getData(request, response) {
	const weight = request.query.weight;
	const type = request.query.type;

	calculateRate(response, weight, type);
}

function calculateRate(response, weight, type) {
	let total = 0;
	switch (type) {
		case "Letters (Stamped)":
			total = calculateLetterStamped(weight);
			break;
		case "Letters (Metered)":
			total = calculateLetterMetered(weight);
			break;
		case "Large Envelopes (Flats)":
			total = calculateLargeEnvelope(weight);
			break;
		case "First-Class Package Service—Retail":
			total = calculateFirstClassPackage(weight);
			break;
		default:
			total = "Invalid Type";
			break;
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {
		weight: weight,
		type: type,
		total: total.toFixed(2)
	};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/rate-details.ejs', params);
}

function calculateLetterStamped(weight) {
	let total = 0;
	if (weight <= 1) {
		total = 0.55;
	} else if (weight <= 2) {
		total = 0.70;
	} else if (weight <= 3) {
		total = 0.85;
	} else if (weight <= 3.5) {
		total = 1.00;
	} else {
		total = "Invalid Weight";
	}

	return total;
}

function calculateLetterMetered(weight) {
	let total = 0;
	if (weight <= 1) {
		total = 0.50;
	} else if (weight <= 2) {
		total = 0.65;
	} else if (weight <= 3) {
		total = 0.80;
	} else if (weight <= 3.5) {
		total = 0.95;
	} else {
		total = "Invalid Weight";
	}

	return total;
}

function calculateLargeEnvelope(weight) {
	let total = 0;
	if (weight <= 1) {
		total = 1.00;
	} else if (weight <= 2) {
		total = 1.20;
	} else if (weight <= 3) {
		total = 1.40;
	} else if (weight <= 4) {
		total = 1.60;
	} else if (weight <= 5) {
		total = 1.80;
	} else if (weight <= 6) {
		total = 2.00;
	} else if (weight <= 7) {
		total = 2.20;
	} else if (weight <= 8) {
		total = 2.40;
	} else if (weight <= 9) {
		total = 2.60;
	} else if (weight <= 10) {
		total = 2.80;
	} else if (weight <= 11) {
		total = 3.00;
	} else if (weight <= 12) {
		total = 3.20;
	} else if (weight <= 13) {
		total = 3.40;
	} else {
		total = "Invalid Weight";
	}

	return total;
}

function calculateFirstClassPackage(weight) {
	var total = 0;
	if (weight <= 4) {
		total = 3.80;
	} else if (weight >= 5 && weight <= 8) {
		total = 4.60;
	} else if (weight >= 9 && weight <= 12) {
		total = 5.30;
	} else if (weight == 13) {
		total = 5.90;
	} else if (weight > 13) {
		total = "Invalid Weight";
	}

	return total;
}