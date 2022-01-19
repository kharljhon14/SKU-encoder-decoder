let dataToSave = {};
let code = [];
let codeCate = [];
let codeEdit = [];
let codeCateEdit = [];

let productsTemplates = {};

let data = []; //0 - Brands, 1-Category, 2- encodedlogs
let brands;
let sbuObject = {};
let category;
let productsObject = {};

const jobNumberContainer = document.getElementById("jobNumberContainer");
const jobNumberInput = document.getElementById("jobNumberInput");
const jobNumberForm = document.getElementById("jobNumberForm");
const errorMsgJR = document.querySelector(".errorMsgJR");
const errorMsgAddToSKU = document.querySelector(".errorMsgAddToSKU");
const addToSkuButton = document.getElementById("addToSkuButton");
const searchButton = document.getElementById("searchButton");

const encoderContainer = document.getElementById("encoderContainer");
const decoderContainer = document.getElementById("decoderContainer");

const backButtonEncoder = document.getElementById("backButtonEncoder");
const backButtonDecoder = document.getElementById("backButtonDecoder");
const backButtonTable = document.getElementById("backButtonTable");

const allCodeBtn = document.getElementById("allCodeBtn");
const tableConatainer = document.getElementById("tableConatainer");

const skipButton = document.getElementById("skipButton");

const saveButton = document.getElementById("saveButton");
const copyButton = document.getElementById("copyButton");

const tableBody = document.getElementById("tableBody");
const downloadCSV = document.getElementById("downloadCSV");

const selectSBUContainer = document.getElementById("selectSBUContainer");
const selectCategoryContainer = document.getElementById("selectCategoryContainer");
const indentifierInput = document.getElementById("indentifierInput");
const encodedContent = document.getElementById("encodedContent");

const errorMsgContainer = document.querySelector(".errorMsgContainer");
const errorMsgDecoderContainer = document.querySelector(".errorMsgDecoderContainer");

const decodedResult = document.getElementById("decodedResult");
const decoderInput = document.getElementById("decoder");
const editButtonDecoder = document.getElementById("editButtonDecoder");

const tableSearchInput = document.getElementById("tableSearchInput");

async function getData(path) {
   try {
      const response = await fetch(path, {
         method: "GET",
         credentials: "same-origin",
      });
      return await response.json();
   } catch (err) {
      console.log("Error:" + err);
   }
}

