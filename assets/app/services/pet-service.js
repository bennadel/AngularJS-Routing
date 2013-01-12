(function( ng, app ) {
	
	"use strict";

	// I provide a repository for the pets.
	app.service(
		"petService",
		function( $q, _ ) {


			// I get the pet with the given ID.
			function getPetByID( id ) {

				var deferred = $q.defer();
				var pet = _.findWithProperty( cache, "id", id );

				if ( pet ) {

					deferred.resolve( ng.copy( pet ) );

				} else {

					deferred.reject();

				}

				return( deferred.promise );

			}


			// I get the pets in the given category.
			function getPetsByCategoryID( categoryID ) {

				var deferred = $q.defer();
				var pets = _.filterWithProperty( cache, "categoryID", categoryID );

				if ( pets ) {

					deferred.resolve( ng.copy( pets ) );

				} else {

					deferred.reject();

				}

				return( deferred.promise );

			}


			// I get a random pet in the given category, less the given pet.
			function getRandomPetExcluding( categoryID, excludePetID ) {

				var deferred = $q.defer();
				var pets = _.filterWithProperty( cache, "categoryID", categoryID );

				if ( pets ) {

					var index = _.random( 0, ( pets.length - 1 ) );

					while ( pets[ index ].id === excludePetID ) {

						index = _.random( 0, ( pets.length - 1 ) );

					}

					deferred.resolve( ng.copy( pets[ index ] ) );

				} else {

					deferred.reject();

				}

				return( deferred.promise );

			}


			// ---------------------------------------------- //
			// ---------------------------------------------- //


			// Set up a collection of constants for our pet categories. Normally, this would be managed
			// by the server-side relational database; but, since we're using static data, this will 
			// just make the code easier to read.
			var categories = {
				cats: "cats",
				dogs: "dogs"
			};

			// Set up a collection of size constants.
			var sizes = {
				small: "Small, 25 lbs or less",
				medium: "Medium, 26 - 60 lbs",
				large: "Large, 61 - 100 lbs",
				huge: "Huge, more than 100 lbs"
			};

			// Set up the pets data cache. For this demo, we'll just use static data.
			var cache = [
				{
					id: 1,
					categoryID: categories.dogs,
					name: "Annie",
					breed: "Pit Bull Terrier",
					color: "Tricolor",
					sex: "F",
					size: sizes.small,
					description: "I love chewing on shoes.",
					background: "Annie was found in an abandoned house in Brooklyn.",
					diet: "Annie loves raw chicken necks.",
					medicalHistory: "Annie has all of her shots."
				},
				{
					id: 2,
					categoryID: categories.dogs,
					name: "Voodoo",
					breed: "Chihuahua",
					color: "White With Black",
					sex: "F",
					size: sizes.small,
					description: "I am house-trained, but when I get excited, I sometimes tinkle.",
					background: "Voodoo was one of 17 dogs found in a hoarder's house.",
					diet: "Voodoo will eat just about anything.",
					medicalHistory: "Voodoo has all of his shots and is spayed."
				},
				{
					id: 3,
					categoryID: categories.dogs,
					name: "Frodo",
					breed: "Yorkie",
					color: "Silver With Blue",
					sex: "F",
					size: sizes.small,
					description: "I want to lick your face ... a lot.",
					background: "Frodo went on a great adventure!",
					diet: "Frodo loves chicken and fish and peanut butter.",
					medicalHistory: "Frodo has all of his shots."
				},
				{
					id: 4,
					categoryID: categories.dogs,
					name: "Brook",
					breed: "Labrador Retriever",
					color: "Yellow",
					sex: "M",
					size: sizes.large,
					description: "I'll eat anything, but newspaper makes me gassy.",
					background: "Brook was found walking along George Washington Bridge.",
					diet: "Brook loves any duck-based food.",
					medicalHistory: "Brook has all of her shots."
				},
				{
					id: 5,
					categoryID: categories.dogs,
					name: "Henry",
					breed: "Bulldog",
					color: "Tricolor",
					sex: "M",
					size: sizes.medium,
					description: "I'm surprisingly active and can jump!",
					background: "Henry's owner recently passed and was left with no family.",
					diet: "Henry prefers dry food.",
					medicalHistory: "Henry has all of his shots and is fixed."
				},
				{
					id: 6,
					categoryID: categories.cats,
					name: "Marley",
					breed: "Scottish Fold",
					color: "White",
					sex: "F",
					size: sizes.small,
					description: "I can climb walls like a ninja!",
					background: "Marley was found in an abandoned lot in Brooklyn.",
					diet: "Marley prefers wet food.",
					medicalHistory: "Marley has all of her shots and is spayed."
				},
				{
					id: 7,
					categoryID: categories.cats,
					name: "Jamie",
					breed: "Calico",
					color: "Tricolor",
					sex: "F",
					size: sizes.small,
					description: "I'm extremely people friend, for a cat.",
					background: "Jamie was found under the porch.",
					diet: "Jamie can't stand wet food.",
					medicalHistory: "Jamie has all of her shots and need to be spayed."
				},
				{
					id: 8,
					categoryID: categories.cats,
					name: "Bruno",
					breed: "Uknown",
					color: "Black",
					sex: "M",
					size: sizes.small,
					description: "I'm an escape artist.",
					background: "When found, Bruno was under-nourished.",
					diet: "Bruno loves milk and anything chicken-based.",
					medicalHistory: "Bruno has all of his shots and is fixed."
				},
				{
					id: 9,
					categoryID: categories.cats,
					name: "Wiggles",
					breed: "Burmese",
					color: "Gray",
					sex: "M",
					size: sizes.small,
					description: "I love lasers and chasing my own tail.",
					background: "Wiggles was a feral cat known for his jumping.",
					diet: "Wiggles has no specific dietary information.",
					medicalHistory: "Wiggles has all of his shots."
				},
				{
					id: 10,
					categoryID: categories.cats,
					name: "Cotton",
					breed: "Himalayan",
					color: "Tan With Black",
					sex: "F",
					size: sizes.small,
					description: "I love to cuddle at night.",
					background: "Cotton's owner recently passed.",
					diet: "Cotton will eat just about anything.",
					medicalHistory: "Cotton has all of her shots and needs to be fixed."
				}
			];


			// ---------------------------------------------- //
			// ---------------------------------------------- //


			// Return the public API.
			return({
				getPetByID: getPetByID,
				getPetsByCategoryID: getPetsByCategoryID,
				getRandomPetExcluding: getRandomPetExcluding
			});


		}
	);

})( angular, Demo );