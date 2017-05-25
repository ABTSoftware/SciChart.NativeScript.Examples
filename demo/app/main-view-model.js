"use strict";

const Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    const viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);
    viewModel.data = createRandomData();

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    };

    return viewModel;
}

function createRandomData() {
    let data = [];
	for (let i = 0; i < 50; i++) {
		const x = 10 * i / 50;
		const y = Math.random() * 20;
		data.push({x: x, y: y});
	}
	return data;
}

exports.createViewModel = createViewModel;