async function start() {
   let jsonData = await getData("Brands.json");

   const brandOptionContainer = document.getElementById("brandOptionContainer");
   const selectedBrand = document.getElementById("selectedBrand");

   const sbuOptionContainer = document.getElementById("sbuOptionContainer");
   const selectedSBU = document.getElementById("selectedSBU");

   const categoryOptionContainer = document.getElementById("categoryOptionContainer");
   const selectedCategory = document.getElementById("selectedCategory");

   const generateCodeBtn = document.getElementById("generateCodeBtn");

   const codeText = document.getElementById("codeText");

   //JR Number
   const jrDate = document.getElementById("jrDate");
   const jrBrand = document.getElementById("jrBrand");
   const jrSBU = document.getElementById("jrSBU");
   const jrCategory = document.getElementById("jrCategory");
   const jrProduct = document.getElementById("jrProduct");
   const jrIdentifier = document.getElementById("jrIdentifier");
   const jrRelatedJobs = document.getElementById("jrRelatedJobs");

   //Decoder
   let decodeCode;
   const decotedData = document.querySelectorAll(".decodedData");
   const decodeDate = document.getElementById("decodeDate");
   const decodeBrand = document.getElementById("decodeBrand");
   const decodeSBU = document.getElementById("decodeSBU");
   const decodeCategory = document.getElementById("decodeCategory");
   const decodeProduct = document.getElementById("decodeProduct");
   const decodeIdentifier = document.getElementById("decodeIdentifier");
   const decodedJR = document.getElementById("decodedJR");
   const editButtonDecoder = document.getElementById("editButtonDecoder");

   //Edit
   const editContainer = document.getElementById("editContainer");
   const selectedBrandEdit = document.getElementById("selectedBrandEdit");
   const brandOptionContainerEdit = document.getElementById("brandOptionContainerEdit");

   const selectedSBUEdit = document.getElementById("selectedSBUEdit");
   const sbuOptionContainerEdit = document.getElementById("sbuOptionContainerEdit");

   const selectedCategoryEdit = document.getElementById("selectedCategoryEdit");
   const categoryOptionContainerEdit = document.getElementById("categoryOptionContainerEdit");

   const selectedIndentifierEdit = document.getElementById("selectedIndentifierEdit");
   const indentifierOptionContainerEdit = document.getElementById("indentifierOptionContainerEdit");
   const jrOptionContainerEdit = document.getElementById("jrOptionContainerEdit");

   const selectedjrEdit = document.getElementById("selectedjrEdit");

   const codeTextEdit = document.getElementById("codeTextEdit");

   for (let key in jsonData) {
      data.push(jsonData[key]);
   }

   if (localStorage.getItem("encodeLogs") === null) {
      localStorage.setItem("encodeLogs", JSON.stringify(data[2]));
   }

   brands = data[0];
   category = data[1];

   for (let key in brands) {
      sbuObject[key] = Object.values(brands[key])[1];
   }

   for (let key in category) {
      productsObject[key] = Object.values(category[key])[1];
   }

   for (let key in productsObject) {
      for (let value in productsObject[key]) {
         productsTemplates[key + " " + value] = [];
      }
   }

   if (localStorage.getItem("productsTemplates") === null) {
      localStorage.setItem("productsTemplates", JSON.stringify(productsTemplates));
   }

   //Create BrandDropdown
   createEncoderSelection(brands, brandOptionContainer);

   const brandOberserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
         if (mutation.type === "attributes") {
            if (selectSBUContainer.classList.contains("hide")) selectSBUContainer.classList.remove("hide");
            encodedContent.classList.remove("hide");

            removeOldList(selectedSBU);

            if (selectedBrand.getAttribute("data-value") === "Global") resetSelectedValues(selectedSBU, "Choose a division");
            else if (selectedBrand.getAttribute("data-value") === "Vision Care") resetSelectedValues(selectedSBU, "Choose a SBU");
            else resetSelectedValues(selectedSBU, "Choose a brand");

            createEncoderSelection(sbuObject[selectedBrand.getAttribute("data-value")], sbuOptionContainer);

            if (code[0]) code[0] = Object.values(brands[selectedBrand.innerText])[0];
            else code.push(Object.values(brands[selectedBrand.innerText])[0]);

            saveButton.querySelector("button").disabled = false;

            codeText.innerText = code.concat(codeCate).join(" ");
         }
      });
   });

   const sbuOberserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
         if (mutation.type === "attributes") {
            if (selectCategoryContainer.classList.contains("hide")) selectCategoryContainer.classList.remove("hide");

            removeOldList(selectedCategory);
            createEncoderSelection(productsObject, categoryOptionContainer, true);

            let selectedSbu = sbuObject[selectedBrand.getAttribute("data-value")][selectedSBU.getAttribute("data-value")];

            code[1] = selectedSbu;
            saveButton.querySelector("button").disabled = false;

            codeText.innerText = code.concat(codeCate).join(" ");
         }
      });
   });

   const categoryOberserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
         if (mutation.type === "attributes") {
            if (indentifierInput.classList.contains("hide")) indentifierInput.classList.remove("hide");
            let categoryChildren = Object.values(category[selectedCategory.getAttribute("data-value")])[1];

            if (codeCate[0]) codeCate[0] = Object.values(category[selectedCategory.getAttribute("data-value")])[0];
            else codeCate.push(Object.values(category[selectedCategory.getAttribute("data-value")])[0]);

            if (codeCate[1]) codeCate[1] = categoryChildren[selectedCategory.getAttribute("data-value-child")];
            else codeCate.push(categoryChildren[selectedCategory.getAttribute("data-value-child")]);
            saveButton.querySelector("button").disabled = false;

            codeText.innerText = code.concat(codeCate).join(" ");
         }
      });
   });

   indentifierInput.addEventListener("change", function () {
      //Change when able to save
      indentifierInput.setAttribute("data-value", capitalizeFirstLetter(indentifierInput.value));
   });

   indentifierInput.addEventListener("keyup", function () {
      //Change when able to save

      if (indentifierInput.value != "") {
         generateCodeBtn.classList.remove("hide");
      } else {
         indentifierInput.removeAttribute("data-value");
         generateCodeBtn.classList.add("hide");
         codeCate[2] = null;
         codeText.innerText = code.concat(codeCate).join(" ");
      }
   });

   generateCodeBtn.onclick = function () {
      saveButton.querySelector("button").disabled = false;
      let templates = JSON.parse(localStorage.getItem("productsTemplates"))[selectedCategory.getAttribute("data-value") + " " + selectedCategory.getAttribute("data-value-child")];
      let lastValue = Object.values(templates).at(-1);
      if (lastValue !== undefined) codeCate[2] = ("00" + Object.values(templates).length).slice(-3);
      else codeCate[2] = "000";
      codeText.innerText = code.concat(codeCate).join(" ") + "*";
      saveButton.classList.remove("hide");
      copyButton.classList.remove("hide");
   };

   decoderInput.addEventListener("keyup", function () {
      for (let key in JSON.parse(localStorage.getItem("encodeLogs"))) {
         // console.log(Object.values(data[2][key])[0]);
         if (decoderInput.value.replace(/ /g, "").trim() === Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[0]) {
            decodeCode = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[0];
            // .match(/.{1,2}/g).join(" ");
            let codeFirstHalf = decodeCode.slice(0, 6);
            let codeSecondHalf = decodeCode.slice(6);
            codeFirstHalf = codeFirstHalf.match(/.{1,2}/g).join(" ");
            codeSecondHalf = codeSecondHalf.match(/.{1,3}/g).join(" ");

            codeEdit = codeFirstHalf.split(/\s+/);
            codeCateEdit = codeSecondHalf.split(/\s+/);

            console.log(codeFirstHalf, codeSecondHalf);
            console.log(codeEdit, codeCateEdit);

            decodeDate.innerText = `${Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[2]} / ${Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[1]}`;
            decodeBrand.innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[3];
            decodeSBU.innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[4];
            decodeCategory.innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[5];
            decodeProduct.innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[6];

            if (Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key]).length > 8)
               decodedJR.innerText = Object.values(Object.values(Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[8])[0])[0];
            else decodedJR.innerText = "";

            decodeIdentifier.innerText = "";

            for (let k in Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[7]) {
               let newSpan = document.createElement("span");
               newSpan.innerText = k;
               decodeIdentifier.appendChild(newSpan);
            }

            decodedResult.classList.remove("hide");
            errorMsgDecoderContainer.classList.add("hide");
            editButtonDecoder.classList.remove("hide");
            return;
         } else {
            errorMsgDecoderContainer.classList.remove("hide");
            decodedResult.classList.add("hide");
            editButtonDecoder.classList.add("hide");
         }
      }
   });

   //Edit Dropdown

   editButtonDecoder.addEventListener("click", function () {
      editContainer.classList.remove("hide");
      setEditValues(selectedBrandEdit, decodeBrand);
      setEditValues(selectedSBUEdit, decodeSBU);
      selectedCategoryEdit.innerText = `${decodeProduct.innerText} | ${decodeCategory.innerText}`;
      selectedCategoryEdit.setAttribute("data-value", `${decodeCategory.innerText}`);
      selectedCategoryEdit.setAttribute("data-value-child", `${decodeProduct.innerText} `);
      setEditValues(selectedIndentifierEdit, decodeIdentifier.querySelector("span"));
      setEditValues(selectedjrEdit, decodedJR);
      codeTextEdit.innerText = codeEdit.concat(codeCateEdit).join(" ");

      createEncoderSelection(brands, brandOptionContainerEdit);
      createEncoderSelection(sbuObject[selectedBrandEdit.getAttribute("data-value")], sbuOptionContainerEdit);
      createEncoderSelection(productsObject, categoryOptionContainerEdit, true);

      let templates = JSON.parse(localStorage.getItem("productsTemplates"))[decodeCategory.innerText + " " + decodeProduct.innerText];
      let allTemplates = {};
      for (let key in templates) {
         for (let value in templates[key]) {
            console.log(value);
            allTemplates[value] = templates[key][value];
         }
      }
      console.log(allTemplates);
      createEncoderSelection(allTemplates, indentifierOptionContainerEdit);
   });

   const brandEditOberserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
         if (mutation.type === "attributes") {
            removeOldList(selectedSBUEdit);

            if (selectedBrand.getAttribute("data-value") === "Global") resetSelectedValues(selectedSBU, "Choose a division");
            else if (selectedBrand.getAttribute("data-value") === "Vision Care") resetSelectedValues(selectedSBU, "Choose a SBU");
            else resetSelectedValues(selectedSBU, "Choose a brand");

            createEncoderSelection(sbuObject[selectedBrandEdit.getAttribute("data-value")], sbuOptionContainerEdit);

            // if (code[0]) code[0] = Object.values(brands[selectedBrandEdit.innerText])[0];
            // else code.push(Object.values(brands[selectedBrandEdit.innerText])[0]);

            // saveButton.querySelector("button").disabled = false;

            // codeText.innerText = code.concat(codeCate).join(" ");
         }
      });
   });

   //GenerateTable
   generateTable();

   //Download CSV
   const keys = Object.keys(JSON.parse(localStorage.getItem("encodeLogs"))[0]);
   const commaSeparatedString = [
      keys.join(","),
      JSON.parse(localStorage.getItem("encodeLogs"))
         .map((row) => keys.map((key) => row[key]).join(","))
         .join("\n"),
   ].join("\n");
   const csvBlob = new Blob([commaSeparatedString]);
   downloadCSV.href = URL.createObjectURL(csvBlob);

   skipButton.onclick = function () {
      brandOberserver.observe(selectedBrand, { attributes: true });
      sbuOberserver.observe(selectedSBU, { attributes: true });
      categoryOberserver.observe(selectedCategory, { attributes: true });

      jobNumberContainer.classList.add("hide");
      encoderContainer.classList.remove("hide");
      decoderContainer.classList.remove("hide");
      allCodeBtn.classList.remove("hide");
   };

   searchButton.addEventListener("click", function () {
      if (jobNumberInput.value !== "") {
         let encodeLogData = JSON.parse(localStorage.getItem("encodeLogs"));

         for (let i = 0; i < encodeLogData.length; i++) {
            for (let key in encodeLogData[i]) {
               if (key === "JOB") {
                  if (jobNumberInput.value.toLowerCase() === Object.values(Object.values(encodeLogData[i]["JOB"])[0])[0].toLowerCase()) {
                     jrDate.innerText = encodeLogData[i]["DATE"] + " / " + encodeLogData[i]["TIME"];
                     jrBrand.innerText = encodeLogData[i]["BRAND"];
                     jrSBU.innerText = encodeLogData[i]["SUB-BRAND"];
                     jrCategory.innerText = encodeLogData[i]["CATEGORY"];
                     jrProduct.innerText = encodeLogData[i]["PRODUCT"];
                     jrIdentifier.innerText = Object.keys(encodeLogData[i]["IDENTIFIER"]);
                     jrRelatedJobs.innerText = Object.values(Object.values(encodeLogData[i]["JOB"])[0])[0];
                     jobNumberForm.classList.remove("hide");
                     errorMsgAddToSKU.classList.add("hide");
                     jobNumberForm.classList.remove("errorMsgColor");

                     errorMsgJR.classList.add("hide");
                     return;
                  }
               }
            }
         }

         errorMsgAddToSKU.classList.add("hide");
         errorMsgJR.classList.remove("hide");
         jobNumberForm.classList.add("hide");
      }
   });

   addToSkuButton.addEventListener("click", function () {
      if (jobNumberInput.value !== "" && jobNumberInput.value.length === 12) {
         let encodeLogData = JSON.parse(localStorage.getItem("encodeLogs"));
         for (let i = 0; i < encodeLogData.length; i++) {
            for (let key in encodeLogData[i]) {
               if (key === "JOB") {
                  if (jobNumberInput.value.toLowerCase() === Object.values(Object.values(encodeLogData[i]["JOB"])[0])[0].toLowerCase()) {
                     jrDate.innerText = encodeLogData[i]["DATE"] + " / " + encodeLogData[i]["TIME"];
                     jrBrand.innerText = encodeLogData[i]["BRAND"];
                     jrSBU.innerText = encodeLogData[i]["SUB-BRAND"];
                     jrCategory.innerText = encodeLogData[i]["CATEGORY"];
                     jrProduct.innerText = encodeLogData[i]["PRODUCT"];
                     jrIdentifier.innerText = Object.keys(encodeLogData[i]["IDENTIFIER"]);
                     jrRelatedJobs.innerText = Object.values(Object.values(encodeLogData[i]["JOB"])[0])[0];

                     errorMsgAddToSKU.classList.remove("hide");
                     jobNumberForm.classList.add("errorMsgColor");
                     jobNumberForm.classList.remove("hide");
                     return;
                  }
               }
            }
         }
         jobNumberInput.setAttribute("data-value", jobNumberInput.value);

         brandOberserver.observe(selectedBrand, { attributes: true });
         sbuOberserver.observe(selectedSBU, { attributes: true });
         categoryOberserver.observe(selectedCategory, { attributes: true });

         jobNumberContainer.classList.add("hide");
         encoderContainer.classList.remove("hide");
         decoderContainer.classList.remove("hide");
         allCodeBtn.classList.remove("hide");
      }
   });

   backButtonEncoder.addEventListener("click", function () {
      resetValues();
      brandOberserver.disconnect();
      sbuOberserver.disconnect();
      categoryOberserver.disconnect();

      jobNumberContainer.classList.remove("hide");
      encoderContainer.classList.add("hide");
      decoderContainer.classList.add("hide");
      allCodeBtn.classList.remove("hide");
      backButtonEncoder.classList.add("hide");
      errorMsgContainer.classList.add("hide");
      encodedContent.classList.remove("errorMsgColor");
   });
}

