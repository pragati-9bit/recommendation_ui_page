sap.ui.define(
	["./BaseController", "sap/m/MessageBox"],
	function (BaseController, MessageBox) {
		"use strict";

		return BaseController.extend("com.myorg.myapp.controller.UserPref", {
			onInit: function () {
				var oData = {
					// addedGenres: [] // Added genres list
					userEmail: "pragati@ninebit.in",
					genres: [],
					actors: [],
				};
				this.toggleMode(true);
				// var oModel = new sap.ui.model.json.JSONModel(oData);
				// this.getView().setModel(oModel);

				var oModel = new sap.ui.model.json.JSONModel(oData);
				this.getView().setModel(oModel, "entity");
				this.updatePreferences();
			},
			toggleMode: function (isCreating) {
				// this.isCreating = bIsCreating;
				var oButton = this.getView().byId("submitButton");
				if (isCreating) {
					oButton.setText("Create");
					oButton.detachPress(this.updatePreferences); // Detach updatePreferences function for create mode
					oButton.attachPress(this.onSubmit); // Attach onSubmit function for create mode
				} else {
					oButton.setText("Update");
					oButton.detachPress(this.onSubmit); // Detach onSubmit function for update mode
					oButton.attachPress(this.updatePreferences); // Attach updatePreferences function for update mode
				}
			},
			// onSubmit: function() {

			//   var oModel = this.getView().getModel("entity");
			// 	var sEmail = oModel.getProperty("/userEmail");
			//         var aAddedGenres = oModel.getProperty("/genres") || [];
			//         var aAddedActors = oModel.getProperty("/actors") || [];
			// 	var payload = {
			// 		email: sEmail,
			//             genre: aAddedGenres,
			//             actor: aAddedActors
			//         };

			//         fetch("http://192.168.1.22:9001/askdb/entity/preferences", {
			//             method: "POST",
			//             headers: {
			//                 "Content-Type": "application/json"
			//             },
			//             body: JSON.stringify(payload)
			//         })
			//         .then(function(response) {
			//             if (!response.ok) {
			//                 throw new Error("Error saving data");
			//             }
			//             return response.json();
			//         })
			//         .then(function(data) {
			//             MessageBox.success("Data saved successfully!");
			//             // Reset the form or perform any other necessary actions
			//             oModel.setProperty("/genres", []);
			//             oModel.setProperty("/actors", []);
			//         })
			//         .catch(function(error) {
			//             MessageBox.error(error.message);
			//         });

			//   },

			onSubmit: function () {
				console.log("submit calling");
				var oModel = this.getView().getModel("entity");
				// var nId= oModel.getProperty("/id")
				var nId = oModel.getProperty("/id");
				var sEmail = oModel.getProperty("/userEmail");
				var aAddedGenres = oModel.getProperty("/genres") || [];
				var aAddedActors = oModel.getProperty("/actors") || [];
				var payload = {
					id: nId,
					email: sEmail,
					genre: aAddedGenres,
					actor: aAddedActors,
				};

				var method = "POST"; // Default to POST (Create)

				// Check if there are existing genres or actors
				if (aAddedGenres.length > 0 || aAddedActors.length > 0) {
					method = "PUT"; // Use PUT for Update
				}

				var url = "http://192.168.1.22:9001/askdb/entity/preferences";
				if (method === "PUT") {
					url += `/${nId}`; // for Update
				}

				fetch(url, {
					method: method,
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				})
					.then(function (response) {
						if (!response.ok) {
							throw new Error(
								method === "PUT" ? "Error updating data" : "Error creating data"
							);
						}
						return response.json();
					})
					.then(function (data) {
						MessageBox.success(
							"Data " +
								(method === "PUT" ? "updated" : "created") +
								" successfully!"
						);
						// Reset the form or perform any other necessary actions
						oModel.setProperty("/genres", []);
						oModel.setProperty("/actors", []);
					})
					.catch(function (error) {
						MessageBox.error(error.message);
					});
			},

			onAddGenrePress: function () {
				var sSelectedGenre = this.getView()
					.byId("genreSelect")
					.getSelectedItem()
					.getKey();
				var oModel = this.getView().getModel("entity");
				var aGenres = oModel.getProperty("/genres") || [];

				// Check if the selected genre already exists in the list
				var bGenreExists = aGenres.some(function (item) {
					return item.genre === sSelectedGenre;
				});

				if (!bGenreExists) {
					// Add the selected genre to the list with a default rating of 0
					aGenres.push({
						genre: sSelectedGenre,
						rating: 0,
					});

					// Update the model to reflect the changes
					oModel.setProperty("/genres", aGenres);

					// Refresh the binding of the table
					this.getView().byId("genreTable").getBinding("item").refresh();
				} else {
					MessageBox.alert("Genre already added!");

					// return payload
				}
			},
			onAddActorPress: function () {
				var sSelectedActor = this.getView()
					.byId("actorSelect")
					.getSelectedItem()
					.getKey();
				var oModel = this.getView().getModel("entity");
				var aActors = oModel.getProperty("/actors") || [];

				// Check if the selected actor already exists in the list
				var bActorExists = aActors.some(function (item) {
					return item.actor === sSelectedActor;
				});

				if (!bActorExists) {
					// Add the selected actor to the list with a default rating of 0
					aActors.push({
						actor: sSelectedActor,
						rating: 0,
					});

					// Update the model to reflect the changes
					oModel.setProperty("/actors", aActors);

					// Refresh the binding of the table
					this.getView().byId("actorTable").getBinding("items").refresh();
				} else {
					MessageBox.alert("Actor already added!");
				}
			},

			// Function to toggle between create and update mode

			updatePreferences: async function () {
				console.log("Initializing UserPref Controller");
				var oModel = this.getView().getModel("entity");
				var sEmail = oModel.getProperty("/userEmail");

				if (sEmail) {
					try {
						const response = await fetch(
							`http://192.168.1.22:9001/askdb/entity/preferences?email=${sEmail}`,
							{
								method: "GET",
								headers: {
									"Content-Type": "application/json",
								},
							}
						);
						if (response.ok) {
							const result = await response.json();
							console.log("API Response:", result);
							if (result.length > 0) {
								const firstResult = result[0];
								if (firstResult) {
									this.getView().getModel("entity").setData(firstResult);
									// this.getView().getModel("entity").setProperty("/id", firstResult._id);
									console.log("id:", firstResult._id);
									console.log(
										"Data Prefilled:",
										firstResult.genre,
										firstResult.actor,
										firstResult.email
									);
									oModel.setProperty("/id", firstResult._id);

									oModel.setProperty("/userEmail", firstResult.email);
									oModel.setProperty("/genres", firstResult.genre);
									oModel.setProperty("/actors", firstResult.actor);
									this.toggleMode(false);
								} else {
									this.toggleMode(true); // Switch to create mode if no data found
								}
							}
						} else {
							throw new Error("Error fetching user preferences");
						}
					} catch (error) {
						console.error("Error:", error);
						MessageBox.error(error.message);
					}
				} else {
					console.warn("User Email is not available.");
				}
			},
		});
	}
);
