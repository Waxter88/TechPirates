var customers=[];
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';
const table = document.getElementById('form-list-client-body');
const input = document.getElementById('myinput');
const form = document.getElementById("form-list-client");
var myIndex;
 

function addCustomer(){
    var newCustomer =
    {
        firstName: document.getElementById("customer-firstName").value,
        lastName: document.getElementById("customer-lastName").value,
        email: document.getElementById("customer-Email").value,
        phone: document.getElementById("customer-Phone").value,
        company: document.getElementById("customer-Company").value,
        invoice: document.getElementById("customer-Invoice").value,
        city: document.getElementById("customer-City").value
    }
    customers.unshift(newCustomer);
    displayCustomers();
}
//hide and show accessiblity helpers
$(document).ready(function(){
    $('.help-block').hide();
    $('#show-hide-accessibility').change(function(){
        if($(this).is(":checked"))
        {
            $('.help-block').show();
        }else{
            $('.help-block').hide();
        }
    });
});   

//hiding and showing input fields
$(document).ready(function(){
    $('#show-hide-form').change(function(){
        if($(this).is(":checked")){
            $('#hidden-fields').show();
        }else{
            $('#hidden-fields').hide();
        }
    });
});

//add sample data to table
function addCustomerData(customerArray){
    for (i=0;i<customerArray.length;i++){
    customers.unshift(customerArray[i]);
    }
    displayCustomers();
}

//sample data
    var sampleData = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john-doe@abc-company.com",
            phone: "1234567890",
            company: "ABC Company",
            invoice: "123456",
            city: "New York"
        },
        {
            firstName: "John",
            lastName: "Doe",
            email: "john-doe@zxc-company.com",
            phone: "1234567890",
            company: "ZCX Company",
            invoice: "123456",
            city: "New York"
        },
        {
            firstName: "John",
            lastName: "Doe",
            email: "john-doe@zcx-company.com",
            phone: "1234567890",
            company: "ZCX Company",
            invoice: "123456",
            city: "New York"
        }
    ];
    addCustomerData(sampleData);


function displayCustomers(){
    document.getElementById("form-list-client-body").innerHTML=""
    for (i=0;i<customers.length;i++){
      var myTr=document.createElement("tr")
      for(a in customers[i]){
        var mytd=document.createElement("td")
        mytd.innerHTML=customers[i][a]
        myTr.appendChild(mytd)
      }
      var actionTd=document.createElement("td")
      var editBtn=document.createElement("button")
      editBtn.innerHTML="Edit"
      editBtn.setAttribute("class" , "btn btn-sm btn-primary")
      editBtn.setAttribute("onclick" , "editCustomer("+i+")")

      var deletebtn=document.createElement("button")
      deletebtn.innerHTML="Delete"
      deletebtn.setAttribute("class" , "btn btn-sm btn-danger")
      deletebtn.setAttribute("onclick" , "deleteCustomer("+i+")")

      actionTd.appendChild(editBtn)
      actionTd.appendChild(deletebtn)
      myTr.appendChild(actionTd)
      document.getElementById("form-list-client-body").appendChild(myTr)
      }
    

    document.getElementById("customer-firstName").value=""
    document.getElementById("customer-lastName").value=""
    document.getElementById("customer-Email").value=""
    document.getElementById("customer-Phone").value=""
    document.getElementById("customer-Company").value=""
    document.getElementById("customer-Invoice").value=""
    document.getElementById("customer-City").value=""

    
      filterTable();
  }

  //Editing customer
  function editCustomer(i){
    console.log(customers[i])
    myIndex=i;
    var updatebtn=document.createElement("button")
    updatebtn.innerHTML="Update";
    updatebtn.setAttribute("class", "btn btn-sm btn-success")
    updatebtn.setAttribute("onclick","updCustomer()")
    document.getElementById("saveupdate").innerHTML=""
    document.getElementById("saveupdate").appendChild(updatebtn);

    document.getElementById("customer-firstName").value=customers[i].firstName
    document.getElementById("customer-lastName").value=customers[i].lastName
    document.getElementById("customer-Email").value=customers[i].email
    document.getElementById("customer-Phone").value=customers[i].phone
    document.getElementById("customer-Company").value=customers[i].company
    document.getElementById("customer-Invoice").value=customers[i].invoice
    document.getElementById("customer-City").value=customers[i].city
  }

  //Updating customer
  function updCustomer(){
    var updatedCustomer={
        firstName: document.getElementById("customer-firstName").value,
        lastName: document.getElementById("customer-lastName").value,
        email: document.getElementById("customer-Email").value,
        phone: document.getElementById("customer-Phone").value,
        company: document.getElementById("customer-Company").value,
        invoice: document.getElementById("customer-Invoice").value,
        city: document.getElementById("customer-City").value
    }
    customers[myIndex]=updatedCustomer;
    var crbtn=document.createElement("button")
    crbtn.innerHTML="Save";
    crbtn.setAttribute("onclick","addCustomer()")
    crbtn.setAttribute("class","btn btn-sm btn-success")
    document.getElementById("saveupdate").innerHTML=""
    
    document.getElementById("saveupdate").appendChild(crbtn);
    
    displayCustomers()
  }

  //deleting customer
  function deleteCustomer(i){
    customers.splice(i,1)
    displayCustomers()
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
        addCustomer();
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



  