function generateTable() {
   let allCodeData = document.querySelectorAll(".codeData");

   allCodeData.forEach(function (codeData) {
      codeData.remove();
   });

   for (let key in JSON.parse(localStorage.getItem("encodeLogs"))) {
      let size = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key]).length;
      let newTr = document.createElement("tr");
      newTr.id = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[0];
      newTr.classList.add("codeData");
      for (let i = 0; i < size; i++) {
         let newTD = document.createElement("td");
         //Check json
         if (i === 0) {
            let newLink = document.createElement("a");
            newLink.href = "#";
            newLink.innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[i];
            newTD.appendChild(newLink);
         } else if (i === 7) {
            newTD.innerText = Object.keys(Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[i]);
         } else if (i === 8) {
            newTD.innerText = Object.values(Object.values(Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[i])[0])[0];
         } else {
            newTD.innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[i];
         }

         newTr.appendChild(newTD);
      }
      tableBody.appendChild(newTr);
   }

   allCodeData = document.querySelectorAll(".codeData");
   tableSearchInput.addEventListener("change", function () {
      if (tableSearchInput.value !== "") {
         allCodeData.forEach(function (codedData) {
            codedData.classList.add("hide");
         });

         for (let i = 0; i < allCodeData.length; i++) {
            if (tableSearchInput.value === allCodeData[i].id) {
               allCodeData[i].classList.remove("hide");
               return;
            }
         }
         allCodeData.forEach(function (codedData) {
            codedData.classList.remove("hide");
         });
      } else {
         allCodeData.forEach(function (codedData) {
            codedData.classList.remove("hide");
         });
      }
   });
}

