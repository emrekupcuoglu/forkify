//The goal of this module is to contain
//a couple of functions that we re-use
//over and over in our project.
//This module is a central place for all of them
import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


//We created the AJAX function to refactor getJSON and the sendJSON functions
export const AJAX = async function (url, uploadData = undefined) {

  try {
    const fetchPromise = uploadData ? fetch(url, {

      method: "POST",
      //headers are basicaly some snippets of text
      //which are information about the request itself.
      //Many of them are standart.
      headers: {
        //With this we tell the API the data we are
        //going to send will be in a json format
        "Content-Type": "application/json"
      },
      //Body is basically the data we want to send
      body: JSON.stringify(uploadData)

    }) : fetch(url);

    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    };
    return data;
  }
  catch (err) {
    //We re throw the error so that it can be handled in the model.js
    throw err;

  }

};

//To start let's create a function that will get json

//We copied the code below from model.js
export const getJSON = async function (url) {
  try {
    const fetchPromise = fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    };
    return data;
  }
  catch (err) {
    //We re throw the error so that it can be handled in the model.js
    throw err;

  }

};

//?Sending data using the fetch() fucntion
//When we only pass in a url into the fetch funtion
//it automaticly creates a GET request.
//However to send data we need a POST request.
//For that besides passing in a url we also need to
//pass in an object of options.



export const sendJSON = async function (url, uploadData) {
  try {



    const fetchPromise = fetch(url, {
      method: "POST",
      //headers are basicaly some snippets of text
      //which are information about the request itself.
      //Many of them are standart.
      headers: {
        //With this we tell the API the data we are
        //going to send will be in a json format
        "Content-Type": "application/json"
      },
      //Body is basically the data we want to send
      body: JSON.stringify(uploadData)

    });

    //We will still race againts the timeout so that it doesn't run forever
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    //We will wait for data because the API we are using returns any
    //data we have sent.
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    };
    return data;
  }
  catch (err) {
    //We re throw the error so that it can be handled in the model.js
    throw err;

  }

};

