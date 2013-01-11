
// Create an application module for our demo.
var Demo = angular.module( "Demo", [] );

// Configure the routing. The $routeProvider will be automatically injected into 
// the configurator.
Demo.config(
	function( $routeProvider ){

		// Typically, when defining routes, you will map the route to a Template to be 
		// rendered; however, this only makes sense for simple web sites. When you are 
		// building more complex applications, with nested navigation, you probably need 
		// something more complex. In this case, we are mapping routes to render "Actions" 
		// rather than a template.
		$routeProvider
			.when(
				"/home",
				{
					action: "splash.home"
				}
			)
			.when(
				"/pets",
				{
					action: "standard.pets.categories"
				}
			)
			.when(
				"/pets/:categoryID",
				{
					action: "standard.pets.list"
				}
			)
			.when(
				"/pets/:categoryID/:petID",
				{
					action: "standard.pets.detail.background"
				}
			)
			.when(
				"/pets/:categoryID/:petID/diet",
				{
					action: "standard.pets.detail.diet"
				}
			)
			.when(
				"/pets/:categoryID/:petID/medical-history",
				{
					action: "standard.pets.detail.medicalHistory"
				}
			)
			.when(
				"/contact",
				{
					action: "standard.contact"
				}
			)
			.otherwise(
				{
					redirectTo: "/home"
				}
			)
		;

	}
);