//This is the onclick events for the encoder dropdown
function dropdownOnClickEvents() {
   const dropdownSelectedAll = document.querySelectorAll(".selected");

   dropdownSelectedAll.forEach((selected) => {
      let optionList = selected.previousElementSibling.querySelectorAll(".option");
      let optionsContainer = selected.previousElementSibling;
      let searchInput = selected.nextElementSibling.querySelector("input");

      selected.onclick = function () {
         if (optionsContainer.classList.contains("active")) optionsContainer.classList.remove("active");
         else {
            let currentActive = document.querySelector(".optionContainer.active");
            if (currentActive) currentActive.classList.remove("active");
            optionsContainer.classList.add("active");
         }
         searchInput.value = "";
         filterList(optionList, "");
      };
      optionList.forEach(function (option) {
         option.addEventListener("click", function () {
            selected.innerText = option.querySelector("label").innerText;
            selected.setAttribute("data-value", option.querySelector("input").getAttribute("data-value"));
            if (option.querySelector("input").getAttribute("data-value-child")) {
               selected.setAttribute("data-value-child", option.querySelector("input").getAttribute("data-value-child"));
            }
            optionsContainer.classList.remove("active");
         });
      });

      searchInput.addEventListener("keyup", function () {
         filterList(optionList, searchInput.value);
      });
   });
}

