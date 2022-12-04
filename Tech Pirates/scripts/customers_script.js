var customers=[];
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';
const table = document.getElementById('form-list-client-body');
const input = document.getElementById('myinput');
const form = document.getElementById("form-list-client");
var myIndex;

//document onload
  document.addEventListener("DOMContentLoaded", function(event) {
    toggleCustomerForm();

    document.getElementById("success-alert").style.visibility = "hidden";
    document.getElementById("failure-alert").style.visibility = "hidden";
  });

  //tooltips

  //hide and show accessiblity helpers
$(document).ready(function(){
  console.log('ready')
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
 

  //text sizing
  var $affectedElements = $("p, h1, h2, h3, h4, h5, h6, form-list-client-body, myinput, form-list-client, body, title"); // Can be extended, ex. $("div, p, span.someClass")

// Storing the original size in a data attribute so size can be reset
$affectedElements.each( function(){
  var $this = $(this);
  $this.data("orig-size", $this.css("font-size") );
});

$("#btn-increase").click(function(){
  changeFontSize(1);
})

$("#btn-decrease").click(function(){
  changeFontSize(-1);
})

$("#btn-orig").click(function(){
  $affectedElements.each( function(){
        var $this = $(this);
        $this.css( "font-size" , $this.data("orig-size") );
   });
})

function changeFontSize(direction){
    $affectedElements.each( function(){
        var $this = $(this);
        $this.css( "font-size" , parseInt($this.css("font-size"))+direction );
    });
}

//delete confirmation
$('#deleteConfirm').on('show.bs.modal', function (event) {
  console.log('modal opened');
  var button = $(event.relatedTarget) // Button that triggered the modal
  var name = button.data('name') // Extract info from data-* attributes
  var email = button.data('cust-email')
  var id = button.data('cust-id')
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  var deleteBttn = modal.find('.modal-footer #confirmDeleteButton')
  //deleteBttn.setAttribute('data-cust-id', id);
  modal.find('.modal-title').text('Are you sure you want to delete: ' + name + '?')
  modal.find('.modal-body').html('<p>Are you sure you wish to delete <br><br>Name: <strong>'+ name + ' <br></strong> Customer Email: <strong>' + email + '</strong><br>ID: <strong>' + id + '</strong><br><p style="color: red;"><strong>This action cannot be undone.</strong></p></p>');

  
})


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
    console.log(newCustomer);
    customers.unshift(newCustomer);
    displayCustomers();
}
  

//hiding and showing input fields

function toggleCustomerForm(show = false){

  $('#hidden-fields').hide();
  $('#show-hide-accessibility-label').hide();
  $('#nav-navigate-page').hide();
  $('#show-hide-font-size').hide();
    $('#show-hide-form').change(function(){
        if($(this).is(":checked")){
            $('#hidden-fields').show();
            $('#show-hide-accessibility-label').show();
            $('#nav-navigate-page').show();
            $('#show-hide-font-size').show();
            console.log("showing form");
        }else{
            $('#hidden-fields').hide();
            $('#show-hide-accessibility-label').hide();
            $('#nav-navigate-page').hide();
            $('#show-hide-font-size').hide();
        }
    });
    if(show){
      $('#hidden-fields').show();
            $('#show-hide-accessibility-label').show();
            $('#nav-navigate-page').show();
            $('#show-hide-font-size').show();
            $('#show-hide-form').prop('checked', true);
    }
}

$(document).ready(function(){
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
            firstName: "Jack",
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
      editBtn.innerHTML="Edit <span data-feather='edit'></span>"
      editBtn.setAttribute("class" , "btn btn-sm btn-primary")
      editBtn.setAttribute("onclick" , "editCustomer("+i+")")

      var deletebtn=document.createElement("button")
      deletebtn.innerHTML="Delete"
      deletebtn.innerHTML += " <i data-feather='trash-2'></i>"
      deletebtn.setAttribute("class" , "btn btn-sm btn-danger")
      deletebtn.setAttribute("data-toggle" , "modal")
      deletebtn.setAttribute("data-target" , "#deleteConfirm")
      deletebtn.setAttribute("data-name" , customers[i]["firstName"] + " " + customers[i]["lastName"])
      deletebtn.setAttribute("data-cust-email" , customers[i]["email"])
      deletebtn.setAttribute("data-cust-id" , i)

      //deletebtn.setAttribute("onclick" , "deleteCustomer("+i+")")

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
     //feather.replace();
  }

  //Editing customer
  function editCustomer(i){
    document.getElementById("success-alert").style.visibility = "hidden";
    document.getElementById("failure-alert").style.visibility = "hidden";
    //show customer form
    toggleCustomerForm(true);
    console.log(customers[i])
    myIndex=i;
    var updatebtn=document.createElement("button")
    updatebtn.innerHTML="Update Customer <i data-feather='save'></i>";
    updatebtn.setAttribute("class", "btn btn-success")
    updatebtn.setAttribute("id", "update-btn")
    updatebtn.setAttribute("type", "button")
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
    crbtn.innerHTML="Save Customer <i data-feather='save'></i>";
    crbtn.setAttribute("onclick","submitCustomer()")
    crbtn.setAttribute("class","btn btn-success")
    crbtn.setAttribute("id","btn-save")
    crbtn.setAttribute("name","btn-save")
    crbtn.setAttribute("type","button")
    document.getElementById("saveupdate").innerHTML=""
    
    document.getElementById("saveupdate").appendChild(crbtn);
    
    displayCustomers()
    feather.replace();
  }

  //deleting customer
  function deleteCustomer(i){
    $("#deleteConfirm").modal("hide");
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
    
  
function submitCustomer(){

  const submitButton = document.getElementById('btn-save');

  console.log("submitting customer")
  document.getElementById("success-alert").style.visibility = "hidden";
  document.getElementById("failure-alert").style.visibility = "hidden";
    
      if(document.getElementById('form-edit-client').checkValidity()) {

        addCustomer();
        console.log('form submitted');
        document.getElementById("success-alert").style.visibility = "visible";
        document.getElementById("failure-alert").style.visibility = "hidden";
        return;
      }else{
        console.log('form not submitted');
        document.getElementById("success-alert").style.visibility = "hidden";
        document.getElementById("failure-alert").style.visibility = "visible";
        return;
      }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields




  