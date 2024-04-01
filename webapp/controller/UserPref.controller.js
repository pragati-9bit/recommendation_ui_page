sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.UserPref", {


        onInit: function() {
			var oData = {
			  addedGenres: [] // Added genres list
			};
			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel);
		  },
		// onInit: function() {
        //     var oData = {
		// 		addedGenres: [] // Added genres list
		// 	  };
		// 	  var oModel = new sap.ui.model.json.JSONModel(oData);
		// 	  this.getView().setModel(oModel);
        //     var oModel = this.getView().getModel();
        //     var sEmail = oModel.getProperty("/userEmail");
        //     if (sEmail) {
        //         // Check if preferences already exist for the user
        //         var aAddedGenres = oModel.getProperty("/genres") || [];
        //         var aAddedActors = oModel.getProperty("/actors") || [];
        //         if (aAddedGenres.length > 0 || aAddedActors.length > 0) {
        //             // Preferences exist, navigate to the edit part
					
		// 		this.getView().byId("genreTable").setVisible(true);
		// 		this.getView().byId("actorTable").setVisible(true);
            
                   
        //         } else {
        //             // No preferences exist, stay on the add part
        //             // Optionally, you can show a message to prompt the user to add preferences
        //         }
        //     } else {
        //         // No email set, user needs to enter email first
        //         // Optionally, you can prompt the user to enter email before adding preferences
        //     }
        // },
		//   onSubmit: function() {
        //     var oModel = this.getView().getModel();
        //     var aAddedGenres = oModel.getProperty("/genres") || [];
        //     var aAddedActors = oModel.getProperty("/actors") || [];

        //     // Perform actions with the collected data, such as sending it to the backend server

        //     // Example: Display a message with the added genres and actors
        //     var sMessage = "Added Genres:\n";
        //     aAddedGenres.forEach(function(item) {
        //         sMessage += item.genre + "\n";
        //     });
        //     sMessage += "\nAdded Actors:\n";
        //     aAddedActors.forEach(function(item) {
        //         sMessage += item.actor + "\n";
        //     });

        //     MessageBox.success(sMessage);
            
        //     // Reset the form or perform any other necessary actions
        //     oModel.setProperty("/genres", []);
        //     oModel.setProperty("/actors", []);
        // },
		onSubmit: function() {

            var oModel = this.getView().getModel();
			var sEmail = oModel.getProperty("/userEmail");
            var aAddedGenres = oModel.getProperty("/genres") || [];
            var aAddedActors = oModel.getProperty("/actors") || [];
			var payload = {
				email: sEmail, 
                genre: aAddedGenres,
                actor: aAddedActors
            };
            fetch("http://192.168.1.22:9001/askdb/entity/preferences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Error saving data");
                }
                return response.json();
            })
            .then(function(data) {
                MessageBox.success("Data saved successfully!");
                // Reset the form or perform any other necessary actions
                oModel.setProperty("/genres", []);
                oModel.setProperty("/actors", []);
            })
            .catch(function(error) {
                MessageBox.error(error.message);
            });
        },
		

		
		onAddGenrePress: function() {
			var sSelectedGenre = this.getView().byId("genreSelect").getSelectedItem().getKey();
			var oModel = this.getView().getModel();
			var aGenres = oModel.getProperty("/genres") || [];
		  
			// Check if the selected genre already exists in the list
			var bGenreExists = aGenres.some(function(item) {
			  return item.genre === sSelectedGenre;
			});
		  
			if (!bGenreExists) {
			  // Add the selected genre to the list with a default rating of 0
			  aGenres.push({
				genre: sSelectedGenre,
				rating: 0
			  });
		  
			  // Update the model to reflect the changes
			  oModel.setProperty("/genres", aGenres);
		  
			  // Refresh the binding of the table
			  this.getView().byId("genreTable").getBinding("items").refresh();
		  
			} else {
				  MessageBox.alert("Genre already added!");

				// return payload
			
			}
		  },
		  onAddActorPress: function() {
			var sSelectedActor = this.getView().byId("actorSelect").getSelectedItem().getKey();
			var oModel = this.getView().getModel();
			var aActors = oModel.getProperty("/actors") || [];
		  
			// Check if the selected actor already exists in the list
			var bActorExists = aActors.some(function(item) {
			  return item.actor === sSelectedActor;
			});
		  
			if (!bActorExists) {
			  // Add the selected actor to the list with a default rating of 0
			  aActors.push({
				actor: sSelectedActor,
				rating: 0
			  });
		  
			  // Update the model to reflect the changes
			  oModel.setProperty("/actors", aActors);
		  
			  // Refresh the binding of the table
			  this.getView().byId("actorTable").getBinding("items").refresh();
		  
			  
			} else {
			  MessageBox.alert("Actor already added!");
			}
		  }
		  
		  
	});
});
