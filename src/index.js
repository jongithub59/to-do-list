//App Logic

import { createProject, createToDo } from "./modules/createToDo"


const projects = []
const tasks = []

  
// projects.push(createProject('To do list'))
// console.log(projects[0])
// projects[0].createTask('Create Module 1', 'Make the app logic' ,'High' ,'Tomorrow')
// projects[0].tasks[0].setTitle = 'bro'
// console.log(projects[0].tasks)

//organize all tasks based on when they are due, if they are important, and completion status


//DOM Logic
const screenController = function() {
    const projectList = document.querySelector('.project-list')
    const main = document.querySelector('.to-do-content')

    const openDialog = function(button, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.showModal()
        })
    }
    
    const cancelDialog = function(button, input, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            resetDialog(input, dialog)
        })
    }
    
    const resetDialog = function(input, dialog) {
        input.value = ''
        dialog.close()
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
            let projectName = nameInput.value
            
            if (projectName == '') return alert('Project Name cannot be empty')
            
            projects.push(createProject(projectName))
            console.log(projects)
            displayProject(projectName)
        }
        
        //display all projects from project array in the main section
        function displayProject(projectName) {
            const project = document.createElement('h2')
            project.textContent = projectName

            projectList.appendChild(project)
            resetDialog(nameInput, dialog)
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
                console.log('yess')
                resetDialog()
            })
    
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                submitTask()
                dialog.close()
            })

            const submitTask = function() {
                // if (title.value == '' || desc.value == '' || date.value == '') return alert('Text fields must be filled')
                console.log(title)
                console.log()

                const taskPriority = document.querySelector("input[name='task-priority']:checked").value
                
                tasks.push(createToDo(title, desc, taskPriority, date))
                displayTask(title, desc, taskPriority, date)
            }

            const displayTask= function(title, desc, taskPriority, date) {
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
                name.textContent = title.value

                priority.classList.add('priority')
                priority.textContent = 'Priority'
                if (taskPriority == 'low') priority.classList.add('low-priority')
                if (taskPriority == 'medium') priority.classList.add('medium-priority')
                if (taskPriority == 'high') priority.classList.add('high-priority')

                dueDate.classList.add('date')
                dueDate.textContent = date.value
                edit.classList.add('edit-button')
                icon.src = './pics/square-edit-outline.svg'
                edit.appendChild(icon)
                remove.classList.add('delete-button')
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
            //need module that will add a task specifically to the project currently in

    
            const resetDialog = function() {
                dialog.close()
            }

        }

        createButtons()
    }
    
    //all tasks section that displays all task array elements from all projects
    
    //other tabs that display tasks from all projects based on some criteria
    
    addNewProject()
    addNewTask()
}

screenController()