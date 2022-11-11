var products=[];
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';
const table = document.getElementById('form-list-client-body');
const input = document.getElementById('myinput');
const form = document.getElementById("form-list-client");

//import products from ./data/MOCK_DATA.json
//NOTE: must be running a local server to import json file, otherwise CROSS-ORIGIN error will occur
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '/data/MOCK_DATA.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function jsontest(){
    loadJSON(function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    for(i=0;i<50;i++){
      //change the number in the for loop to change the number of products added as sample data
      addProductJson(actual_JSON[i])
    }
    });
    console.log(products);
    
}



  var myIndex;
 


   function addProduct(){
    //keep newest products at the top of the list
    

    var newProduct={
      
      desciption:document.getElementById("product-description").value,
      quantity:document.getElementById("product-quantity").value,
      cost:document.getElementById("product-cost").value,
      code:document.getElementById("product-code").value,
      itemID:document.getElementById("product-itemID").value,
      status: document.getElementById("product-status").value,
      //id:products.length+1
      //do we need id field?
    }
    products.unshift(newProduct);
    //products.push(newProduct);
    displayProducts();
    //keep newest products at the top of the list
    
  }

  function addProductJson(productsJSON){
    if(productsJSON != null){
      var newProduct={
        desciption:productsJSON["desciption"],
        quantity:productsJSON["quantity"],
        cost:productsJSON["cost"],
        code:productsJSON["code"],
        itemID:productsJSON["itemID"],
        status:productsJSON["status"]
      }
      products.push(newProduct);
      displayProducts();
      }
  }

  function displayProducts(){
    

    document.getElementById("form-list-client-body").innerHTML=""
    for (i=0;i<products.length;i++){
      var myTr=document.createElement("tr")
      for(a in products[i]){
        var mytd=document.createElement("td")
        mytd.innerHTML=products[i][a]
        myTr.appendChild(mytd)
      }
      var actionTd=document.createElement("td")
      var editBtn=document.createElement("button")
      editBtn.innerHTML="Edit"
      editBtn.setAttribute("class" , "btn btn-sm btn-primary")
      editBtn.setAttribute("onclick" , "editProduct("+i+")")

      var deletebtn=document.createElement("button")
      deletebtn.innerHTML="Delete"
      deletebtn.setAttribute("class" , "btn btn-sm btn-danger")
      deletebtn.setAttribute("onclick" , "deleteProduct("+i+")")

      actionTd.appendChild(editBtn)
      actionTd.appendChild(deletebtn)
      myTr.appendChild(actionTd)
      document.getElementById("form-list-client-body").appendChild(myTr)
      }
    

    document.getElementById("product-description").value=""
    document.getElementById("product-quantity").value=""
    document.getElementById("product-cost").value=""
    document.getElementById("product-code").value=""
    document.getElementById("product-itemID").value=""
    document.getElementById("product-status").value=""
    
      filterTable();
  }

  //Editing product
  function editProduct(i){
    console.log(products[i])
    myIndex=i;
    var updatebtn=document.createElement("button")
    updatebtn.innerHTML="Update";
    updatebtn.setAttribute("class", "btn btn-sm btn-success")
    updatebtn.setAttribute("onclick","updProduct()")
    document.getElementById("saveupdate").innerHTML=""
    document.getElementById("saveupdate").appendChild(updatebtn);

    document.getElementById("product-description").value=products[i].desciption
    document.getElementById("product-quantity").value=products[i].quantity
    document.getElementById("product-cost").value=products[i].cost
    document.getElementById("product-code").value=products[i].code
    document.getElementById("product-itemID").value=products[i].itemID
    document.getElementById("product-status").value=products[i].status
  }

  //Updating product
  function updProduct(){
    var updatedProduct={
        desciption:document.getElementById("product-description").value,
        quantity:document.getElementById("product-quantity").value,
        cost:document.getElementById("product-cost").value,
        code:document.getElementById("product-code").value,
        itemID:document.getElementById("product-itemID").value,
        status:document.getElementById("product-status").value
    }
    products[myIndex]=updatedProduct;
    var crbtn=document.createElement("button")
    crbtn.innerHTML="Save";
    crbtn.setAttribute("onclick","addProduct()")
    crbtn.setAttribute("class","btn btn-sm btn-success")
    document.getElementById("saveupdate").innerHTML=""
    
    document.getElementById("saveupdate").appendChild(crbtn);
    
    displayProducts()
  }

  //deleting product
  function deleteProduct(i){
    products.splice(i,1)
    displayProducts()
  }

  //filtering table
  function filterTable() {
    let filter = input.value.toUpperCase();
    rows = table.getElementsByTagName("TR");
    let flag = false;
  
    for (let row of rows) {
      let cells = row.getElementsByTagName("TD");
      for (let cell of cells) {
        if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
          flag = true;
          break;
        }
      }
  
      if (flag) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
  
      flag = false;
    }
  }

  input.addEventListener('keyup', function(event) {
    filterTable();
  });

  //validation
  window.onload=function(){
    document.getElementById("success-alert").style.visibility = "hidden";
    document.getElementById("failure-alert").style.visibility = "hidden";

    document.forms['form-edit-client'].addEventListener('submit', function(event) {
      if(document.getElementById('form-edit-client').checkValidity()) {
        event.preventDefault();
        addProduct();
        console.log('form submitted');
        document.getElementById("success-alert").style.visibility = "visible";
        document.getElementById("failure-alert").style.visibility = "hidden";
      }else{
        event.preventDefault();
        event.stopPropagation();
        console.log('form not submitted');
        document.getElementById("success-alert").style.visibility = "hidden";
        document.getElementById("failure-alert").style.visibility = "visible";
      }
    });
  }
 

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          console.log("not valid");
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    });
});



  