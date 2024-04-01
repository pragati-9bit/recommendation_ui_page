sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.MoviesList", {
        // onInit: function () {
        //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //     oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
        // },
		sayHello: function () {
			MessageBox.show("Hello World!");
		}
    })
})