// import { Project, Task } from "./classes";
import ToDoList from "./toDoList";

export default function createToDoList() {
    const toDoList = new ToDoList
    
    const screenController = (function() {
        const main = document.querySelector('.to-do-content')
        const projectList = document.querySelector('.project-list')
        const projectTitle = document.getElementById('to-do-title')
        
        const task = (function() {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')
            
            const createButtons = (function() {
                const submit = document.getElementById('task-submit')
                const addTask = document.getElementById('add-task')
                const cancel = document.getElementById('task-cancel')
                
                addTask.addEventListener('click', (e) => {
                    e.preventDefault()
                    dialog.showModal()
                })

                cancel.addEventListener('click', (e) => {
                    e.preventDefault()
                    taskForm.reset()
                    dialog.close()
                })

                submit.addEventListener('click', (e) => {
                    e.preventDefault()
                    // validateTask()
                    dialog.close()
                    taskForm.reset()
                })
            })()
        })()

        const project = (function() {
            const projectForm = document.getElementById('create-project')
            const dialog = document.getElementById('project-dialog')
            const projectNameInput = document.getElementById('project-name')
            const allProjects = document.getElementById('all')
            const priorityProjects = document.getElementById('priority')
            const completedProjects = document.getElementById('completed')
            
            const createButtons = (function() { //create funtionality for project dialog buttons
                const submit = document.getElementById('project-submit')
                const addProject = document.querySelector('.add-project')
                const cancel = document.getElementById('project-cancel')
                
                addProject.addEventListener('click', (e) => {
                    e.preventDefault()
                    dialog.showModal()
                })

                cancel.addEventListener('click', (e) => {
                    e.preventDefault()
                    projectForm.reset()
                    dialog.close()
                })

                submit.addEventListener('click', (e) => {
                    e.preventDefault()
                    validateProject(projectNameInput.value)
                    dialog.close()
                    projectForm.reset()
                })
            })()
            
            const validateProject = function(projectName) { 
                console.log(toDoList.getProjects)
                if (projectName == '') return alert('Project Name cannot be empty')
                if (toDoList.findProject(projectName)) return alert('Project Name already in use') //if findProject() runs, then a project with that name exists so end loop
                
                addProject(projectName)
            }
            
            
            const addProject = function(projectName) { //create DOM element with project details and functions
                const projectListItem = document.createElement('div')
                const projectListItemHeader = document.createElement('h2')
                const deleteProject = document.createElement('img') 
                deleteProject.src = './pics/delete-forever.svg'
                projectListItemHeader.textContent = projectName

                projectListItemHeader.addEventListener('click', (e) => {
                    console.log(toDoList.findProject(e.target.textContent)) //will return the project related to the list element to use a a parameter for another element
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                deleteProject.addEventListener('click', () => {
                    toDoList.deleteProject(projectListItemHeader.textContent)
                    projectListItem.remove() //removes the element from the DOM
                    projectTitle.textContent = ''
                })
                
                toDoList.createProject(projectName) //add the project to the projects array
                projectListItem.appendChild(projectListItemHeader)
                projectListItem.appendChild(deleteProject)
                projectList.appendChild(projectListItem)

            }
            
            const displayProjectTasks = function(project) { //will iterate over project's tasks array and display them to the DOM
                for (task in project.tasks) {
                    // displayTask(task)

                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                const addTask = document.getElementById('add-task')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    return console.log(project)
                })
                projectTitle.textContent = project.name
                displayProjectTasks(project.tasks, toDoContent) //displays the selected project's tasks array using a for loop
            }
            
            const createDefaultProjects = (function() { //adds event listeners that give access to their corresponding project classes

                allProjects.addEventListener('click', (e) => {
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                priorityProjects.addEventListener('click', (e) => {
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                completedProjects.addEventListener('click', (e) => {
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                addProject('Work')
            })()
        })()


        const edit = function() {

        }
    })()




























    // console.log('test demo')
    // console.log('variables initialized')
    // const project4 = toDoList.createProject('Project 4')
    // const project1 = toDoList.createProject('Project 1')
    // console.log(toDoList)
    // const module1 = project1.createTask('Create Module 1', 'description', 'High', 'tomorrow')
    // const module2 = project1.createTask('Create Module 2', 'description', 'Medium', 'tomorrow')
    // const module3 = project1.createTask('Create Module 3', 'description', 'Low', 'tomorrow')
    // const module4 = project1.createTask('Create Module 4', 'description', 'High', 'tomorrow')
    // module4.setCompletion = true
    // project1.deleteTask(module4.title)
    // module2.setCompletion = true
    // module1.setCompletion = true
    // console.log(module1.setTitle = 'create module 2')
    // toDoList.deleteProject(project4.name)

    // console.log(project1.tasks)
    // console.log(toDoList.projects)
    // console.log('priority',toDoList.findProject('Priority').tasks)
    // console.log('completed', toDoList.findProject('Completed').tasks)
    
    // const addToArray = function(task) { //adds the task to one of the below arrays if it meets any of the conditions
    //     if(task.priority == 'High') toDoList.findProject('Priority').tasks.push(task)
    //     if(task.completion == true) toDoList.findProject('Completed').tasks.push(task)
    // }
    // addToArray(module1)
    // addToArray(module2)
    // addToArray(module3)
    // // addToArray(module4)
    // console.log('')
    // console.log('added to arrays')
    // console.log('')
    // console.log(project1.tasks)
    // console.log('priority', toDoList.findProject('Priority').tasks)
    // console.log('completed', toDoList.findProject('Completed').tasks)
    // return toDoList
}