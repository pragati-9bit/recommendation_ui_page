sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		// sayHello: function () {
		// 	MessageBox.show("Hello World!");
		// }
		
		
		// onDisplayMoviesList : function () {
		// 	//display the "movies page" target without changing the hash
		// 	this.getRouter().getTargets().display("moviesList", {
		// 		fromTarget : "main"
		// 	});
		// 	// this.getOwnerComponent().getRouter().navTo("moviesList");
		// },
		onInit: function() {
			// Initialize Controller1 and Controller2 if needed
			this.UserPref = new UserPref();
			this.MoviesList = new MoviesList();
		  },
        onInit: function() {
			this.getOwnerComponent().getRouter().initialize();
		 },
		 
		  
		  
	});
});






























// sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
// 	"use strict";

// 	return BaseController.extend("com.myorg.myapp.controller.Main", {
// 		// sayHello: function () {
// 		// 	MessageBox.show("Hello World!");
// 		// }
		
		
// 		// onDisplayMoviesList : function () {
// 		// 	//display the "movies page" target without changing the hash
// 		// 	this.getRouter().getTargets().display("moviesList", {
// 		// 		fromTarget : "main"
// 		// 	});
// 		// 	// this.getOwnerComponent().getRouter().navTo("moviesList");
// 		// },
//         onInit: function() {
// 			var oData = {
// 			  addedGenres: [] // Added genres list
// 			};
// 			var oModel = new sap.ui.model.json.JSONModel(oData);
// 			this.getView().setModel(oModel);
// 		  },

// 		  onNavToMovies : function (){

// 			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//                 oRouter.navTo("moviesList")
// 			// this.getRouter().navTo("moviesList");
// 			// this.getOwnerComponent().getRouter().navTo("moviesList");
// 		},
	  
		
// 		onAddGenrePress: function() {
// 			var sSelectedGenre = this.getView().byId("genreSelect").getSelectedItem().getKey();
// 			var oModel = this.getView().getModel();
// 			var aGenres = oModel.getProperty("/genres") || [];
		  
// 			// Check if the selected genre already exists in the list
// 			var bGenreExists = aGenres.some(function(item) {
// 			  return item.genre === sSelectedGenre;
// 			});
		  
// 			if (!bGenreExists) {
// 			  // Add the selected genre to the list with a default rating of 0
// 			  aGenres.push({
// 				genre: sSelectedGenre,
// 				rating: 0
// 			  });
		  
// 			  // Update the model to reflect the changes
// 			  oModel.setProperty("/genres", aGenres);
		  
// 			  // Refresh the binding of the table
// 			  this.getView().byId("genreTable").getBinding("items").refresh();
		  
// 			} else {
// 			  MessageBox.alert("Genre already added!");
// 			}
// 		  },
// 		  onAddActorPress: function() {
// 			var sSelectedActor = this.getView().byId("actorSelect").getSelectedItem().getKey();
// 			var oModel = this.getView().getModel();
// 			var aActors = oModel.getProperty("/actors") || [];
		  
// 			// Check if the selected actor already exists in the list
// 			var bActorExists = aActors.some(function(item) {
// 			  return item.actor === sSelectedActor;
// 			});
		  
// 			if (!bActorExists) {
// 			  // Add the selected actor to the list with a default rating of 0
// 			  aActors.push({
// 				actor: sSelectedActor,
// 				rating: 0
// 			  });
		  
// 			  // Update the model to reflect the changes
// 			  oModel.setProperty("/actors", aActors);
		  
// 			  // Refresh the binding of the table
// 			  this.getView().byId("actorTable").getBinding("items").refresh();
		  
			  
// 			} else {
// 			  MessageBox.alert("Actor already added!");
// 			}
// 		  }
		  
		  
// 	});
// });
