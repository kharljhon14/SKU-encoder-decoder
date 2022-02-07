let today = getDate();
let ampm = getAMPM(today);
let hour = getHours(today);
let minutes = getMinutes(today);
let time = getcurrentTime(hour, minutes, ampm);

let result = today.toLocaleDateString("en-US", {
   // you can use undefined as first argument
   year: "2-digit",
   month: "2-digit",
   day: "2-digit",
});

let dataToSave = {};

let currentData;
let currentDataToEdit;

let currentEncoData;
let currentEncoDataEdit;

let code = [];
let codeCate = [];
let codeEdit = [];
let codeCateEdit = [];

let productsTemplates = {};
let allTemplates = {};

let data = []; //0 - Brands, 1-Category, 2- encodedlogs
let brands;
let sbuObject = {};
let category;
let productsObject = {};

const jobNumberContainer = document.getElementById("jobNumberContainer");
const jobNumberInput = document.getElementById("jobNumberInput");
const jobNumberForm = document.getElementById("jobNumberForm");
const jrNumberSKUCodeContainer = document.getElementById("jrNumberSKUCodeContainer");
const jrNumberFoundSKUCode = document.getElementById("jrNumberFoundSKUCode");
const errorMsgJR = document.querySelector(".errorMsgJR");
const errorMsgAddToSKU = document.querySelector(".errorMsgAddToSKU");
const jrNumberErrorSKUCode = document.getElementById("jrNumberErrorSKUCode");
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

const backButtonToDecoder = document.getElementById("backButtonToDecoder");
const backButtonToStart = document.getElementById("backButtonToStart");

// Edit forrm
const editInputForm = document.getElementById("editInputForm");
const editBrand = document.getElementById("editBrand");
const editSBU = document.getElementById("editSBU");
const editCategory = document.getElementById("editCategory");
const editIdentifier = document.getElementById("editIdentifier");
const editJr = document.getElementById("editJr");

const editDropdownContainer = document.getElementById("editDropdownContainer");
const editDropdownFormSelected = document.getElementById("editDropdownFormSelected");
const editDropdownOptionsForm = document.getElementById("editDropdownOptionsForm");

const editSBUDropdownContainer = document.getElementById("editSBUDropdownContainer");
const editSBUDropdownOptionsForm = document.getElementById("editSBUDropdownOptionsForm");
const editSBUDropdownFormSelected = document.getElementById("editSBUDropdownFormSelected");

const editCategoryDropdownContainer = document.getElementById("editCategoryDropdownContainer");
const editCategoryDropdownOptionsForm = document.getElementById("editCategoryDropdownOptionsForm");
const editCategoryDropdownFormSelected = document.getElementById("editCategoryDropdownFormSelected");

const editCategoryProductDropdownContainer = document.getElementById("editCategoryProductDropdownContainer");
const editCategoryProductDropdownFormSelected = document.getElementById("editCategoryProductDropdownFormSelected");
const editCategoryProductDropdownOptionsForm = document.getElementById("editCategoryProductDropdownOptionsForm");

const editIdentifierDropdownContainer = document.getElementById("editIdentifierDropdownContainer");
const editIdentifierDropdownOptionsForm = document.getElementById("editIdentifierDropdownOptionsForm");
const editIdentifierDropdownFormSelected = document.getElementById("editIdentifierDropdownFormSelected");

const updateButton = document.querySelector(".updateButton");
const addButton = document.querySelector(".addButton");
const removeButton = document.querySelector(".removeButton");
const removeButtonEdit = document.getElementById("removeButtonEdit");
const editSelected = document.getElementById("editSelected");
const editSBUSelected = document.getElementById("editSBUSelected");
const editCategorySelected = document.getElementById("editCategorySelected");
const editCategoryProductSelected = document.getElementById("editCategoryProductSelected");
const editIdentifierSelected = document.getElementById("editIdentifierSelected");
// const editJr = document.getElementById("editJr");

