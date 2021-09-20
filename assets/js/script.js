function displayCurrentDay() {
  let initMoment = moment().format("dddd Do, MMMM YYYY");
  $("#currentDay").text(initMoment);
}

function createTimeBlock(theTime) {
  let timeBlockRow = $("<div class='row'>");
  let timeBlockHourCol = $(
    "<div class='col-1 hour d-flex justify-content-end'>"
  );
  let timeBlockHour = $("<span class='hour-area'></span>");
  let timeBlockTextareaCol = $("<div class='col-10 past px-0'>");
  let timeBlockTextarea = $(
    "<textarea name='' class='task-area description todo-block text-dark' id='' rows='4'></textarea>"
  );
  let timeBlockSaveCol = $("<div class='col-1 save-btn d-flex'>");
  let timeBlockSave = $("<i class='fas fa-save m-auto fa-lg save-button'></i>");

  // Add classes based on current hour

  let militaryTime = parseInt(moment().format("HH"));
  theTime = parseInt(theTime);

  if (theTime === militaryTime) {
    timeBlockTextarea.addClass("present");
  } else if (theTime > militaryTime) {
    timeBlockTextarea.addClass("future");
  } else {
    // Not relevant as we already defaulted the class to past
    timeBlockTextarea.addClass("past");
  }

  // Build
  let timeText = `${theTime > 11 ? `${theTime} PM` : `${theTime} AM`}`;
  timeBlockHourCol = timeBlockHourCol.append(timeBlockHour).text(timeText);
  timeBlockTextareaCol = timeBlockTextareaCol.append(timeBlockTextarea);
  timeBlockSaveCol = timeBlockSaveCol.append(timeBlockSave);

  let retrievedTodo = fetchTodo(timeText);
  timeBlockTextarea.val(fetchTodo(timeText));

  if (retrievedTodo) {
    timeBlockTextarea.addClass("border border-5 border-info");
  }

  timeBlockRow.append(timeBlockHourCol);
  timeBlockRow.append(timeBlockTextareaCol);
  timeBlockRow.append(timeBlockSaveCol);
  $(".container").append(timeBlockRow);
}

function workingHours() {
  for (let i = 9; i <= 17; i++) {
    createTimeBlock(i);
  }

  $(".save-button").on("click", saveTask);
}

function saveTask() {
  let textAreaVal = $(this).parent().parent().find(".todo-block").val();
  let hourVal = $(this).parent().parent().find(".hour").text();

  $(this)
    .parent()
    .parent()
    .find(".todo-block")
    .addClass("border border-success");

  localStorage.setItem(`${hourVal}`, `${textAreaVal}`);
}

function fetchTodo(hour) {
  let storedTextAreaVal = localStorage.getItem(`${hour}`);
  return `${storedTextAreaVal ? storedTextAreaVal : ""}`;
}

// INITIALIZATION
displayCurrentDay();
workingHours();