//This will create a dropdown option element
function createEncoderSelection(data, parentElement, hasCombinedValues) {
   let optionElement = null;
   let inputElement = null;
   let labelElement = null;
   for (let key in data) {
      if (hasCombinedValues) {
         for (let value in data[key]) {
            optionElement = document.createElement("div");
            inputElement = document.createElement("input");
            labelElement = document.createElement("label");

            optionElement.classList.add("option");
            inputElement.classList.add("radio");

            inputElement.innerText = `${value} | ${key}`;
            inputElement.setAttribute("data-value", key);
            inputElement.setAttribute("data-value-child", value);

            labelElement.innerText = `${value} | ${key}`;

            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);

            parentElement.appendChild(optionElement);
         }
      } else {
         optionElement = document.createElement("div");
         inputElement = document.createElement("input");
         labelElement = document.createElement("label");

         optionElement.classList.add("option");
         inputElement.classList.add("radio");

         inputElement.innerText = key;
         inputElement.setAttribute("data-value", key);

         labelElement.innerText = key;

         optionElement.appendChild(inputElement);
         optionElement.appendChild(labelElement);

         parentElement.appendChild(optionElement);
      }
   }
   dropdownOnClickEvents();
}

function resetSelectedValues(selected, text) {
   selected.innerText = text;
   selected.removeAttribute("data-value");
}

