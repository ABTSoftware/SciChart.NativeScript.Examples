"use strict";
var observable = require("data/observable");

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        var _this = _super.call(this) || this;
        _this.set("actionBarTitle", "{N} RichUI Examples");
        _this.set("isExamplesPage", true);
        _this._examples = new Array();
        _this.loadData();
        return _this;
    }
    MainViewModel.prototype.loadData = function() {
        this._examples.push({ Id: "1", title: "Line Chart", description: "Generates a Line-Chart in code" });
        this._examples.push({ Id: "2", title: "Legend Chart", description: "Generates a Legend-Chart in code" });
        this._examples.push({ Id: "3", title: "Digital Line Chart", description: "Generates a Digital Line-Chart in code" });
        this._examples.push({ Id: "4", title: "Column Chart", description: "Generates a Line-Chart in code" });
        this._examples.push({ Id: "5", title: "Mountain Chart", description: "Generates a Mountain-Chart in code" });
        this._examples.push({ Id: "6", title: "Candlestick Chart", description: "Generates a Candlestick-Chart in code" });
        this._examples.push({ Id: "7", title: "Scatter Chart", description: "Generates a Scatter-Chart in code" });
        this._examples.push({ Id: "8", title: "Heatmap Chart", description: "Generates a Heatmap-Chart in code" });
        this._examples.push({ Id: "9", title: "Bubble Chart", description: "Generates a Bubble-Chart in code" });
        this._examples.push({ Id: "10", title: "Band Series Chart", description: "Generates a Band Series-Chart in code" });

    };
     Object.defineProperty(MainViewModel.prototype, "examples", {
        get: function () {
            return this._examples;
        },
        enumerable: true,
        configurable: true
    });
    return MainViewModel;
}(observable.Observable));
exports.MainViewModel = MainViewModel;
exports.appModel = new MainViewModel();
    

// var Observable = require("data/observable").Observable;

// function getMessage(counter) {
//     if (counter <= 0) {
//         return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
//     } else {
//         return counter + " taps left";
//     }
// }

// function createViewModel() {
//     var viewModel = new Observable();
//     viewModel.counter = 42;
//     viewModel.message = getMessage(viewModel.counter);

//     viewModel.onTap = function() {
//         this.counter--;
//         this.set("message", getMessage(this.counter));
//     }

//     return viewModel;
// }

// exports.createViewModel = createViewModel;