//DOM Logic

const projects = []

//display all projects from project array in the main section

//add project button that calls new project class to make project

//add task button that calls new task class to create a task
const dialog = document.getElementById('task-dialog')
const addTask = document.getElementById('add-task')
const cancel = document.getElementById('cancel')

addTask.addEventListener('click', (event) => {
    event.preventDefault()
    dialog.showModal()
})

cancel.addEventListener('click', (event) => {
    event.preventDefault()
    dialog.close()
})

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria
