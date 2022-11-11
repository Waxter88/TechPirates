var products=[];

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
    console.log(actual_JSON)
    });
}

jsontest();

  var myIndex;
   function addProduct(){
    
    var newProduct={
      desciption:document.getElementById("product-description").value,
      quantity:document.getElementById("product-quantity").value,
      cost:document.getElementById("product-cost").value,
      orderID:document.getElementById("product-orderID").value,
        itemID:document.getElementById("product-itemID").value
    }
    products.push(newProduct);
    displayProducts()
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
      console.log(products)
    document.getElementById("product-description").value=""
    document.getElementById("product-quantity").value=""
    document.getElementById("product-cost").value=""
    document.getElementById("product-orderID").value=""
    document.getElementById("product-itemID").value=""

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
    document.getElementById("product-orderID").value=products[i].orderID
    document.getElementById("product-itemID").value=products[i].itemID
  }

  //Updating product
  function updProduct(){
    var updatedProduct={
      desciption:document.getElementById("product-description").value,
        quantity:document.getElementById("product-quantity").value,
        cost:document.getElementById("product-cost").value,
        orderID:document.getElementById("product-orderID").value,
        itemID:document.getElementById("product-itemID").value,
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