function copyToClipboard(id) {
   var r = document.createRange();
   r.selectNode(document.getElementById(id));
   window.getSelection().removeAllRanges();
   window.getSelection().addRange(r);
   document.execCommand("copy");
   window.getSelection().removeAllRanges();
}

function save() {
   const encodedResult = document.getElementById("encodedResult");

   codeText.innerText = codeText.innerText.replace(/\*/g, "");

   let today = new Date();
   let ampm = today.getHours() >= 12 ? "PM" : "AM";
   let hour = (today.getHours() + 24) % 12 || 12;
   let minutes = ("0" + today.getMinutes()).slice(-2);
   let time = hour + ":" + minutes + " " + ampm;

   let result = today.toLocaleDateString("en-US", {
      // you can use undefined as first argument
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
   });
   let identiferObject = {};
   let selectedProduct = JSON.parse(localStorage.getItem("productsTemplates"))[selectedCategory.getAttribute("data-value") + " " + selectedCategory.getAttribute("data-value-child")];
   if (selectedProduct.length <= 0) {
      identiferObject[indentifierInput.getAttribute("data-value")] = "000";
   }
   identiferObject[indentifierInput.getAttribute("data-value")] = ("00" + Object.values(selectedProduct).length).slice(-3);

   for (let key in selectedProduct) {
   }

   for (let key in JSON.parse(localStorage.getItem("encodeLogs"))) {
      if (codeText.innerText.replace(/\s/g, "") === Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[0]) {
         document.getElementById("encodedDate").innerText =
            Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[2] + " / " + Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[1];
         document.getElementById("encodedBrand").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[3];
         document.getElementById("encodedSBU").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[4];
         document.getElementById("encodedCategory").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[5];
         document.getElementById("encodedProduct").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[6];
         document.getElementById("encodedIdentifier").innerText = Object.keys(Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[7]);

         errorMsgContainer.classList.remove("hide");
         encodedContent.classList.add("errorMsgColor");
         encodedResult.classList.remove("hide");
         return;
      }
   }

   dataToSave["CODE"] = codeText.innerText.replace(/\s/g, "");
   dataToSave["TIME"] = time;
   dataToSave["DATE"] = result;
   dataToSave["BRAND"] = selectedBrand.getAttribute("data-value");
   dataToSave["SUB-BRAND"] = selectedSBU.getAttribute("data-value");
   dataToSave["CATEGORY"] = selectedCategory.getAttribute("data-value");
   dataToSave["PRODUCT"] = selectedCategory.getAttribute("data-value-child");
   dataToSave["IDENTIFIER"] = identiferObject;

   productsTemplates = JSON.parse(localStorage.getItem("productsTemplates"));
   productsTemplates[dataToSave["CATEGORY"] + " " + dataToSave["PRODUCT"]].push(identiferObject);
   localStorage.setItem("productsTemplates", JSON.stringify(productsTemplates));

   if (jobNumberInput.getAttribute("data-value")) {
      dataToSave["JOB"] = [{ JR: jobNumberInput.getAttribute("data-value").toUpperCase(), TIME: time, DATE: result }];
   }

   document.getElementById("encodedDate").innerText = dataToSave["DATE"] + " " + dataToSave["TIME"];
   document.getElementById("encodedBrand").innerText = dataToSave["BRAND"];
   document.getElementById("encodedSBU").innerText = dataToSave["SUB-BRAND"];
   document.getElementById("encodedCategory").innerText = dataToSave["CATEGORY"];
   document.getElementById("encodedProduct").innerText = dataToSave["PRODUCT"];
   document.getElementById("encodedIdentifier").innerText = indentifierInput.getAttribute("data-value");
   if (jobNumberInput.getAttribute("data-value")) document.getElementById("encodedJR").innerText = jobNumberInput.getAttribute("data-value").toUpperCase();
   else document.getElementById("encodedJR").innerText = "";
   saveButton.querySelector("button").disabled = true;

   errorMsgContainer.classList.add("hide");
   encodedContent.classList.remove("errorMsgColor");
   encodedResult.classList.remove("hide");

   console.log(dataToSave);

   let newData = JSON.parse(localStorage.getItem("encodeLogs"));
   newData.push(dataToSave);
   localStorage.setItem("encodeLogs", JSON.stringify(newData));
   newData = [];
   dataToSave = {};
}

