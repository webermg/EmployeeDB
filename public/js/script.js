const $employeeTable = $(".emp-table");
const $roleTable = $(".role-table");
const $deptTable = $(".dept-table");
const $empAddEditModal = $("#empAddEditModal");

//constants
const EMP_TABLE_IN_DB = "employees";
const ROLE_TABLE_IN_DB = "roles";
const DEPT_TABLE_IN_DB = "departments";

const EMP_BUTTONS = `<td><button type="button" class="btn btn-primary" data-type="edit" data-toggle="modal" data-target="#empAddEditModal" data-title="Edit Employee">Edit</button><button type="button" class="btn btn-danger" data-type="delete">X</button></td>`;
const ROLE_BUTTONS = `<td><button type="button" class="btn btn-primary" data-type="edit" data-toggle="modal" data-target="#roleAddEditModal" data-title="Edit Role">Edit</button><button type="button" class="btn btn-danger" data-type="delete">X</button></td>`;
const DEPT_BUTTONS = `<td><button type="button" class="btn btn-primary" data-type="edit" data-toggle="modal" data-target="#deptAddEditModal" data-title="Edit Department">Edit</button><button type="button" class="btn btn-danger" data-type="delete">X</button></td>`;

// A function for getting all notes from the db
const getTableData = (table) => {
  return $.ajax({
    url: `/api/table/${table}`,
    method: "GET"
  });
};

const getValues = (table,column) => {
  return $.ajax({
    url: `/api/table/${table}/col/${column}`,
    method: "GET"
  });
}

const getFullNames = () => {
  return $.ajax({
    url: `/api/fullNames`,
    method: "GET"
  });
}

// A function for saving a note to the db
const addEmployee = (info) => {
  return $.ajax({
    url: "/api/employee",
    data: info,
    method: "POST",
  });
};

// A function for saving a note to the db
const editEmployee = (info) => {
  return $.ajax({
    url: "/api/employee",
    data: info,
    method: "PUT",
  });
};

// A function for deleting a note from the db
const deleteEmployee = (id) => {
  return $.ajax({
    url: "api/employee/" + id,
    method: "DELETE",
  });
};

//display table functions
const renderViews = () => {
  //clear and render employee
  $employeeTable.empty();
  getTableData(EMP_TABLE_IN_DB).then(renderEmployeeView);
  
  //clear and render roles
  $roleTable.empty();
  getTableData(ROLE_TABLE_IN_DB).then(renderRoleView);
  
  // //clear and render depts
  $deptTable.empty();
  getTableData(DEPT_TABLE_IN_DB).then(renderDepartmentView);
};

const renderEmployeeView = data => {
  let r = 1;
  data.forEach(element => {
    const row = $("<tr>");
    row.data(element);
    row.append(`<th scope="row">${r++}</th>`);
    row.append(`<td>${element.first_name}</td>`);
    row.append(`<td>${element.last_name}</td>`);
    row.append(`<td>${element.title}</td>`);
    row.append(`<td>${element.department}</td>`);
    row.append(`<td>${element.salary}</td>`);
    row.append(`<td>${element.manager}</td>`);
    row.append(EMP_BUTTONS);
    $employeeTable.append(row);
  });
}

const renderRoleView = data => {
  let r = 1;
  data.forEach(element => {
    const row = $("<tr>");
    row.data(element);
    row.append(`<th scope="row">${r++}</th>`);
    row.append(`<td>${element.title}</td>`);
    row.append(`<td>${element.salary}</td>`);
    row.append(`<td>${element.department}</td>`);
    row.append(ROLE_BUTTONS);
    $roleTable.append(row);
  });
}

const renderDepartmentView = data => {
  let r = 1;
  data.forEach(element => {
    const row = $("<tr>");
    row.data(element);
    row.append(`<th scope="row">${r++}</th>`);
    row.append(`<td>${element.name}</td>`);
    row.append(DEPT_BUTTONS);
    $deptTable.append(row);
  });
}

const getButtons = () => {
  return ;
}

const buildAddEmpModal = () => {
  $empAddEditModal.data("mode","add");
  $empAddEditModal.find("#firstName").val("");
  $empAddEditModal.find("#lastName").val("");
  getValues(ROLE_TABLE_IN_DB, 'title').then(data => addSelectOptions($empAddEditModal.find("#titleSelect"),data, 'title'));
  getFullNames().then(data => addSelectOptions($empAddEditModal.find("#mgrSelect"),data, 'name'));
}

const buildEditEmpModal = data => {
  $empAddEditModal.data("mode","edit");
  $empAddEditModal.data("id",data.id);
  $empAddEditModal.find("#firstName").val(data.first_name);
  $empAddEditModal.find("#lastName").val(data.last_name);
  getValues(ROLE_TABLE_IN_DB, 'title').then(data => addSelectOptions($empAddEditModal.find("#titleSelect"),data, 'title')).then(e =>$empAddEditModal.find("#titleSelect").val(data.title).prop('selected',true));
  getFullNames().then(data => addSelectOptions($empAddEditModal.find("#mgrSelect"),data, 'name')).then(e => $empAddEditModal.find("#mgrSelect").val(data.manager).prop('selected',true));
}

const addSelectOptions = (element,data,key) => {
  element.empty();
  data.forEach(el => {
    element.append(new Option(el[key], el[key]));
  })
  return true;
}

$("#empAddBtn").on("click", function(e) {
  buildAddEmpModal();
})

$("#empSaveBtn").on("click", function(e) {
  //package data
  let data = {}
  data.empFirst = $empAddEditModal.find("#firstName").val();
  data.empLast = $empAddEditModal.find("#lastName").val();
  data.title = $empAddEditModal.find("#titleSelect").val();
  let mName = $empAddEditModal.find("#mgrSelect").val().split(" ");
  data.mgrFirst = mName[0];
  data.mgrLast = mName[1];
  
  if($empAddEditModal.data("mode") === "edit") {
    data.id = $empAddEditModal.data("id");
    editEmployee(data).then(renderViews);
  }
  else {
    addEmployee(data).then(renderViews);
  }
})

$("#firstName").on("input",function() {
  $("#empSaveBtn").prop('disabled',!validateNames())
});
$("#lastName").on("input",function() {
  $("#empSaveBtn").prop('disabled',!validateNames())
});

const validateNames = () => {
  return $empAddEditModal.find("#firstName").val().trim().length * $empAddEditModal.find("#lastName").val().trim().length != 0;
}

$employeeTable.on('click', function(e) {
  e.preventDefault();
  // console.log($(e.target));
  //what button was clicked
  if($(e.target).data("type") === "edit") buildEditEmpModal($(e.target).parent().parent().data());
  //if edit build edit modal
  else deleteEmployee($(e.target).parent().parent().data().id).then(res => {
    console.log(res)
    renderViews();
  }).catch(err => {
    console.log(err)
  }) //show a toast or something confirming delete
  //if delete attempt to delete and build warn modal if fail
})

$('#myTab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$empAddEditModal.on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var title = button.data('title') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text(title);
  $("#empSaveBtn").prop('disabled',!validateNames())
})

$(document).ready(() => {
  renderViews();
});
