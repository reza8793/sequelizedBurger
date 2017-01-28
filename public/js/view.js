$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var newBurger = $("input.new-burger");
  // Our new todos will go inside the todoContainer
  var burgerContainer = $(".burgerContainer");


  var devourContainer = $(".devourContainer");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("submit", "#todo-form", insertBurger);
  $(document).on("click", "button.devour", devourBurger);
  $(document).on("click", "button.delete", deleteBurger);

  // Our initial burgers array
  var burgers = [];

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getBurgers() {
    $.get("/api/todos", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  function devourBurger() {

    var id = $(this).data("id");
    devourContainer.empty();
    
    devourContainer.append("devoured one");
  }


  // This function deletes a todo when the user clicks the delete button
  function deleteBurger() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
    }).done(function() {
      getBurgers();
    });
  }


  // This function constructs a todo-item row
  function createNewRow(todo) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item todo-item");
    var newTodoSpan = $("<span>");
    newTodoSpan.text(todo.text);
    newInputRow.append(newTodoSpan);
    var newTodoInput = $("<input>");
    newTodoInput.attr("type", "text");
    newTodoInput.addClass("edit");
    newTodoInput.css("display", "none");
    newInputRow.append(newTodoInput);

    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-default");
    newDeleteBtn.text("X");
    newDeleteBtn.data("id", todo.id);
    newInputRow.append(newDeleteBtn);
    

    var devourButton = $("<button>");
    devourButton.addClass("devour btn btn-default");
    devourButton.text("Devour it");
    devourButton.data("id", todo.id);
    newInputRow.append(devourButton);


    newInputRow.data("todo", todo);


    return newInputRow;
  }

  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
    // if (!newItemInput.val().trim()) {
    //   return;
    // }
    var burger = {
      text: newBurger.val().trim(),
      complete: false
    };

    $.post("/api/todos", burger, function() {
      getBurgers();
    });
    // newBurger.val("");
  }

});