function setEditValues(targetInput, dataInput) {
   if (dataInput.innerText !== "") {
      targetInput.innerText = dataInput.innerText;
      targetInput.setAttribute("data-value", dataInput.innerText);
   } else {
      targetInput.innerText = "Choose a Job number";
      targetInput.removeAttribute("data-value");
   }
}

function capitalizeFirstLetter(string) {
   return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function removeOldList(selectedElement) {
   while (selectedElement.previousElementSibling.firstChild) {
      selectedElement.previousElementSibling.removeChild(selectedElement.previousElementSibling.lastChild);
   }
}

function filterList(optionList, searchTerm) {
   searchTerm = searchTerm.toLowerCase().replace(/\s/g, "");
   optionList.forEach((option) => {
      let label = option.querySelector("label").textContent.replace(/\s/g, "").toLowerCase();
      if (label.indexOf(searchTerm) != -1) {
         option.style.display = "block";
      } else {
         option.style.display = "none";
      }
   });
}

function resetValues() {
   selectedBrand.removeAttribute("data-value");
   selectedBrand.innerText = "Choose a brand";

   selectSBUContainer.classList.add("hide");
   selectedSBU.removeAttribute("data-value");
   selectedSBU.innerText = "Choose a SBU";

   selectedCategory.removeAttribute("data-value");
   selectedCategory.removeAttribute("data-value-child");
   selectedCategory.innerText = "Choose a product | Category";
   selectCategoryContainer.classList.add("hide");

   indentifierInput.removeAttribute("data-value");
   indentifierInput.value = "";
   indentifierInput.classList.add("hide");
   generateCodeBtn.classList.add("hide");

   encodedResult.classList.add("hide");
   saveButton.classList.add("hide");
   copyButton.classList.add("hide");

   encodedContent.classList.add("hide");

   code = [];
   codeCate = [];
   codeText.innerText = "";
}

allCodeBtn.addEventListener("click", function () {
   generateTable();
   encoderContainer.classList.add("hide");
   decoderContainer.classList.add("hide");
   tableConatainer.classList.remove("hide");
   allCodeBtn.classList.add("hide");
});

backButtonDecoder.addEventListener("click", function () {
   jobNumberContainer.classList.remove("hide");
   encoderContainer.classList.add("hide");
   decoderContainer.classList.add("hide");
   allCodeBtn.classList.add("hide");
   backButtonDecoder.classList.add("hide");
   errorMsgDecoderContainer.classList.add("hide");
   decodedResult.classList.add("hide");
   editButtonDecoder.classList.add("hide");
   decoderInput.value = "";
});

backButtonTable.addEventListener("click", function () {
   jobNumberContainer.classList.remove("hide");
   encoderContainer.classList.add("hide");
   decoderContainer.classList.add("hide");
   allCodeBtn.classList.add("hide");
   tableConatainer.classList.add("hide");
   tableSearchInput.value = "";

   document.querySelectorAll(".codeData").forEach(function (codedData) {
      codedData.classList.remove("hide");
   });
});

saveButton.onclick = function () {
   save();
};

encoderContainer.addEventListener("click", function () {
   decoderContainer.classList.add("hide");
   allCodeBtn.classList.add("hide");
   backButtonEncoder.classList.remove("hide");
});

decoderContainer.addEventListener("click", function () {
   encoderContainer.classList.add("hide");
   backButtonDecoder.classList.remove("hide");
   allCodeBtn.classList.add("hide");
});

start();
