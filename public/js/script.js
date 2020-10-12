const $employeeTable = $(".emp-table");
const $roleTable = $(".role-table");
const $deptTable = $(".dept-table");



// A function for getting all notes from the db
const getTableData = (table) => {
  return $.ajax({
    url: `/api/table/${table}`,
    method: "GET"
  });
};

// // A function for saving a note to the db
// const saveNote = (note) => {
//   return $.ajax({
//     url: "/api/notes",
//     data: note,
//     method: "POST",
//   });
// };

// // A function for deleting a note from the db
// const deleteNote = (id) => {
//   return $.ajax({
//     url: "api/notes/" + id,
//     method: "DELETE",
//   });
// };

const renderViews = () => {
  //clear and render employee
  $employeeTable.empty();
  //$employeeTable.append(renderEmployeeView(dataE));
  getTableData("employees").then(renderEmployeeView);
  //clear and render roles
  $roleTable.empty();
  getTableData("roles").then(renderRoleView);
  // $roleTable.append(renderRoleView(dataR));
  // //clear and render depts
  $deptTable.empty();
  getTableData("departments").then(renderDepartmentView);
  // $deptTable.empty();
};

const renderEmployeeView = data => {
  let r = 1;
  data.forEach(element => {
    const row = $("<tr>");
    row.data(data);
    row.append(`<th scope="row">${r++}</th>`);
    row.append(`<td>${element.first_name}</td>`);
    row.append(`<td>${element.last_name}</td>`);
    row.append(`<td>${element.title}</td>`);
    row.append(`<td>${element.department}</td>`);
    row.append(`<td>${element.salary}</td>`);
    row.append(`<td>${element.manager}</td>`);
    row.append(getButtons());
    $employeeTable.append(row);
  });
}

const renderRoleView = data => {
  let r = 1;
  data.forEach(element => {
    const row = $("<tr>");
    row.data(data);
    row.append(`<th scope="row">${r++}</th>`);
    row.append(`<td>${element.title}</td>`);
    row.append(`<td>${element.salary}</td>`);
    row.append(`<td>${element.department}</td>`);
    row.append(getButtons());
    $roleTable.append(row);
  });
}

const renderDepartmentView = data => {
  let r = 1;
  data.forEach(element => {
    const row = $("<tr>");
    row.data(data);
    row.append(`<th scope="row">${r++}</th>`);
    row.append(`<td>${element.name}</td>`);
    row.append(getButtons());
    $deptTable.append(row);
  });
}

const getButtons = () => {
  return `<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">Edit</button><button type="button" class="btn btn-danger">X</button></td>`;
}

$('#myTab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(document).ready(renderViews);
