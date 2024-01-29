//App Logic

import { createProject, createToDo } from "./modules/createToDo"


const projects = []

  
projects.push(createProject('To do list'))
console.log(projects[0])
projects[0].createTask('Create Module 1', 'Make the app logic' ,'High' ,'Tomorrow')
projects[0].tasks[0].setTitle = 'bro'
console.log(projects[0].tasks)

//organize all tasks based on when they are due, if they are important, and completion status



//DOM Logic

//display all projects from project array in the main section

//add project button that calls new project class to make project

//add task button that calls new task class to create a task
const dialog = document.getElementById('task-dialog')
const addTask = document.getElementById('add-task')
const close = document.getElementById('cancel')

addTask.addEventListener('click', (event) => {
    event.preventDefault()
    dialog.showModal()
})

close.addEventListener('click', (event) => {
    event.preventDefault()
    dialog.close()
})

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria


