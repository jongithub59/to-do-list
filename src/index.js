//App Logic

import { createProject, createToDo } from "./modules/createToDo"


const projects = []

  
// projects.push(createProject('To do list'))
// console.log(projects[0])
// projects[0].createTask('Create Module 1', 'Make the app logic' ,'High' ,'Tomorrow')
// projects[0].tasks[0].setTitle = 'bro'
// console.log(projects[0].tasks)

//organize all tasks based on when they are due, if they are important, and completion status


//DOM Logic
const screenController = function() {
    const projectList = document.querySelector('.project-list')
    
    
    //add project button that calls new project class to make project
    const addNewProject = function() {
        
        const dialog = document.getElementById('project-dialog')
        const projectNameInput = document.getElementById('project-name')
        
        const createButtons = function() {
            const submit = document.getElementById('project-submit')
            const addProject = document.querySelector('.add-project')
            const cancel = document.getElementById('project-cancel')
            
            addProject.addEventListener('click', (event) => {
                event.preventDefault()
                dialog.showModal()
            })
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                submitProject()
                dialog.close()
            })
            
            cancel.addEventListener('click', (event) => {
                event.preventDefault()
                resetDialog()
            })
        }
        
        const submitProject = function() {
            let projectName = projectNameInput.value
            
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
        }
        

        const resetDialog = function() {
            projectNameInput.value = ''
            dialog.close()
        }

        createButtons()
    }
    
    //add task button that calls new task class to create a task
    const addNewTask = function() {
        const dialog = document.getElementById('task-dialog')
        const addTask = document.getElementById('add-task')
        const cancel= document.getElementById('task-cancel')

        addTask.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.showModal()
        })

        cancel.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.close()
        })

        const resetDialog = function() {
            projectNameInput.value = ''
            dialog.close()
        }
    }
    
    //all tasks section that displays all task array elements from all projects
    
    //other tabs that display tasks from all projects based on some criteria
    
    addNewProject()
    addNewTask()
}

screenController()