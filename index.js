console.log("this is project 6");

//Utility Functions
//1. utitlity fuctions to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialise no. of parameters (param is refference of parameter)
let addParamCount = 0;

// Hide the parameter box initially getting global variables by their ID
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";
let jsonRequestBox = document.getElementById("jsonRequestBox");
let paramsRadio = document.getElementById("paramsRadio");
let jsonRadio = document.getElementById("jsonRadio");

// if the user clicks parameter box, hide the JSON Box
paramsRadio.addEventListener("click", () => {
  jsonRequestBox.style.display = "none";
  parametersBox.style.display = "block";
});

// if the user clicks JSON box, hide the parametersBox

jsonRadio.addEventListener("click", () => {
  jsonRequestBox.style.display = "block";
  parametersBox.style.display = "none";
});

// if the user clicks on "+" button, more parameter boxes get appear
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let extraParams = document.getElementById("extraParams");
  let string = `
    <div class="row g-3 my-1">
          <label for="url" class="col-sm-2 col-form-label">Parameter ${
            addParamCount + 2
          }
          </label>
          <div class="form-group col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Parameter ${addParamCount + 2} key"
              id="parameterKey${addParamCount + 2}"
              aria-label="First name"
            />
          </div>
          <div class="form-group col-md-4">
            <input
              type="text"
              id="parameterValue${addParamCount + 2}"
              class="form-control"
              placeholder="Enter Parameter ${addParamCount + 2} value"
              aria-label="Last name"
            />
          </div>
          <button
            class="btn btn-primary form-group col-sm-2 deleteParam" style="width: 40px"
          >
            -
          </button>
        </div>
    `;
  let paramElement = getElementFromString(string);
  extraParams.appendChild(paramElement);

  // add eventlistner to remove the parameters on clicking "-" button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addParamCount++;
});

// if the user clicks on submit button then
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //let jsonResponseText = document.getElementById("jsonResponseText");
  // jsonResponseText.value = "please wait... fetching response..";

  document.getElementById("responsePrism").innerHTML =
    "please wait... fetching response..";

  // fetching url values user has entered
  let urlFeild = document.getElementById("urlFeild").value;

  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;

  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // console log all the values for the bugging

  // if user has selected custParam,insted of json then collect all the parameters in to an obejct

  let data = {};
  if (contentType == "custParam") {
    for (let index = 0; index < addParamCount + 1; index++) {
      if (document.getElementById("parameterKey" + (1 + index)) != undefined) {
        let key = document.getElementById("parameterKey" + (1 + index)).value;
        let value = document.getElementById(
          "parameterValue" + (1 + index)
        ).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonRequestText").value;
  }
  console.log("url is:", urlFeild);
  console.log("Request Type is:", requestType);
  console.log("Content Type is:", contentType);
  console.log("data is:", data);

  // if the request type if GET, invoke fetch api to create a POST request
  if (requestType == "GET") {
    fetch(urlFeild, { method: "GET" })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(urlFeild, {
      method: "POST",
      body: data,
      header: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((text) => {
        // jsonResponseText.value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});

//fetch POST api part is still on work