const updateMSGContainer = document.querySelector(".updateMSGContainer");
const currentEntryText = document.getElementById("currentEntryText");
const backButtonEdit = document.getElementById("backButtonEdit");

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
   let decodeKey;
   const decotedData = document.querySelectorAll(".decodedData");
   const decodeDate = document.getElementById("decodeDate");
   const decodeBrand = document.getElementById("decodeBrand");
   const decodeSBU = document.getElementById("decodeSBU");
   const decodeCategory = document.getElementById("decodeCategory");
   const decodeProduct = document.getElementById("decodeProduct");
   const decodeIdentifier = document.getElementById("decodeIdentifier");
   const decodedJR = document.getElementById("decodedJR");
   const editButtonDecoder = document.getElementById("editButtonDecoder");

   //Edit active
   const editActiveContainer = document.getElementById("editActiveContainer");
   const cancelButtonEdit = document.getElementById("cancelButtonEdit");

   for (let key in jsonData) {
      data.push(jsonData[key]);
   }

   if (localStorage.getItem("encodeLogs") === null) {
      localStorage.setItem("encodeLogs", JSON.stringify(data[2]));
   }

   brands = data[0];
   category = data[1];

   if (localStorage.getItem("Brands") === null) localStorage.setItem("Brands", JSON.stringify(brands));

   if (localStorage.getItem("Category") === null) localStorage.setItem("Category", JSON.stringify(category));

   brands = JSON.parse(localStorage.getItem("Brands"));
   category = JSON.parse(localStorage.getItem("Category"));

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
            console.log("run");
            if (selectedBrand.getAttribute("data-value") === "Global") resetSelectedValues(selectedSBU, "Choose a division");
            else if (selectedBrand.getAttribute("data-value") === "Vision Care") resetSelectedValues(selectedSBU, "Choose a SBU");
            else resetSelectedValues(selectedSBU, "Choose a brand");
            removeOldList(selectedSBU);

            createEncoderSelection(sbuObject[selectedBrand.getAttribute("data-value")], sbuOptionContainer);

            if (code[0]) code[0] = Object.values(brands[selectedBrand.innerText])[0];
            else code.push(Object.values(brands[selectedBrand.innerText])[0]);

            saveButton.querySelector("button").disabled = false;

            codeText.innerText = code.concat(codeCate).join(" ");
            brandOberserver.disconnect();
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

      if (templates.length != 0) {
         for (let i = 0; i < templates.length; i++) {
            let identifer = Object.keys(templates[i]);

            if (identifer[0].trim().replace(/\s/g, "") === capitalizeFirstLetter(indentifierInput.value.trim().replace(/\s/g, ""))) {
               codeCate[2] = Object.values(templates[i]);
               break;
            } else {
               if (lastValue !== undefined) codeCate[2] = ("00" + Object.values(templates).length).slice(-3);
               else codeCate[2] = "000";
            }
         }
      } else {
         if (lastValue !== undefined) codeCate[2] = ("00" + Object.values(templates).length).slice(-3);
         else codeCate[2] = "000";
      }

      codeText.innerText = code.concat(codeCate).join(" ") + "*";
      saveButton.classList.remove("hide");
      copyButton.classList.remove("hide");
   };

   decoderInput.addEventListener("keyup", function () {
      for (let key in JSON.parse(localStorage.getItem("encodeLogs"))) {
         if (decoderInput.value.replace(/ /g, "").trim() === Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[0]) {
            decodeKey = key;
            decodeCode = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[key])[0];
            // .match(/.{1,2}/g).join(" ");
            let codeFirstHalf = decodeCode.slice(0, 6);
            let codeSecondHalf = decodeCode.slice(6);
            codeFirstHalf = codeFirstHalf.match(/.{1,2}/g).join(" ");
            codeSecondHalf = codeSecondHalf.match(/.{1,3}/g).join(" ");

            codeEdit = codeFirstHalf.split(/\s+/);
            codeCateEdit = codeSecondHalf.split(/\s+/);

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
         }
      }
      errorMsgDecoderContainer.classList.remove("hide");
      decodedResult.classList.add("hide");
      editButtonDecoder.classList.add("hide");
   });

   //Edit Dropdown
   let editKey;
   editButtonDecoder.addEventListener("click", function () {
      currentData = JSON.parse(localStorage.getItem("encodeLogs"));
      currentDataToEdit = currentData[decodeKey];
      console.log(currentDataToEdit);
      editContainer.classList.remove("hide");
      decoderContainer.classList.add("hide");
      backButtonToDecoder.classList.remove("hide");
      backButtonToStart.classList.add("hide");

      brandOberserverEdit.observe(selectedBrandEdit, { attributes: true });
      sbuOberserverEdit.observe(selectedSBUEdit, { attributes: true });
      categoryOberserverEdit.observe(selectedCategoryEdit, { attributes: true });
      identifierOberserverEdit.observe(selectedIndentifierEdit, { attributes: true });

      updateCurrentDataToDataForm();
   });

   backButtonToDecoder.addEventListener("click", function () {
      decodeBrand.innerText = currentDataToEdit["BRAND"];
      decodeSBU.innerText = currentDataToEdit["SUB-BRAND"];

      decodeCategory.innerText = currentDataToEdit["CATEGORY"];

      decodeProduct.innerText = currentDataToEdit["PRODUCT"];

      decodeDate.innerText = `${currentDataToEdit["DATE"]} / ${currentDataToEdit["TIME"]} `;
      decodeIdentifier.innerText = Object.keys(currentDataToEdit["INDENTIFIER"]).at(-1);

      if (selectedjrEdit.getAttribute("data-value") != "") decodedJR.innerText = selectedjrEdit.getAttribute("data-value");

      editContainer.classList.add("hide");
      decoderContainer.classList.remove("hide");
   });

   backButtonToStart.addEventListener("click", function () {
      editContainer.classList.add("hide");
      tableConatainer.classList.remove("hide");
      generateTable();
   });

   let currentlyEditingCode;

   editBrand.addEventListener("click", function () {
      editKey = "BRAND";
      editDropdownContainer.classList.add("hide");
      editSBUDropdownContainer.classList.add("hide");
      editCategoryDropdownContainer.classList.add("hide");
      editCategoryProductDropdownContainer.classList.add("hide");
      editDropdownContainer.classList.add("hide");
      editIdentifierDropdownContainer.classList.add("hide");

      updateMSGContainer.classList.remove("hide");
      currentlyEditingCode = `${codeTextEdit.innerText[0]}${codeTextEdit.innerText[1]}`;
      currentEntryText.innerText = currentlyEditingCode;

      editInputForm.value = selectedBrandEdit.innerText;
      editActiveContainer.classList.remove("hide");
      editContainer.classList.add("hide");
      console.log(currentData);
   });

   editSBU.addEventListener("click", function () {
      editKey = "SUB-BRAND";
      editDropdownContainer.classList.remove("hide");
      editSBUDropdownContainer.classList.add("hide");
      editCategoryDropdownContainer.classList.add("hide");
      editCategoryProductDropdownContainer.classList.add("hide");
      editIdentifierDropdownContainer.classList.add("hide");

      setEditValues(editDropdownFormSelected, currentDataToEdit["BRAND"]);
      removeOldList(editDropdownFormSelected);
      createEncoderSelection(brands, editDropdownOptionsForm);

      updateMSGContainer.classList.remove("hide");
      currentlyEditingCode = `${codeTextEdit.innerText[3]}${codeTextEdit.innerText[4]}`;
      currentEntryText.innerText = currentlyEditingCode;

      editInputForm.value = selectedSBUEdit.innerText;
      editActiveContainer.classList.remove("hide");
      editContainer.classList.add("hide");
   });

   editCategory.addEventListener("click", function () {
      editKey = "PRODUCT";
      editDropdownContainer.classList.remove("hide");
      editSBUDropdownContainer.classList.remove("hide");
      editCategoryDropdownContainer.classList.remove("hide");
      editIdentifierDropdownContainer.classList.add("hide");
      editCategoryProductDropdownContainer.classList.add("hide");

      editDropdownFormSelected.innerText = `${currentDataToEdit["BRAND"]}`;
      editDropdownFormSelected.setAttribute("data-value", currentDataToEdit["BRAND"]);

      editSBUDropdownFormSelected.innerText = `${currentDataToEdit["SUB-BRAND"]}`;
      editSBUDropdownFormSelected.setAttribute("data-value", currentDataToEdit["SUB-BRAND"]);

      editCategoryDropdownFormSelected.innerText = `${currentDataToEdit["CATEGORY"]}`;
      editCategoryDropdownFormSelected.setAttribute("data-value", currentDataToEdit["CATEGORY"]);
      editCategoryDropdownFormSelected.setAttribute("data-value-child", currentDataToEdit["PRODUCT"]);

      updateMSGContainer.classList.remove("hide");
      currentlyEditingCode = `${codeTextEdit.innerText[9]}${codeTextEdit.innerText[10]}${codeTextEdit.innerText[11]}`;
      currentEntryText.innerText = currentlyEditingCode;

      setEditValues(selectedIndentifierEdit, Object.keys(currentDataToEdit["INDENTIFIER"]).at(-1));

      removeOldList(editDropdownFormSelected);
      removeOldList(editSBUDropdownFormSelected);
      removeOldList(editCategoryDropdownFormSelected);

      createEncoderSelection(brands, editDropdownOptionsForm);
      createEncoderSelection(sbuObject, editSBUDropdownOptionsForm);
      createEncoderSelection(productsObject, editCategoryDropdownOptionsForm);

      editInputForm.value = currentDataToEdit["PRODUCT"];
      editActiveContainer.classList.remove("hide");
      editContainer.classList.add("hide");
   });

   editIdentifier.addEventListener("click", function () {
      editKey = "INDENTIFIER";
      editDropdownContainer.classList.remove("hide");
      editSBUDropdownContainer.classList.remove("hide");
      editCategoryDropdownContainer.classList.add("hide");
      editCategoryProductDropdownContainer.classList.remove("hide");

      editIdentifierDropdownContainer.classList.add("hide");

      editDropdownFormSelected.innerText = `${currentDataToEdit["BRAND"]}`;
      editDropdownFormSelected.setAttribute("data-value", currentDataToEdit["BRAND"]);

      editSBUDropdownFormSelected.innerText = `${currentDataToEdit["SUB-BRAND"]}`;
      editSBUDropdownFormSelected.setAttribute("data-value", currentDataToEdit["SUB-BRAND"]);

      editCategoryProductDropdownFormSelected.innerText = `${currentDataToEdit["PRODUCT"]} | ${currentDataToEdit["CATEGORY"]}`;
      editCategoryProductDropdownFormSelected.setAttribute("data-value", currentDataToEdit["CATEGORY"]);
      editCategoryProductDropdownFormSelected.setAttribute("data-value-child", currentDataToEdit["PRODUCT"]);

      editCategoryDropdownFormSelected.innerText = `${currentDataToEdit["CATEGORY"]}`;
      editCategoryDropdownFormSelected.setAttribute("data-value", currentDataToEdit["CATEGORY"]);
      editCategoryDropdownFormSelected.setAttribute("data-value-child", currentDataToEdit["PRODUCT"]);

      updateMSGContainer.classList.remove("hide");
      currentlyEditingCode = `${codeTextEdit.innerText[13]}${codeTextEdit.innerText[14]}${codeTextEdit.innerText[15]}`;
      currentEntryText.innerText = currentlyEditingCode;

      removeOldList(editDropdownFormSelected);
      removeOldList(editSBUDropdownFormSelected);
      removeOldList(editCategoryDropdownFormSelected);
      removeOldList(editCategoryProductDropdownFormSelected);
      removeOldList(editIdentifierDropdownFormSelected);

      createEncoderSelection(brands, editDropdownOptionsForm);
      createEncoderSelection(sbuObject, editSBUDropdownOptionsForm);
      createEncoderSelection(productsObject, editCategoryProductDropdownOptionsForm, true);
      createEncoderSelection(productsObject, editCategoryDropdownOptionsForm);
      createEncoderSelection(allTemplates, editIdentifierDropdownOptionsForm);

      editInputForm.value = selectedIndentifierEdit.innerText;
      editActiveContainer.classList.remove("hide");
      editContainer.classList.add("hide");
   });

   editJr.addEventListener("click", function () {
      editKey = "JOB";
      editDropdownContainer.classList.remove("hide");
      editSBUDropdownContainer.classList.remove("hide");
      editCategoryDropdownContainer.classList.add("hide");
      editCategoryProductDropdownContainer.classList.remove("hide");

      editIdentifierDropdownContainer.classList.add("hide");

      editDropdownFormSelected.innerText = `${currentDataToEdit["BRAND"]}`;
      editDropdownFormSelected.setAttribute("data-value", currentDataToEdit["BRAND"]);

      editSBUDropdownFormSelected.innerText = `${currentDataToEdit["SUB-BRAND"]}`;
      editSBUDropdownFormSelected.setAttribute("data-value", currentDataToEdit["SUB-BRAND"]);

      editCategoryProductDropdownFormSelected.innerText = `${currentDataToEdit["PRODUCT"]} | ${currentDataToEdit["CATEGORY"]}`;
      editCategoryProductDropdownFormSelected.setAttribute("data-value", currentDataToEdit["CATEGORY"]);
      editCategoryProductDropdownFormSelected.setAttribute("data-value-child", currentDataToEdit["PRODUCT"]);

      editCategoryDropdownFormSelected.innerText = `${currentDataToEdit["CATEGORY"]}`;
      editCategoryDropdownFormSelected.setAttribute("data-value", currentDataToEdit["CATEGORY"]);
      editCategoryDropdownFormSelected.setAttribute("data-value-child", currentDataToEdit["PRODUCT"]);

      updateMSGContainer.classList.remove("hide");
      currentEntryText.innerText = selectedjrEdit.innerText;
      currentlyEditingCode = undefined;

      removeOldList(editDropdownFormSelected);
      removeOldList(editSBUDropdownFormSelected);
      removeOldList(editCategoryDropdownFormSelected);
      removeOldList(editCategoryProductDropdownFormSelected);
      removeOldList(editIdentifierDropdownFormSelected);

      createEncoderSelection(brands, editDropdownOptionsForm);
      createEncoderSelection(sbuObject, editSBUDropdownOptionsForm);
      createEncoderSelection(productsObject, editCategoryProductDropdownOptionsForm, true);
      createEncoderSelection(productsObject, editCategoryDropdownOptionsForm);
      createEncoderSelection(allTemplates, editIdentifierDropdownOptionsForm);

      editInputForm.value = selectedjrEdit.innerText;
      editActiveContainer.classList.remove("hide");
      editContainer.classList.add("hide");
   });

   editSelected.addEventListener("click", function () {
      editKey = "BRAND";
      editDropdownContainer.classList.add("hide");
      editSBUDropdownContainer.classList.add("hide");
      editCategoryDropdownContainer.classList.add("hide");

      updateButton.src = "./Symbol-Update.svg";
      updateButton.style.cursor = "pointer";

      addButton.src = "./Symbol-Add.svg";
      addButton.style.cursor = "pointer";
      addButton.style.pointerEvents = "all";

      removeButtonEdit.querySelector("button").style.backgroundColor = "#000";
      removeButtonEdit.querySelector("button").style.cursor = "pointer";
      removeButtonEdit.querySelector("button").style.pointerEvents = "all";
      removeButtonEdit.classList.add("hide");

      removeButton.src = "./Symbol-Remove.svg";
      removeButton.style.cursor = "pointer";
      removeButton.style.pointerEvents = "all";

      currentlyEditingCode = `${codeTextEdit.innerText[0]}${codeTextEdit.innerText[1]}`;
      currentEntryText.innerText = currentlyEditingCode;

      editInputForm.value = editDropdownFormSelected.innerText;
   });

   editSBUSelected.addEventListener("click", function () {
      editKey = "SUB-BRAND";

      editDropdownContainer.classList.remove("hide");
      editSBUDropdownContainer.classList.add("hide");
      editCategoryDropdownContainer.classList.add("hide");

      updateButton.src = "./Symbol-Update.svg";
      updateButton.style.cursor = "pointer";

      addButton.src = "./Symbol-Add.svg";
      addButton.style.cursor = "pointer";
      addButton.style.pointerEvents = "all";

      removeButtonEdit.querySelector("button").style.backgroundColor = "#000";
      removeButtonEdit.querySelector("button").style.cursor = "pointer";
      removeButtonEdit.querySelector("button").style.pointerEvents = "all";
      removeButtonEdit.classList.add("hide");

      removeButton.src = "./Symbol-Remove.svg";
      removeButton.style.cursor = "pointer";
      removeButton.style.pointerEvents = "all";

      currentlyEditingCode = `${codeTextEdit.innerText[3]}${codeTextEdit.innerText[4]}`;
      currentEntryText.innerText = currentlyEditingCode;

      editInputForm.value = editSBUDropdownFormSelected.innerText;
   });

   editCategorySelected.addEventListener("click", function () {
      editKey = "CATEGORY";
      editDropdownContainer.classList.add("hide");
      editSBUDropdownContainer.classList.add("hide");
      editCategoryDropdownContainer.classList.add("hide");

      updateButton.src = "./Symbol-Update.svg";
      updateButton.style.cursor = "pointer";

      addButton.src = "./Symbol-Add.svg";
      addButton.style.cursor = "pointer";
      addButton.style.pointerEvents = "all";

      removeButtonEdit.querySelector("button").style.backgroundColor = "#000";
      removeButtonEdit.querySelector("button").style.cursor = "pointer";
      removeButtonEdit.querySelector("button").style.pointerEvents = "all";
      removeButtonEdit.classList.add("hide");

      removeButton.src = "./Symbol-Remove.svg";
      removeButton.style.cursor = "pointer";
      removeButton.style.pointerEvents = "all";

      updateMSGContainer.classList.remove("hide");
      currentlyEditingCode = `${codeTextEdit.innerText[6]}${codeTextEdit.innerText[7]}`;
      currentEntryText.innerText = currentlyEditingCode;

      editInputForm.value = editCategoryDropdownFormSelected.innerText;
   });

   editCategoryProductSelected.addEventListener("click", function () {
      editKey = "PRODUCT";
      editDropdownContainer.classList.remove("hide");
      editSBUDropdownContainer.classList.remove("hide");
      editCategoryDropdownContainer.classList.remove("hide");
      editCategoryProductDropdownContainer.classList.add("hide");

      updateButton.src = "./Symbol-Update.svg";
      updateButton.style.cursor = "pointer";

      addButton.src = "./Symbol-Add.svg";
      addButton.style.cursor = "pointer";
      addButton.style.pointerEvents = "all";

      removeButtonEdit.querySelector("button").style.backgroundColor = "#000";
      removeButtonEdit.querySelector("button").style.cursor = "pointer";
      removeButtonEdit.querySelector("button").style.pointerEvents = "all";
      removeButtonEdit.classList.add("hide");

      removeButton.src = "./Symbol-Remove.svg";
      removeButton.style.cursor = "pointer";
      removeButton.style.pointerEvents = "all";

      editInputForm.value = currentDataToEdit["PRODUCT"];
   });

   editInputForm.addEventListener("keyup", function () {
      if (currentDataToEdit[editKey] !== editInputForm.value) {
         updateButton.src = "./Symbol-Update.svg";
         updateButton.style.cursor = "pointer";
      }
   });

   updateButton.addEventListener("click", function () {
      if (currentDataToEdit[editKey] !== editInputForm.value && editInputForm.value !== "" && editInputForm.value !== " ") {
         updateButton.src = "./Symbol-Update copy.svg";
         updateButton.style.cursor = "default";
         updateMSGContainer.classList.remove("hide");

         if (currentlyEditingCode != undefined) currentEntryText.innerText = `Entry ${currentlyEditingCode} updated!`;
         else {
            currentEntryText.innerText = `JR ${editInputForm.value} updated!`;
         }

         let oldJR = currentDataToEdit[editKey];

         if (editKey === "INDENTIFIER") {
            // currentDataToEdit[editKey] = Object.keys(currentDataToEdit["INDENTIFIER"]).at(-1);
            let newIdentifier = {};
            newIdentifier[`${editInputForm.value}`] = Object.values(currentDataToEdit[editKey]).at(-1);

            currentDataToEdit[editKey] = newIdentifier;
         } else {
            currentDataToEdit[editKey] = editInputForm.value;
         }

         today = getDate();
         ampm = getAMPM(today);
         hour = getHours(today);
         minutes = getMinutes(today);
         time = getcurrentTime(hour, minutes, ampm);

         result = today.toLocaleDateString("en-US", {
            // you can use undefined as first argument
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
         });
         currentDataToEdit["TIME"] = time;
         currentDataToEdit["DATE"] = result;

         currentEncoDataEdit = currentDataToEdit;
         for (let i = 0; i < currentEncoData.length; i++) {
            if (currentEncoData[i]["CODE"] === currentEncoDataEdit["CODE"]) {
               if (currentEncoDataEdit["JOB"] != "N/A") {
                  for (let key in currentEncoData[i]["JOB"]) {
                     if (currentEncoData[i]["JOB"][key]["JR"] == oldJR) {
                        let newJob = currentEncoData[i]["JOB"];
                        let temp = currentEncoDataEdit["JOB"];

                        console.log(temp, newJob);
                        currentEncoDataEdit["JOB"] = newJob;
                        currentEncoData[i] = currentEncoDataEdit;
                        currentEncoData[i]["JOB"][key]["JR"] = temp;
                        currentEncoData[i]["JOB"][key]["TIME"] = currentEncoDataEdit["TIME"];
                        currentEncoData[i]["JOB"][key]["DATE"] = currentEncoDataEdit["DATE"];

                        localStorage.setItem("encodeLogs", JSON.stringify(currentEncoData));
                        currentEncoData[i]["JOB"] = temp;
                        break;
                     }
                  }
               } else {
                  console.log("na");
                  currentEncoData[i] = currentEncoDataEdit;
                  delete currentEncoData[i]["JOB"];
                  localStorage.setItem("encodeLogs", JSON.stringify(currentEncoData));
                  break;
               }
            }
         }

         if (editKey == "JOB")
            for (let i = 0; i < currentEncoData.length; i++) {
               if (currentEncoData[i]["CODE"] === currentEncoDataEdit["CODE"]) {
                  if (currentEncoData[i]["JOB"] == undefined) {
                     currentEncoData[i]["JOB"] = [{ JR: editInputForm.value, TIME: time, DATE: result }];

                     localStorage.setItem("encodeLogs", JSON.stringify(currentEncoData));
                     break;
                  }
               }
            }
         localStorage.setItem("tableData", JSON.stringify(currentData));
         updateCurrentDataToDataForm();
      }
   });

   addButton.addEventListener("click", function () {
      if (currentDataToEdit[editKey] !== editInputForm.value && editInputForm.value !== "" && editInputForm.value !== " ") {
         addButton.src = "./Symbol-Add Copy.svg";
         addButton.style.cursor = "default";
         addButton.style.pointerEvents = "none";

         if (editKey === "SUB-BRAND") {
            console.log("Updated SBU");
            let sbuKey;
            let sbuLength;
            if (editDropdownFormSelected.getAttribute("data-value") === "Global") sbuKey = "Division";
            else if (editDropdownFormSelected.getAttribute("data-value") === "Vision Care") sbuKey = "SBUs";
            else sbuKey = "Brand";
            if (
               Object.values(brands[editDropdownFormSelected.getAttribute("data-value")][sbuKey]).at(-1) != null ||
               Object.values(brands[editDropdownFormSelected.getAttribute("data-value")][sbuKey]).at(-1) != undefined
            ) {
               sbuLength = parseInt(Object.values(brands[editDropdownFormSelected.getAttribute("data-value")][sbuKey]).at(-1));
               sbuLength += 1;
            } else sbuLength = 00;

            let sbus = brands[editDropdownFormSelected.getAttribute("data-value")][sbuKey];

            sbus[editInputForm.value] = sbuLength.toString().padStart(2, "0");
            localStorage.setItem("SBU", JSON.stringify(sbus));
            brands[editDropdownFormSelected.getAttribute("data-value")][sbuKey] = sbus;
            sbus = JSON.parse(localStorage.getItem("SBU"));

            localStorage.setItem("Brands", JSON.stringify(brands));
            brands = JSON.parse(localStorage.getItem("Brands"));
            currentEntryText.innerText = `Entry ${editInputForm.value} added `;

            for (let key in brands) {
               sbuObject[key] = Object.values(brands[key])[1];
            }
         }

         if (editKey === "BRAND") {
            console.log("Updated Brands");
            let brandsArray = Object.values(brands);
            let newValues = {};

            newValues["Number"] = brandsArray.length.toString().padStart(2, "0");
            newValues["Brand"] = {};

            brands[editInputForm.value] = newValues;

            localStorage.setItem("Brands", JSON.stringify(brands));
            brands = JSON.parse(localStorage.getItem("Brands"));

            updateMSGContainer.classList.remove("hide");
            currentEntryText.innerText = `Entry ${editInputForm.value} added`;

            editKey = "SUB-BRAND";
            editDropdownContainer.classList.remove("hide");
            editSBUDropdownContainer.classList.add("hide");
            editCategoryDropdownContainer.classList.add("hide");
            editCategoryProductDropdownContainer.classList.add("hide");
            editIdentifierDropdownContainer.classList.add("hide");

            setEditValues(editDropdownFormSelected, editInputForm.value);
            removeOldList(editDropdownFormSelected);
            createEncoderSelection(brands, editDropdownOptionsForm);

            currentEntryText.innerText = `Entry ${editInputForm.value} added `;

            editInputForm.value = selectedSBUEdit.innerText;
            editActiveContainer.classList.remove("hide");
            editContainer.classList.add("hide");

            addButton.src = "./Symbol-Add.svg";
            addButton.style.cursor = "pointer";
            addButton.style.pointerEvents = "all";

            removeOldList(selectedBrand);
            createEncoderSelection(brands, brandOptionContainer);
         }

         if (editKey === "PRODUCT") {
            console.log("Updated Products");
            let productLength;
            if (
               Object.values(category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"]).at(-1) != null ||
               Object.values(category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"]).at(-1) != undefined
            )
               productLength = parseInt(Object.values(category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"]).at(-1));
            else productLength = 00;

            productLength += 1;
            let products = category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"];

            products[editInputForm.value] = productLength.toString().padStart(3, "0");
            localStorage.setItem("product", JSON.stringify(products));
            category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"] = products;
            products = JSON.parse(localStorage.getItem("product"));

            localStorage.setItem("Category", JSON.stringify(category));
            category = JSON.parse(localStorage.getItem("Category"));
            currentEntryText.innerText = `Entry ${editInputForm.value} added `;

            for (let key in category) {
               for (let value in category[key]["Product"]) {
                  productsTemplates[key + " " + value] = [];
               }
            }

            localStorage.setItem("productsTemplates", JSON.stringify(productsTemplates));
            console.log(JSON.parse(localStorage.getItem("productsTemplates")));

            for (let key in category) {
               productsObject[key] = Object.values(category[key])[1];
            }

            removeOldList(selectedCategory);
            createEncoderSelection(productsObject, categoryOptionContainer, true);
         }

         if (editKey === "CATEGORY") {
            console.log("Updated Category");
            let categoryArray = Object.values(category);
            let newCategory = {};

            newCategory["Number"] = categoryArray.length.toString().padStart(2, "0");
            newCategory["Product"] = {};

            category[editInputForm.value] = newCategory;

            localStorage.setItem("Category", JSON.stringify(category));
            category = JSON.parse(localStorage.getItem("Category"));

            editKey = "PRODUCT";
            editDropdownContainer.classList.remove("hide");
            editSBUDropdownContainer.classList.remove("hide");
            editCategoryDropdownContainer.classList.remove("hide");
            editIdentifierDropdownContainer.classList.add("hide");
            editCategoryProductDropdownContainer.classList.add("hide");
            editCategoryDropdownFormSelected.setAttribute("data-value", editInputForm.value);
            for (let key in category) {
               productsObject[key] = Object.values(category[key])[1];
            }

            removeOldList(editCategoryDropdownFormSelected);
            createEncoderSelection(productsObject, editCategoryDropdownOptionsForm);

            removeOldList(selectedCategory);
            createEncoderSelection(productsObject, categoryOptionContainer, true);

            currentEntryText.innerText = `Entry ${editInputForm.value} added `;

            addButton.src = "./Symbol-Add.svg";
            addButton.style.cursor = "pointer";
            addButton.style.pointerEvents = "all";

            editInputForm.value = selectedCategoryEdit.getAttribute("data-value-child");
            editActiveContainer.classList.remove("hide");
         }

         if (editKey === "INDENTIFIER") {
            let productsTemplate = JSON.parse(localStorage.getItem("productsTemplates"));
            let key = `${editCategoryDropdownFormSelected.getAttribute("data-value")} ${editCategoryDropdownFormSelected.getAttribute("data-value-child")}`;
            let newTemplate = {};
            let templateLength = productsTemplate[key].length;

            newTemplate[editInputForm.value] = templateLength.toString().padStart(3, "0");

            productsTemplate[key].push(newTemplate);

            localStorage.setItem("productsTemplates", JSON.stringify(productsTemplate));
         }

         if (editKey === "JOB") {
            let enco = JSON.parse(localStorage.getItem("encodeLogs"));
            for (let i = 0; i < enco.length; i++) {
               if (enco[i]["CODE"] == currentDataToEdit["CODE"]) {
                  for (let y = 0; y < enco[i]["JOB"].length; y++) {
                     if (enco[i]["JOB"][y]["JR"] === editInputForm.value) {
                        alert("duplicate");
                        return;
                     } else {
                        let newObj = {};
                        today = getDate();
                        ampm = getAMPM(today);
                        hour = getHours(today);
                        minutes = getMinutes(today);
                        time = getcurrentTime(hour, minutes, ampm);

                        result = today.toLocaleDateString("en-US", {
                           // you can use undefined as first argument
                           year: "2-digit",
                           month: "2-digit",
                           day: "2-digit",
                        });
                        newObj = currentDataToEdit;

                        newObj["JR"] = editInputForm.value;
                        newObj["TIME"] = time;
                        newObj["DATE"] = result;

                        enco[i]["JOB"].push(newObj);
                        localStorage.setItem("encodeLogs", JSON.stringify(enco));
                        return;
                     }
                  }
                  break;
               }
            }
         }

         updateCurrentDataToDataForm();
      }
   });

   removeButton.addEventListener("click", function () {
      //Add the msg laterr
      alert("Click “REMOVE” to delete.");
      removeButton.src = "./Symbol-Remove Copy.svg";
      removeButton.style.cursor = "default";
      removeButton.style.pointerEvents = "none";

      removeButtonEdit.classList.remove("hide");
   });

   removeButtonEdit.addEventListener("click", function () {
      let list = JSON.parse(localStorage.getItem("encodeLogs"));
      let newList = [];

      removeButtonEdit.querySelector("button").style.backgroundColor = "#B4B4B4";
      removeButtonEdit.querySelector("button").style.cursor = "default";
      removeButtonEdit.querySelector("button").style.pointerEvents = "none";

      if (editKey === "BRAND") {
         for (let i = 0; i < list.length; i++) {
            if (list[i]["BRAND"] !== editInputForm.value) newList.push(list[i]);
         }

         console.log(newList);
         localStorage.setItem("encodeLogs", JSON.stringify(newList));
         generateTable();

         delete brands[editInputForm.value];
         localStorage.setItem("Brands", JSON.stringify(brands));
         brands = JSON.parse(localStorage.getItem("Brands"));
      }

      if (editKey === "SUB-BRAND") {
         let sbuKeyRemove;

         if (editDropdownFormSelected.getAttribute("data-value") === "Global") sbuKeyRemove = "Division";
         else if (editDropdownFormSelected.getAttribute("data-value") === "Vision Care") sbuKeyRemove = "SBUs";
         else sbuKeyRemove = "Brand";

         let sbuList = brands[editDropdownFormSelected.getAttribute("data-value")][sbuKeyRemove];

         for (let i = 0; i < list.length; i++) {
            if (list[i]["SUB-BRAND"] !== editInputForm.value) newList.push(list[i]);
         }

         delete sbuList[editInputForm.value];

         localStorage.setItem("encodeLogs", JSON.stringify(newList));
         generateTable();

         brands[editDropdownFormSelected.getAttribute("data-value")]["SBUs"] = sbuList;

         localStorage.setItem("Brands", JSON.stringify(brands));

         brands = JSON.parse(localStorage.getItem("Brands"));
      }

      if (editKey === "CATEGORY") {
         for (let i = 0; i < list.length; i++) {
            if (list[i]["CATEGORY"] !== editInputForm.value) newList.push(list[i]);
         }

         localStorage.setItem("encodeLogs", JSON.stringify(newList));
         generateTable();

         delete category[editInputForm.value];
         localStorage.setItem("Category", JSON.stringify(category));
         category = JSON.parse(localStorage.getItem("Category"));
      }

      if (editKey === "PRODUCT") {
         let proList = category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"];

         for (let i = 0; i < list.length; i++) {
            if (list[i]["PRODUCT"] !== editInputForm.value) newList.push(list[i]);
         }
         localStorage.setItem("encodeLogs", JSON.stringify(newList));
         generateTable();

         delete proList[editInputForm.value];

         category[editCategoryDropdownFormSelected.getAttribute("data-value")]["Product"] = proList;
         localStorage.setItem("Category", JSON.stringify(category));

         category = JSON.parse(localStorage.getItem("Category"));
      }

      if (editKey === "INDENTIFIER") {
         let productsTemplate = JSON.parse(localStorage.getItem("productsTemplates"));
         let key = `${editCategoryDropdownFormSelected.getAttribute("data-value")} ${editCategoryDropdownFormSelected.getAttribute("data-value-child")}`;
         let elements = Object.values(productsTemplate[key]);

         for (let i = 0; i < list.length; i++) {
            if (Object.keys(list[i]["INDENTIFIER"]) !== editInputForm.value) newList.push(list[i]);
         }

         localStorage.setItem("encodeLogs", JSON.stringify(newList));
         generateTable();

         for (let key in elements) {
            if (Object.keys(elements[key]) == editInputForm.value) {
               elements.splice(key, 1);
            }
         }

         productsTemplate[key] = elements;

         localStorage.setItem("productsTemplates", JSON.stringify(productsTemplate));
      }

      if (editKey === "JOB") {
         let enco = JSON.parse(localStorage.getItem("encodeLogs"));

         for (let i = 0; i < enco.length; i++) {
            if (enco[i]["CODE"] == currentDataToEdit["CODE"]) {
               for (let y = 0; y < enco[i]["JOB"].length; y++) {
                  if (enco[i]["JOB"][y]["JR"] === editInputForm.value) {
                     enco[i]["JOB"].splice(y, 1);
                     localStorage.setItem("encodeLogs", JSON.stringify(enco));
                     generateTable();

                     break;
                  }
               }
            }
         }
      }

      currentEntryText.innerText = `${editInputForm.value} removed`;
   });

   cancelButtonEdit.addEventListener("click", function () {
      updateButton.src = "./Symbol-Update.svg";
      updateButton.style.cursor = "pointer";

      addButton.src = "./Symbol-Add.svg";
      addButton.style.cursor = "pointer";
      addButton.style.pointerEvents = "all";

      editActiveContainer.classList.add("hide");
      editContainer.classList.remove("hide");

      removeButtonEdit.querySelector("button").style.backgroundColor = "#000";
      removeButtonEdit.querySelector("button").style.cursor = "pointer";
      removeButtonEdit.querySelector("button").style.pointerEvents = "all";
      removeButtonEdit.classList.add("hide");

      removeButton.src = "./Symbol-Remove.svg";
      removeButton.style.cursor = "pointer";
      removeButton.style.pointerEvents = "all";
   });

   //GenerateTable
   generateTable();

   //Download CSV

   downloadCSV.addEventListener("click", function () {
      const encoTable = JSON.parse(localStorage.getItem("tableData"));
      const keys = Object.keys(encoTable[0]);
      let t = [];
      t = [];

      for (let i = 0; i < encoTable.length; i++) {
         let newObj = {};
         if (encoTable[i]["JOB"]) {
            newObj = {
               CODE: encoTable[i]["CODE"],
               TIME: encoTable[i]["TIME"],
               DATE: encoTable[i]["DATE"],
               BRAND: encoTable[i]["BRAND"],
               "SUB-BRAND": encoTable[i]["SUB-BRAND"],
               CATEGORY: encoTable[i]["CATEGORY"],
               PRODUCT: encoTable[i]["PRODUCT"],
               INDENTIFIER: Object.keys(encoTable[i]["INDENTIFIER"])[0],
               JOB: encoTable[i]["JOB"],
            };
            t.push(newObj);
         } else {
            newObj = {
               CODE: encoTable[i]["CODE"],
               TIME: encoTable[i]["TIME"],
               DATE: encoTable[i]["DATE"],
               BRAND: encoTable[i]["BRAND"],
               "SUB-BRAND": encoTable[i]["SUB-BRAND"],
               CATEGORY: encoTable[i]["CATEGORY"],
               PRODUCT: encoTable[i]["PRODUCT"],
               INDENTIFIER: Object.keys(encoTable[i]["INDENTIFIER"])[0],
               JOB: "N/A",
            };
            t.push(newObj);
         }
      }

      const commaSeparatedString = [keys.join(","), t.map((row) => keys.map((key) => row[key]).join(",")).join("\n")].join("\n");
      const csvBlob = new Blob([commaSeparatedString]);
      downloadCSV.href = URL.createObjectURL(csvBlob);
   });

   skipButton.onclick = function () {
      brandOberserver.observe(selectedBrand, { attributes: true });
      sbuOberserver.observe(selectedSBU, { attributes: true });
      categoryOberserver.observe(selectedCategory, { attributes: true });

      jobNumberContainer.classList.add("hide");
      encoderContainer.classList.remove("hide");
      decoderContainer.classList.remove("hide");
      allCodeBtn.classList.remove("hide");
      jrNumberSKUCodeContainer.classList.add("hide");
   };

   searchButton.addEventListener("click", function () {
      if (jobNumberInput.value !== "") {
         let encodeLogData = JSON.parse(localStorage.getItem("encodeLogs"));

         for (let i = 0; i < encodeLogData.length; i++) {
            for (let key in encodeLogData[i]) {
               if (key === "JOB") {
                  for (let y = 0; y < encodeLogData[i]["JOB"].length; y++) {
                     if (jobNumberInput.value.toLowerCase() === encodeLogData[i]["JOB"][y]["JR"].toLowerCase()) {
                        jrNumberSKUCodeContainer.classList.remove("hide");
                        jrDate.innerText = encodeLogData[i]["JOB"][y]["DATE"] + " / " + encodeLogData[i]["JOB"][y]["TIME"];

                        jrBrand.innerText = encodeLogData[i]["BRAND"];
                        jrSBU.innerText = encodeLogData[i]["SUB-BRAND"];
                        jrCategory.innerText = encodeLogData[i]["CATEGORY"];
                        jrProduct.innerText = encodeLogData[i]["PRODUCT"];
                        jrIdentifier.innerText = Object.keys(encodeLogData[i]["INDENTIFIER"]);
                        console.log(encodeLogData[i]["JOB"]);
                        jrRelatedJobs.innerText = "";
                        for (let z = 0; z < encodeLogData[i]["JOB"].length; z++) {
                           if (jobNumberInput.value.toLowerCase() === encodeLogData[i]["JOB"][z]["JR"].toLowerCase()) continue;

                           let newSpan = document.createElement("span");
                           newSpan.innerText = encodeLogData[i]["JOB"][z]["JR"];
                           newSpan.style.display = "block";
                           jrRelatedJobs.appendChild(newSpan);
                        }
                        // jrRelatedJobs.innerText = Object.values(Object.values(encodeLogData[i]["JOB"])[0])[0];s

                        let codeFirstHalfSKU = encodeLogData[i]["CODE"].slice(0, 6);
                        let codeSecondHalfSKU = encodeLogData[i]["CODE"].slice(6);
                        codeFirstHalfSKU = codeFirstHalfSKU.match(/.{1,2}/g).join(" ");
                        codeSecondHalfSKU = codeSecondHalfSKU.match(/.{1,3}/g).join(" ");

                        let co = codeFirstHalfSKU.split(/\s+/);
                        let de = codeSecondHalfSKU.split(/\s+/);

                        jrNumberFoundSKUCode.innerText = co.concat(de).join(" ");

                        jobNumberForm.classList.remove("hide");
                        errorMsgAddToSKU.classList.add("hide");
                        jobNumberForm.classList.remove("errorMsgColor");

                        errorMsgJR.classList.add("hide");
                        return;
                     }
                  }
               }
            }
         }

         errorMsgAddToSKU.classList.add("hide");
         errorMsgJR.classList.remove("hide");
         jobNumberForm.classList.add("hide");
      }
      jrNumberSKUCodeContainer.classList.add("hide");
   });

   jobNumberInput.addEventListener("keyup", function () {
      if (jobNumberInput.value === "") {
         errorMsgAddToSKU.classList.add("hide");
         errorMsgJR.classList.add("hide");
         jobNumberForm.classList.add("hide");
         jrNumberSKUCodeContainer.classList.add("hide");
      }
   });

   addToSkuButton.addEventListener("click", function () {
      if (jobNumberInput.value !== "" && jobNumberInput.value.length === 12) {
         let encodeLogData = JSON.parse(localStorage.getItem("encodeLogs"));
         for (let i = 0; i < encodeLogData.length; i++) {
            for (let key in encodeLogData[i]) {
               if (key === "JOB") {
                  for (let y = 0; y < encodeLogData[i]["JOB"].length; y++) {
                     if (jobNumberInput.value.toLowerCase() === encodeLogData[i]["JOB"][y]["JR"].toLowerCase()) {
                        jrNumberSKUCodeContainer.classList.add("hide");

                        jrDate.innerText = encodeLogData[i]["JOB"][y]["DATE"] + " / " + encodeLogData[i]["JOB"][y]["TIME"];
                        jrBrand.innerText = encodeLogData[i]["BRAND"];
                        jrSBU.innerText = encodeLogData[i]["SUB-BRAND"];
                        jrCategory.innerText = encodeLogData[i]["CATEGORY"];
                        jrProduct.innerText = encodeLogData[i]["PRODUCT"];
                        jrIdentifier.innerText = Object.keys(encodeLogData[i]["INDENTIFIER"]);

                        jrRelatedJobs.innerText = "";
                        for (let z = 0; z < encodeLogData[i]["JOB"].length; z++) {
                           if (jobNumberInput.value.toLowerCase() === encodeLogData[i]["JOB"][z]["JR"].toLowerCase()) continue;

                           let newSpan = document.createElement("span");
                           newSpan.innerText = encodeLogData[i]["JOB"][z]["JR"];
                           newSpan.style.display = "block";
                           jrRelatedJobs.appendChild(newSpan);
                        }

                        let codeFirstHalfSKU = encodeLogData[i]["CODE"].slice(0, 6);
                        let codeSecondHalfSKU = encodeLogData[i]["CODE"].slice(6);
                        codeFirstHalfSKU = codeFirstHalfSKU.match(/.{1,2}/g).join(" ");
                        codeSecondHalfSKU = codeSecondHalfSKU.match(/.{1,3}/g).join(" ");

                        let co = codeFirstHalfSKU.split(/\s+/);
                        let de = codeSecondHalfSKU.split(/\s+/);

                        jrNumberErrorSKUCode.innerText = co.concat(de).join(" ");

                        errorMsgAddToSKU.classList.remove("hide");
                        jobNumberForm.classList.add("errorMsgColor");
                        jobNumberForm.classList.remove("hide");
                        return;
                     }
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
         jrNumberSKUCodeContainer.classList.add("hide");
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

const brandOberserverEdit = new MutationObserver(function (mutations) {
   // let firstTime = 0;
   // mutations.forEach(function (mutation) {
   //    if (mutation.type === "attributes") {
   //       firstTime = 1;
   //       if (firstTime == 0) {
   //          if (selectedBrandEdit.getAttribute("data-value") === "Global") resetSelectedValues(selectedSBUEdit, "Choose a division");
   //          else if (selectedBrandEdit.getAttribute("data-value") === "Vision Care") resetSelectedValues(selectedSBUEdit, "Choose a SBU");
   //          else resetSelectedValues(selectedSBUEdit, "Choose a brand");
   //       }
   //       removeOldList(selectedSBUEdit);
   //       createEncoderSelection(sbuObject[selectedBrandEdit.getAttribute("data-value")], sbuOptionContainerEdit);
   //       if (codeEdit[0]) codeEdit[0] = Object.values(brands[selectedBrandEdit.innerText])[0];
   //       else codeEdit.push(Object.values(brands[selectedBrandEdit.innerText])[0]);
   //       codeTextEdit.innerText = codeEdit.concat(codeCateEdit).join(" ");
   //    }
   // });
});

const sbuOberserverEdit = new MutationObserver(function (mutations) {
   mutations.forEach(function (mutation) {
      // if (mutation.type === "attributes") {
      //    console.log(selectedSBUEdit.getAttribute("data-value"));
      //    let selectedSbu = sbuObject[selectedBrandEdit.getAttribute("data-value")][selectedSBUEdit.getAttribute("data-value")];
      //    codeEdit[1] = selectedSbu;
      //    codeTextEdit.innerText = codeEdit.concat(codeCateEdit).join(" ");
      // }
   });
});

const categoryOberserverEdit = new MutationObserver(function (mutations) {
   // mutations.forEach(function (mutation) {
   //    if (mutation.type === "attributes") {
   //       let categoryChildren = Object.values(category[selectedCategoryEdit.getAttribute("data-value")])[1];

   //       if (codeEdit[2]) codeEdit[2] = Object.values(category[selectedCategoryEdit.getAttribute("data-value")])[0];
   //       else codeEdit.push(Object.values(category[selectedCategoryEdit.getAttribute("data-value")])[0]);

   //       if (codeCateEdit[0]) codeCateEdit[0] = categoryChildren[selectedCategoryEdit.getAttribute("data-value-child")];
   //       codeTextEdit.innerText = codeEdit.concat(codeCateEdit).join(" ");
   //    }
   // });
});

const identifierOberserverEdit = new MutationObserver(function (mutations) {
   mutations.forEach(function (mutation) {
      // if (mutation.type === "attributes") {
      //    let template = JSON.parse(localStorage.getItem("productsTemplates"));
      //    for (let key in template) {
      //       if (key == currentDataToEdit["CATEGORY"] + " " + currentDataToEdit["PRODUCT"]) {
      //          if (template[key].length <= 0) {
      //             console.log(Object.values(currentDataToEdit["INDENTIFIER"]));
      //             codeCateEdit[1] = Object.values(currentDataToEdit["INDENTIFIER"])[0];
      //          } else {
      //             codeCateEdit[1] = Object.values(template[currentDataToEdit["CATEGORY"] + " " + currentDataToEdit["PRODUCT"]]);
      //          }
      //       }
      //    }
      //    codeTextEdit.innerText = codeEdit.concat(codeCateEdit).join(" ");
      // }
   });
});

function generateTable() {
   let allCodeData = document.querySelectorAll(".codeData");

   allCodeData.forEach(function (codeData) {
      codeData.remove();
   });

   let enco = JSON.parse(localStorage.getItem("encodeLogs"));

   let updatedTable = [];
   updatedTable = [];
   for (let i = 0; i < enco.length; i++) {
      let newObj = {};
      if (enco[i]["JOB"]) {
         for (let y = 0; y < enco[i]["JOB"].length; y++) {
            newObj = {
               CODE: enco[i]["CODE"],
               TIME: enco[i]["JOB"][y]["TIME"],
               DATE: enco[i]["JOB"][y]["DATE"],
               BRAND: enco[i]["BRAND"],
               "SUB-BRAND": enco[i]["SUB-BRAND"],
               CATEGORY: enco[i]["CATEGORY"],
               PRODUCT: enco[i]["PRODUCT"],
               INDENTIFIER: enco[i]["INDENTIFIER"],
               JOB: enco[i]["JOB"][y]["JR"],
            };
            updatedTable.push(newObj);
         }
      } else {
         newObj = {
            CODE: enco[i]["CODE"],
            TIME: enco[i]["TIME"],
            DATE: enco[i]["DATE"],
            BRAND: enco[i]["BRAND"],
            "SUB-BRAND": enco[i]["SUB-BRAND"],
            CATEGORY: enco[i]["CATEGORY"],
            PRODUCT: enco[i]["PRODUCT"],
            INDENTIFIER: enco[i]["INDENTIFIER"],
            JOB: "N/A",
         };
         updatedTable.push(newObj);
      }
   }

   localStorage.setItem("tableData", JSON.stringify(updatedTable));

   for (let i = 0; i < updatedTable.length; i++) {
      let newTr = document.createElement("tr");
      newTr.id = updatedTable[i]["CODE"];
      newTr.classList.add(updatedTable[i]["CODE"]);
      newTr.classList.add("codeData");

      for (let key in updatedTable[i]) {
         let newTD = document.createElement("td");

         if (key === "CODE") {
            let newLink = document.createElement("a");
            newLink.href = "javascript:;";
            newLink.innerText = updatedTable[i]["CODE"];

            newLink.addEventListener("click", function () {
               editContainer.classList.remove("hide");
               tableConatainer.classList.add("hide");
               backButtonToStart.classList.remove("hide");
               backButtonToDecoder.classList.add("hide");
               currentData = updatedTable;
               currentDataToEdit = updatedTable[i];

               currentEncoData = enco;
               currentEncoDataEdit = enco[i];

               decodeCode = updatedTable[i]["CODE"];
               // .match(/.{1,2}/g).join(" ");
               let codeFirstHalfList = decodeCode.slice(0, 6);
               let codeSecondHalfList = decodeCode.slice(6);
               codeFirstHalfList = codeFirstHalfList.match(/.{1,2}/g).join(" ");
               codeSecondHalfList = codeSecondHalfList.match(/.{1,3}/g).join(" ");
               codeEdit = codeFirstHalfList.split(/\s+/);
               codeCateEdit = codeSecondHalfList.split(/\s+/);

               brandOberserverEdit.observe(selectedBrandEdit, { attributes: true });
               sbuOberserverEdit.observe(selectedSBUEdit, { attributes: true });
               categoryOberserverEdit.observe(selectedCategoryEdit, { attributes: true });
               identifierOberserverEdit.observe(selectedIndentifierEdit, { attributes: true });
               updateCurrentDataToDataForm();
            });

            newTD.appendChild(newLink);
         } else if (key === "TIME") {
            newTD.innerText = updatedTable[i]["TIME"];
         } else if (key === "DATE") {
            newTD.innerText = updatedTable[i]["DATE"];
         } else if (key === "BRAND") {
            newTD.innerText = updatedTable[i]["BRAND"];
         } else if (key === "SUB-BRAND") {
            newTD.innerText = updatedTable[i]["SUB-BRAND"];
         } else if (key === "CATEGORY") {
            newTD.innerText = updatedTable[i]["CATEGORY"];
         } else if (key === "PRODUCT") {
            newTD.innerText = updatedTable[i]["PRODUCT"];
         } else if (key === "INDENTIFIER") {
            newTD.innerText = Object.keys(updatedTable[i]["INDENTIFIER"]);
         } else {
            newTD.innerText = updatedTable[i]["JOB"];
         }

         newTr.appendChild(newTD);
      }

      tableBody.appendChild(newTr);
   }

   allCodeData = document.querySelectorAll(".codeData");
   tableSearchInput.addEventListener("change", function () {
      if (tableSearchInput.value !== "" && tableSearchInput.value.length == 12) {
         allCodeData.forEach(function (codedData) {
            codedData.classList.add("hide");
         });

         allCodeData.forEach(function (codedData) {
            if (codedData.classList.contains(tableSearchInput.value)) {
               codedData.classList.remove("hide");
            }
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
   // const brands = document.getElementsByName("brand");

   // brands.forEach(brand =>{
   //    console.log(brand.value)

   // })

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
            inputElement.setAttribute("value", key);

            labelElement.innerText = `${value} | ${key}`;

            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);

            if (parentElement.id == "brandOptionContainer") {
               inputElement.setAttribute("name", "brand");
            } else if (parentElement.id == "sbuOptionContainer") {
               inputElement.setAttribute("name", "sbu");
            } else if (parentElement.id == "categoryOptionContainer") {
               inputElement.setAttribute("name", "category");
            }

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
         inputElement.setAttribute("value", key);

         labelElement.innerText = key;

         optionElement.appendChild(inputElement);
         optionElement.appendChild(labelElement);

         if (parentElement.id == "brandOptionContainer") {
            inputElement.setAttribute("name", "brand");
         } else if (parentElement.id == "sbuOptionContainer") {
            inputElement.setAttribute("name", "sbu");
         } else if (parentElement.id == "categoryOptionContainer") {
            inputElement.setAttribute("name", "category");
         }

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
   today = getDate();
   ampm = getAMPM(today);
   hour = getHours(today);
   minutes = getMinutes(today);
   time = getcurrentTime(hour, minutes, ampm);

   result = today.toLocaleDateString("en-US", {
      // you can use undefined as first argument
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
   });

   let dataENCO = JSON.parse(localStorage.getItem("encodeLogs"));

   let identiferObject = {};
   let selectedProduct = JSON.parse(localStorage.getItem("productsTemplates"))[selectedCategory.getAttribute("data-value") + " " + selectedCategory.getAttribute("data-value-child")];
   if (selectedProduct.length <= 0) {
      identiferObject[indentifierInput.getAttribute("data-value")] = "000";
   }
   identiferObject[indentifierInput.getAttribute("data-value")] = ("00" + Object.values(selectedProduct).length).slice(-3);

   // If has jr number already
   for (let i = 0; i < dataENCO.length; i++) {
      for (let key in dataENCO[i]["JOB"]) {
         if (jobNumberInput.getAttribute("data-value")) {
            if (jobNumberInput.getAttribute("data-value").toUpperCase() === Object.values(dataENCO[i]["JOB"][key])[0]) {
               document.getElementById("encodedDate").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[2] + " / " + Object.values(dataENCO[i])[1];
               document.getElementById("encodedBrand").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[3];
               document.getElementById("encodedSBU").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[4];
               document.getElementById("encodedCategory").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[5];
               document.getElementById("encodedProduct").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[6];
               document.getElementById("encodedIdentifier").innerText = Object.keys(Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[7]);

               if (jobNumberInput.getAttribute("data-value")) document.getElementById("encodedJR").innerText = jobNumberInput.getAttribute("data-value").toUpperCase();
               else document.getElementById("encodedJR").innerText = "";

               errorMsgContainer.classList.remove("hide");
               encodedContent.classList.add("errorMsgColor");
               encodedResult.classList.remove("hide");
               return;
            }
         }
      }
   }

   for (let i = 0; i < dataENCO.length; i++) {
      if (codeText.innerText.replace(/\s/g, "") === dataENCO[i]["CODE"]) {
         if (jobNumberInput.getAttribute("data-value") == undefined || jobNumberInput.getAttribute("data-value") == null) {
            console.log(dataENCO[i]["CODE"], codeText.innerText.replace(/\s/g, ""));

            document.getElementById("encodedDate").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[2] + " / " + Object.values(dataENCO[i])[1];
            document.getElementById("encodedBrand").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[3];
            document.getElementById("encodedSBU").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[4];
            document.getElementById("encodedCategory").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[5];
            document.getElementById("encodedProduct").innerText = Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[6];
            document.getElementById("encodedIdentifier").innerText = Object.keys(Object.values(JSON.parse(localStorage.getItem("encodeLogs"))[i])[7]);

            if (jobNumberInput.getAttribute("data-value")) document.getElementById("encodedJR").innerText = jobNumberInput.getAttribute("data-value").toUpperCase();
            else document.getElementById("encodedJR").innerText = "";

            errorMsgContainer.classList.remove("hide");
            encodedContent.classList.add("errorMsgColor");
            encodedResult.classList.remove("hide");
            return;
         }
      }
   }
   dataToSave["CODE"] = codeText.innerText.replace(/\s/g, "");
   dataToSave["TIME"] = time;
   dataToSave["DATE"] = result;
   dataToSave["BRAND"] = selectedBrand.getAttribute("data-value");
   dataToSave["SUB-BRAND"] = selectedSBU.getAttribute("data-value");
   dataToSave["CATEGORY"] = selectedCategory.getAttribute("data-value");
   dataToSave["PRODUCT"] = selectedCategory.getAttribute("data-value-child");
   dataToSave["INDENTIFIER"] = identiferObject;

   productsTemplates = JSON.parse(localStorage.getItem("productsTemplates"));
   let currentProductTemplate = productsTemplates[dataToSave["CATEGORY"] + " " + dataToSave["PRODUCT"]];

   if (currentProductTemplate.length != 0) {
      for (let i = 0; i < currentProductTemplate.length; i++) {
         if (Object.keys(currentProductTemplate[i])[0].trim().replace(/\s/g, "") !== capitalizeFirstLetter(indentifierInput.value.trim().replace(/\s/g, ""))) {
            productsTemplates[dataToSave["CATEGORY"] + " " + dataToSave["PRODUCT"]].push(identiferObject);
            localStorage.setItem("productsTemplates", JSON.stringify(productsTemplates));
         }
      }
   } else {
      productsTemplates[dataToSave["CATEGORY"] + " " + dataToSave["PRODUCT"]].push(identiferObject);
      localStorage.setItem("productsTemplates", JSON.stringify(productsTemplates));
   }

   for (let i = 0; i < dataENCO.length; i++) {
      if (dataENCO[i]["CODE"] === codeText.innerText.replace(/\s/g, "")) {
         if (jobNumberInput.getAttribute("data-value")) {
            console.log("FOUND");
            dataENCO[i]["JOB"].push({ JR: jobNumberInput.getAttribute("data-value").toUpperCase(), TIME: time, DATE: result });
            dataToSave["JOB"] = dataENCO[i]["JOB"];
            break;
         }
      } else {
         if (jobNumberInput.getAttribute("data-value")) {
            console.log("NEW");
            dataToSave["JOB"] = [{ JR: jobNumberInput.getAttribute("data-value").toUpperCase(), TIME: time, DATE: result }];
         }
      }
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

   //Adding jr number to a sku
   for (let i = 0; i < dataENCO.length; i++) {
      if (codeText.innerText.replace(/\s/g, "") === Object.values(dataENCO[i])[0]) {
         dataENCO[i] = dataToSave;
         localStorage.setItem("encodeLogs", JSON.stringify(dataENCO));
         newData = [];
         dataToSave = {};
         return;
      }
   }

   // when adding new SKU

   newData.push(dataToSave);
   localStorage.setItem("encodeLogs", JSON.stringify(newData));
   newData = [];
   dataToSave = {};
}

function getcurrentTime(hour, minutes, ampm) {
   return hour + ":" + minutes + " " + ampm;
}

function getMinutes(today) {
   return ("0" + today.getMinutes()).slice(-2);
}

function getHours(today) {
   return (today.getHours() + 24) % 12 || 12;
}

function getAMPM(today) {
   return today.getHours() >= 12 ? "PM" : "AM";
}

function getDate() {
   return new Date();
}

function setEditValues(targetInput, dataInput) {
   if (dataInput.innerText !== "") {
      targetInput.innerText = dataInput;
      targetInput.setAttribute("data-value", dataInput);
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

function updateCurrentDataToDataForm() {
   setEditValues(selectedBrandEdit, currentDataToEdit["BRAND"]);
   setEditValues(selectedSBUEdit, currentDataToEdit["SUB-BRAND"]);
   selectedCategoryEdit.innerText = `${currentDataToEdit["PRODUCT"]} | ${currentDataToEdit["CATEGORY"]}`;
   selectedCategoryEdit.setAttribute("data-value", `${currentDataToEdit["CATEGORY"]}`);
   selectedCategoryEdit.setAttribute("data-value-child", `${currentDataToEdit["PRODUCT"]} `);
   setEditValues(selectedIndentifierEdit, Object.keys(currentDataToEdit["INDENTIFIER"]).at(-1));

   removeOldList(selectedjrEdit);

   if (Array.isArray(currentDataToEdit["JOB"])) {
      setEditValues(selectedjrEdit, Object.values(currentDataToEdit["JOB"][0])[0]);

      let jobObject = {};
      for (let i = 0; i < currentDataToEdit["JOB"].length; i++) {
         let newObj = {};
         newObj["int"] = i;
         jobObject[Object.values(currentDataToEdit["JOB"][i])[0]] = newObj;
      }
      createEncoderSelection(jobObject, jrOptionContainerEdit);
   } else {
      let encodeLogs = JSON.parse(localStorage.getItem("encodeLogs"));

      for (let i = 0; i < encodeLogs.length; i++) {
         if (currentDataToEdit["CODE"] === encodeLogs[i]["CODE"]) {
            if (Array.isArray(encodeLogs[i]["JOB"])) {
               if (currentDataToEdit["JOB"] != null || currentDataToEdit["JOB"] != undefined) {
                  setEditValues(selectedjrEdit, currentDataToEdit["JOB"]);
               }

               let jobObject = {};
               for (let y = 0; y < encodeLogs[i]["JOB"].length; y++) {
                  let newObj = {};
                  newObj["int"] = y;
                  jobObject[Object.values(encodeLogs[i]["JOB"][y])[0]] = newObj;
               }
               createEncoderSelection(jobObject, jrOptionContainerEdit);
            }
            else{
               setEditValues(selectedjrEdit, currentDataToEdit["JOB"]);
            }
         }
      }
   }

   codeTextEdit.innerText = codeEdit.concat(codeCateEdit).join(" ");
   console.log(codeTextEdit);

   removeOldList(selectedBrandEdit);
   removeOldList(selectedSBUEdit);
   removeOldList(selectedCategoryEdit);
   removeOldList(selectedIndentifierEdit);

   createEncoderSelection(brands, brandOptionContainerEdit);
   createEncoderSelection(sbuObject[selectedBrandEdit.getAttribute("data-value")], sbuOptionContainerEdit);
   createEncoderSelection(productsObject, categoryOptionContainerEdit, true);

   let templates = JSON.parse(localStorage.getItem("productsTemplates"))[currentDataToEdit["CATEGORY"] + " " + currentDataToEdit["PRODUCT"]];
   for (let key in templates) {
      for (let value in templates[key]) {
         allTemplates[value] = templates[key][value];
      }
   }

   console.log(currentDataToEdit["JOB"]);
   createEncoderSelection(allTemplates, indentifierOptionContainerEdit);
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

backButtonEdit.addEventListener("click", function () {
   jobNumberContainer.classList.remove("hide");
   encoderContainer.classList.add("hide");
   decoderContainer.classList.add("hide");
   editActiveContainer.classList.add("hide");
   allCodeBtn.classList.add("hide");
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
