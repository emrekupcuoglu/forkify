//We will put all the variables that should be constant
//and should be re used across the project.
//The goal of having this file with all these variables
//is that it will allows us to easily configure our project
//by simply changing some of the data that is here
//in this configuration file.
//The only variables that we want here are the anes
//that are responsible for defining important data about
//the application itself, for example the API URL.
//We will use this url in multiple places in the project
//For example getting search data and also for uploading a recipe
//to the server. All of that will use this url
//Imagine that the url needs to change at some point
//For example there might be a version 3 of the API
//And we don't want to change that evertwhere
//and simply have a variable that we can re use

//We cut the url below from model.js
//We could have had a variable in the model.js as well
//But then we would have all these configuration files
//spread across multiple modules.
//But is easier to have all those variables in one
//central place.
//We are using an upper case variable because this is a constant
//that will never change.
//Using upper case for that kind of a variable is a common practice
//espeacially in a configuration file like this.  
export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const TIMEOUT_SEC = 10;
export const RESULTS_PER_PAGE = 10;
export const DEFAULT_SERVINGS = 4;
//!DO NOT STORE API KEYS IN A CONFIF FILE IN A REAL APPLICATION
export const KEY = "1639173a-29e1-4ec2-9a18-16a0a7125024";
export const MODAL_CLOSE_SEC = 2.5;
export const MODAL_RESET_SEC = 2.6;