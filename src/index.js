//App Logic

import { createProject, createToDo } from "./modules/createToDo"

const projects = []
const tasks = []

//organize all tasks based on when they are due, if they are important, and completion status

//DOM Logic
const screenController = function() {
    const projectList = document.querySelector('.project-list')
    const main = document.querySelector('.to-do-content')
    const projectForm = document.getElementById('create-project')
    const taskForm = document.getElementById('create-task')

    
    const openDialog = function(button, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.showModal()
        })
    }
    
    const cancelDialog = function(button, input, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            projectForm.reset()
            dialog.close()
        })
    }
    
    //add project button that calls new project class to make project
    const addNewProject = function() {
        
        const dialog = document.getElementById('project-dialog')
        const nameInput = document.getElementById('project-name')
        
        const createButtons = function() {
            const submit = document.getElementById('project-submit')
            const addProject = document.querySelector('.add-project')
            const cancel = document.getElementById('project-cancel')
            
            openDialog(addProject, dialog)
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                submitProject()
                dialog.close()
            })
            
            cancelDialog(cancel, nameInput, dialog)
            
        }
        
        const submitProject = function() {
            if (nameInput.value == '') return alert('Project Name cannot be empty')
            
            const project = (createProject(nameInput.value))
            displayProject(project)
        }
        
        //display all projects from project array in the main section
        function displayProject(project) {
            const projectHeader = document.createElement('h2')
            projectHeader.textContent = project.name
            
            projectList.appendChild(projectHeader)
            projectForm.reset()
        }
        
        
        
        createButtons()
    }
    
    //add task button that calls new task class to create a task
    const addNewTask = function() {
        const dialog = document.getElementById('task-dialog')
        const title = document.getElementById('task-title')
        const desc = document.getElementById('task-desc')
        const date = document.getElementById('task-date')
        
        
        const createButtons = function() {
            const addTask = document.getElementById('add-task')
            const cancel = document.getElementById('task-cancel')
            const submit = document.getElementById('task-submit')
            
            openDialog(addTask, dialog)
            
            cancel.addEventListener('click', (event) => {
                event.preventDefault()
                taskForm.reset()
                dialog.close()
            })
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                if (title.value == '' || date.value == '') return alert('Text fields must be filled')
                submitTask()
                dialog.close()
            })
        }

        createButtons()
    
        const createDefaultTasks = function() {
            const task1 = displayTask(createToDo('Create Module 1', 'Module 1 will contain application logic', 'medium', '2024-01-01'))
            tasks.push(task1)
        }

        const submitTask = function() {
            const priority = document.querySelector("input[name='task-priority']:checked").value
            
            const task = createToDo(title.value, desc, priority, date.value)
            tasks.push(task)
            displayTask(task)
            taskForm.reset()
        }
        
        const displayTask = function(task) {
            const toDo = document.createElement('div')
            const check = document.createElement('img')
            const name = document.createElement('p')
            const priority = document.createElement('p')
            const dueDate = document.createElement('p')
            const edit = document.createElement('div')
            const icon = document.createElement('img')
            const remove = document.createElement('div')
            const icon2 = document.createElement('img')
            
            toDo.classList.add('to-do')
            check.src = './pics/check icon.png'
            check.alt ='checkbox'
            name.classList.add('to-do-name')
            name.textContent = task.title
            
            priority.classList.add('priority')
            priority.textContent = 'Priority'
            console.log(task.priority)
            if (task.priority == 'low') priority.classList.add('low-priority')
            if (task.priority == 'medium') priority.classList.add('medium-priority')
            if (task.priority == 'high') priority.classList.add('high-priority')
            
            dueDate.classList.add('date')
            dueDate.textContent = task.date
            edit.classList.add('edit-button')
            icon.src = './pics/square-edit-outline.svg'
            edit.appendChild(icon)
            remove.classList.add('delete-button')
            remove.setAttribute('onclick', "return this.parentNode.remove();")
            icon2.src = './pics/trash-can-outline.svg'
            remove.appendChild(icon2)
            
            toDo.appendChild(check)
            toDo.appendChild(name)
            toDo.appendChild(priority)
            toDo.appendChild(dueDate)
            toDo.appendChild(edit)
            toDo.appendChild(remove)
            main.appendChild(toDo)
        }
        createDefaultTasks()
        //need module that will add a task specifically to the project currently in
    
    
}

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria
    
    addNewProject()
    addNewTask()
}

screenController()