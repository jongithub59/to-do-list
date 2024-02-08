/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/classes.js":
/*!********************************!*\
  !*** ./src/modules/classes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }

    set setName(name) {
        this.name = name
    }  

    get getName() {
        return this.name
    }

    get getTasks() {
        return this.tasks
    }

    createTask(title, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, priority, dueDate)
        this.tasks.push(task)
        return task
    }

    findTask(title) {
        return this.tasks.find((task) => task.getTitle == title)
    }

    deleteTask(taskTitle) { //removes inputted task from the tasks array by replacing the array with one that excludes the task title given
        this.tasks = this.tasks.filter(task => task.title !== taskTitle)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, priority, date) { //initialize values from dialog input
        this.title = title
        // this.desc = desc
        this.priority = priority
        this.date = date
        this.completion = false
    }

    set setTitle(title) { // set task title to inputted title name
        this.title = title
    }   

    get getTitle() { //return the task title
        return this.title
    }

    set setDescription(desc) {
        this.desc = desc
    }   

    set setPriority(priority) {
        this.priority = priority
    } 
    
    get getPriority() {
        return this.priority
    }

    set setDate(date) {
        this.date = date
    }  

    get getDate() {
        return this.date
    }

    set setCompletion(completion) {
        this.completion = completion
    }
}



/***/ }),

/***/ "./src/modules/logic.js":
/*!******************************!*\
  !*** ./src/modules/logic.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createToDoList)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module './edit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _toDoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDoList */ "./src/modules/toDoList.js");
// import { Project, Task } from "./classes";


// import editTask, { openEditDialog } from "./edit";

function createToDoList() {
    const toDoList = new _toDoList__WEBPACK_IMPORTED_MODULE_1__["default"]
    
    const screenController = (function() {
        const main = document.querySelector('.to-do-content')
        const projectList = document.querySelector('.project-list')
        const projectTitle = document.getElementById('to-do-title')
        let currentProject = ''

        const task = (function() {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const priority = document.getElementsByName('task-priority')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')

            const editTask = edit()
            
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
                    validateTask(title.value, priority, date.value)
                    dialog.close()
                    taskForm.reset()
                })
            })()

            const validateTask = function() {
                if (title.value == '' ) alert('Title cannot be empty')
                if (currentProject.findTask(title.value)) return alert('Task Name already in use')
                if (!document.querySelector("input[name='task-priority']:checked")) alert('Priority cannot be unselected')
                if (date.value == '') alert('Date cannot be empty')
                const priority = document.querySelector("input[name='task-priority']:checked").value

                addTask(currentProject, title.value, priority, date.value)
            }

            const addTask = function(currentProject, title, priority, date) {
                const task = currentProject.createTask(title, priority, date)
                console.log(task)
                
                const toDo = document.createElement('div')
                const check = document.createElement('div')
                const name = document.createElement('p')
                const taskPriority = document.createElement('p')
                const dueDate = document.createElement('p')
                const edit = document.createElement('div')
                const icon = document.createElement('img')
                const remove = document.createElement('div')
                const icon2 = document.createElement('img')
                
                toDo.classList.add('to-do')
                check.classList.add('checkmark')
                check.addEventListener('click', () => {
                    check.classList.toggle('checked')
                })
                name.classList.add('to-do-name')
                name.textContent = task.title
                
                taskPriority.classList.add('priority')
                taskPriority.textContent = 'Priority'
                if (task.priority == 'low') taskPriority.classList.add('low-priority')
                if (task.priority == 'medium') taskPriority.classList.add('medium-priority')
                if (task.priority == 'high') taskPriority.classList.add('high-priority')
                
                dueDate.classList.add('date')
                dueDate.textContent = task.date
                edit.classList.add('edit-button')
                icon.src = './pics/square-edit-outline.svg'
                edit.appendChild(icon)
                remove.classList.add('delete-button')
                remove.addEventListener('click', () => {
                    toDo.remove()
                    currentProject.deleteTask(title)
                })
                icon2.src = './pics/trash-can-outline.svg'
                remove.appendChild(icon2)
                
                toDo.appendChild(check)
                toDo.appendChild(name)
                toDo.appendChild(taskPriority)
                toDo.appendChild(dueDate)
                toDo.appendChild(edit)
                toDo.appendChild(remove)
                main.appendChild(toDo)
            }

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
                for (item in project.tasks) {
                    // displayTask(item)

                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                currentProject = project
                const addTask = document.getElementById('add-task')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    // return console.log(project)
                })
                projectTitle.textContent = project.name
                displayProjectTasks(project.tasks, toDoContent) //displays the selected project's tasks array using a for loop
                return currentProject
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
                currentProject = displayProjectDetails(toDoList.findProject('All'))
            })()
        })()


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

/***/ }),

/***/ "./src/modules/toDoList.js":
/*!*********************************!*\
  !*** ./src/modules/toDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./src/modules/classes.js");


class ToDoList {
    constructor() {
        this.projects = []
        this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('All'))
        this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('Priority'))
        this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('Completed'))
    }

createProject(name) { //create new project class and add it to the project array
    const project = new _classes__WEBPACK_IMPORTED_MODULE_0__.Project(name)
    this.projects.push(project)
}

get getProjects() { //return the array with all projects
    return this.projects
}

findProject(name) { //return a project in the project array using an inputted project name
    return this.projects.find((project) => project.getName == name)
}

deleteProject(name) { //removes the inputted project by using splice to remove thh 1 element at the given project's index
    this.projects.splice(this.projects.indexOf(this.findProject(name)), 1)
}

}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/logic */ "./src/modules/logic.js");


const toDoList = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__["default"])()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBLFlBQVksZ0JBQWdCO0FBQ0U7QUFDSTtBQUNsQyxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ2U7QUFDZix5QkFBeUIsaURBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4Um1DO0FBQ25DO0FBQ2U7QUFDZjtBQUNBO0FBQ0EsK0JBQStCLDZDQUFPO0FBQ3RDLCtCQUErQiw2Q0FBTztBQUN0QywrQkFBK0IsNkNBQU87QUFDdEM7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qix3QkFBd0IsNkNBQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042QztBQUM3QztBQUNBLGlCQUFpQiwwREFBYyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvZ2ljLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldE5hbWUobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIH0gIFxyXG5cclxuICAgIGdldCBnZXROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2V0VGFza3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3NcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUYXNrKHRpdGxlLCBwcmlvcml0eSwgZHVlRGF0ZSkgeyAvL2NyZWF0ZSBhIG5ldyB0YXNrIGFuZCBhZGQgaXQgdG8gdGhpcyBwcm9qZWN0J3MgdGFzayBsaXN0IFxyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgcHJpb3JpdHksIGR1ZURhdGUpXHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spXHJcbiAgICAgICAgcmV0dXJuIHRhc2tcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVGFzayh0aXRsZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUgPT0gdGl0bGUpXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzayh0YXNrVGl0bGUpIHsgLy9yZW1vdmVzIGlucHV0dGVkIHRhc2sgZnJvbSB0aGUgdGFza3MgYXJyYXkgYnkgcmVwbGFjaW5nIHRoZSBhcnJheSB3aXRoIG9uZSB0aGF0IGV4Y2x1ZGVzIHRoZSB0YXNrIHRpdGxlIGdpdmVuXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay50aXRsZSAhPT0gdGFza1RpdGxlKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBwcmlvcml0eSwgZGF0ZSkgeyAvL2luaXRpYWxpemUgdmFsdWVzIGZyb20gZGlhbG9nIGlucHV0XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICAgICAgLy8gdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgICAgICB0aGlzLmNvbXBsZXRpb24gPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXRUaXRsZSh0aXRsZSkgeyAvLyBzZXQgdGFzayB0aXRsZSB0byBpbnB1dHRlZCB0aXRsZSBuYW1lXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICB9ICAgXHJcblxyXG4gICAgZ2V0IGdldFRpdGxlKCkgeyAvL3JldHVybiB0aGUgdGFzayB0aXRsZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldERlc2NyaXB0aW9uKGRlc2MpIHtcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldFByaW9yaXR5KHByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgZ2V0UHJpb3JpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHlcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgfSAgXHJcblxyXG4gICAgZ2V0IGdldERhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXRDb21wbGV0aW9uKGNvbXBsZXRpb24pIHtcclxuICAgICAgICB0aGlzLmNvbXBsZXRpb24gPSBjb21wbGV0aW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3QsIFRhc2sgfSIsIi8vIGltcG9ydCB7IFByb2plY3QsIFRhc2sgfSBmcm9tIFwiLi9jbGFzc2VzXCI7XHJcbmltcG9ydCBlZGl0VGFzayBmcm9tIFwiLi9lZGl0XCI7XHJcbmltcG9ydCBUb0RvTGlzdCBmcm9tIFwiLi90b0RvTGlzdFwiO1xyXG4vLyBpbXBvcnQgZWRpdFRhc2ssIHsgb3BlbkVkaXREaWFsb2cgfSBmcm9tIFwiLi9lZGl0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUb0RvTGlzdCgpIHtcclxuICAgIGNvbnN0IHRvRG9MaXN0ID0gbmV3IFRvRG9MaXN0XHJcbiAgICBcclxuICAgIGNvbnN0IHNjcmVlbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0by1kby10aXRsZScpXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gJydcclxuXHJcbiAgICAgICAgY29uc3QgdGFzayA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXRhc2snKVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJylcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgndGFzay1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjJylcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRhdGUnKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZWRpdFRhc2sgPSBlZGl0KClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbnMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1zdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRhc2sodGl0bGUudmFsdWUsIHByaW9yaXR5LCBkYXRlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkoKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVUYXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT0gJycgKSBhbGVydCgnVGl0bGUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UHJvamVjdC5maW5kVGFzayh0aXRsZS52YWx1ZSkpIHJldHVybiBhbGVydCgnVGFzayBOYW1lIGFscmVhZHkgaW4gdXNlJylcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3Rhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpKSBhbGVydCgnUHJpb3JpdHkgY2Fubm90IGJlIHVuc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGUudmFsdWUgPT0gJycpIGFsZXJ0KCdEYXRlIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd0YXNrLXByaW9yaXR5J106Y2hlY2tlZFwiKS52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgIGFkZFRhc2soY3VycmVudFByb2plY3QsIHRpdGxlLnZhbHVlLCBwcmlvcml0eSwgZGF0ZS52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnRQcm9qZWN0LCB0aXRsZSwgcHJpb3JpdHksIGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBjdXJyZW50UHJvamVjdC5jcmVhdGVUYXNrKHRpdGxlLCBwcmlvcml0eSwgZGF0ZSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2spXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvRG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKCd0by1kbycpXHJcbiAgICAgICAgICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKCdjaGVja21hcmsnKVxyXG4gICAgICAgICAgICAgICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LnRvZ2dsZSgnY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgbmFtZS5jbGFzc0xpc3QuYWRkKCd0by1kby1uYW1lJylcclxuICAgICAgICAgICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICB0YXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnUHJpb3JpdHknXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnbG93JykgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ2xvdy1wcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnbWVkaXVtJykgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1wcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnaGlnaCcpIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdoaWdoLXByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkYXRlJylcclxuICAgICAgICAgICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmRhdGVcclxuICAgICAgICAgICAgICAgIGVkaXQuY2xhc3NMaXN0LmFkZCgnZWRpdC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSAnLi9waWNzL3NxdWFyZS1lZGl0LW91dGxpbmUuc3ZnJ1xyXG4gICAgICAgICAgICAgICAgZWRpdC5hcHBlbmRDaGlsZChpY29uKVxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvRG8ucmVtb3ZlKClcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdC5kZWxldGVUYXNrKHRpdGxlKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGljb24yLnNyYyA9ICcuL3BpY3MvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJ1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmFwcGVuZENoaWxkKGljb24yKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGNoZWNrKVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChuYW1lKVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGR1ZURhdGUpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGVkaXQpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKHJlbW92ZSlcclxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodG9EbylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KSgpXHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1wcm9qZWN0JylcclxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKVxyXG4gICAgICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwnKVxyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5JylcclxuICAgICAgICAgICAgY29uc3QgY29tcGxldGVkUHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcGxldGVkJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbnMgPSAoZnVuY3Rpb24oKSB7IC8vY3JlYXRlIGZ1bnRpb25hbGl0eSBmb3IgcHJvamVjdCBkaWFsb2cgYnV0dG9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc3VibWl0JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtY2FuY2VsJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9qZWN0KHByb2plY3ROYW1lSW5wdXQudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZVByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0TmFtZSkgeyBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvRG9MaXN0LmdldFByb2plY3RzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09ICcnKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRvRG9MaXN0LmZpbmRQcm9qZWN0KHByb2plY3ROYW1lKSkgcmV0dXJuIGFsZXJ0KCdQcm9qZWN0IE5hbWUgYWxyZWFkeSBpbiB1c2UnKSAvL2lmIGZpbmRQcm9qZWN0KCkgcnVucywgdGhlbiBhIHByb2plY3Qgd2l0aCB0aGF0IG5hbWUgZXhpc3RzIHNvIGVuZCBsb29wXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3QocHJvamVjdE5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpIHsgLy9jcmVhdGUgRE9NIGVsZW1lbnQgd2l0aCBwcm9qZWN0IGRldGFpbHMgYW5kIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0SXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSBcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVByb2plY3Quc3JjID0gJy4vcGljcy9kZWxldGUtZm9yZXZlci5zdmcnXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW1IZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZVxyXG5cclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbUhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKSAvL3dpbGwgcmV0dXJuIHRoZSBwcm9qZWN0IHJlbGF0ZWQgdG8gdGhlIGxpc3QgZWxlbWVudCB0byB1c2UgYSBhIHBhcmFtZXRlciBmb3IgYW5vdGhlciBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0b0RvTGlzdC5kZWxldGVQcm9qZWN0KHByb2plY3RMaXN0SXRlbUhlYWRlci50ZXh0Q29udGVudClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0ucmVtb3ZlKCkgLy9yZW1vdmVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKSAvL2FkZCB0aGUgcHJvamVjdCB0byB0aGUgcHJvamVjdHMgYXJyYXlcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdEl0ZW1IZWFkZXIpXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdClcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0VGFza3MgPSBmdW5jdGlvbihwcm9qZWN0KSB7IC8vd2lsbCBpdGVyYXRlIG92ZXIgcHJvamVjdCdzIHRhc2tzIGFycmF5IGFuZCBkaXNwbGF5IHRoZW0gdG8gdGhlIERPTVxyXG4gICAgICAgICAgICAgICAgZm9yIChpdGVtIGluIHByb2plY3QudGFza3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5VGFzayhpdGVtKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVByb2plY3REZXRhaWxzID0gZnVuY3Rpb24ocHJvamVjdCkgeyAvL3VwZGF0ZXMgcHJvamVjdCBoZWFkZXIgdG8gY2xpY2tlZCBwcm9qZWN0IHRpdGxlIGFuZCByZXBsYWNlcyBwcmV2aW91cyB0YXNrcyB3aXRoIHRoZSBuZXcgcHJvamVjdHMgdGFza3NcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdFxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0RvQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICAgICAgICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGNvbnNvbGUubG9nKHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdFRhc2tzKHByb2plY3QudGFza3MsIHRvRG9Db250ZW50KSAvL2Rpc3BsYXlzIHRoZSBzZWxlY3RlZCBwcm9qZWN0J3MgdGFza3MgYXJyYXkgdXNpbmcgYSBmb3IgbG9vcFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9qZWN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZURlZmF1bHRQcm9qZWN0cyA9IChmdW5jdGlvbigpIHsgLy9hZGRzIGV2ZW50IGxpc3RlbmVycyB0aGF0IGdpdmUgYWNjZXNzIHRvIHRoZWlyIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBjbGFzc2VzXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHByaW9yaXR5UHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZFByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0KCdXb3JrJylcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdBbGwnKSlcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIH0pKClcclxuXHJcblxyXG4gICAgfSkoKVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKCd0ZXN0IGRlbW8nKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3ZhcmlhYmxlcyBpbml0aWFsaXplZCcpXHJcbiAgICAvLyBjb25zdCBwcm9qZWN0NCA9IHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgNCcpXHJcbiAgICAvLyBjb25zdCBwcm9qZWN0MSA9IHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgMScpXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0b0RvTGlzdClcclxuICAgIC8vIGNvbnN0IG1vZHVsZTEgPSBwcm9qZWN0MS5jcmVhdGVUYXNrKCdDcmVhdGUgTW9kdWxlIDEnLCAnZGVzY3JpcHRpb24nLCAnSGlnaCcsICd0b21vcnJvdycpXHJcbiAgICAvLyBjb25zdCBtb2R1bGUyID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAyJywgJ2Rlc2NyaXB0aW9uJywgJ01lZGl1bScsICd0b21vcnJvdycpXHJcbiAgICAvLyBjb25zdCBtb2R1bGUzID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAzJywgJ2Rlc2NyaXB0aW9uJywgJ0xvdycsICd0b21vcnJvdycpXHJcbiAgICAvLyBjb25zdCBtb2R1bGU0ID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSA0JywgJ2Rlc2NyaXB0aW9uJywgJ0hpZ2gnLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gbW9kdWxlNC5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgLy8gcHJvamVjdDEuZGVsZXRlVGFzayhtb2R1bGU0LnRpdGxlKVxyXG4gICAgLy8gbW9kdWxlMi5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgLy8gbW9kdWxlMS5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgLy8gY29uc29sZS5sb2cobW9kdWxlMS5zZXRUaXRsZSA9ICdjcmVhdGUgbW9kdWxlIDInKVxyXG4gICAgLy8gdG9Eb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0NC5uYW1lKVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3QxLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2codG9Eb0xpc3QucHJvamVjdHMpXHJcbiAgICAvLyBjb25zb2xlLmxvZygncHJpb3JpdHknLHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdQcmlvcml0eScpLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2NvbXBsZXRlZCcsIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdDb21wbGV0ZWQnKS50YXNrcylcclxuICAgIFxyXG4gICAgLy8gY29uc3QgYWRkVG9BcnJheSA9IGZ1bmN0aW9uKHRhc2spIHsgLy9hZGRzIHRoZSB0YXNrIHRvIG9uZSBvZiB0aGUgYmVsb3cgYXJyYXlzIGlmIGl0IG1lZXRzIGFueSBvZiB0aGUgY29uZGl0aW9uc1xyXG4gICAgLy8gICAgIGlmKHRhc2sucHJpb3JpdHkgPT0gJ0hpZ2gnKSB0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcy5wdXNoKHRhc2spXHJcbiAgICAvLyAgICAgaWYodGFzay5jb21wbGV0aW9uID09IHRydWUpIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdDb21wbGV0ZWQnKS50YXNrcy5wdXNoKHRhc2spXHJcbiAgICAvLyB9XHJcbiAgICAvLyBhZGRUb0FycmF5KG1vZHVsZTEpXHJcbiAgICAvLyBhZGRUb0FycmF5KG1vZHVsZTIpXHJcbiAgICAvLyBhZGRUb0FycmF5KG1vZHVsZTMpXHJcbiAgICAvLyAvLyBhZGRUb0FycmF5KG1vZHVsZTQpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnJylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdhZGRlZCB0byBhcnJheXMnKVxyXG4gICAgLy8gY29uc29sZS5sb2coJycpXHJcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0MS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdwcmlvcml0eScsIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdQcmlvcml0eScpLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2NvbXBsZXRlZCcsIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdDb21wbGV0ZWQnKS50YXNrcylcclxuICAgIC8vIHJldHVybiB0b0RvTGlzdFxyXG59IiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL2NsYXNzZXNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdBbGwnKSlcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ1ByaW9yaXR5JykpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdDb21wbGV0ZWQnKSlcclxuICAgIH1cclxuXHJcbmNyZWF0ZVByb2plY3QobmFtZSkgeyAvL2NyZWF0ZSBuZXcgcHJvamVjdCBjbGFzcyBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IGFycmF5XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSlcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KVxyXG59XHJcblxyXG5nZXQgZ2V0UHJvamVjdHMoKSB7IC8vcmV0dXJuIHRoZSBhcnJheSB3aXRoIGFsbCBwcm9qZWN0c1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHNcclxufVxyXG5cclxuZmluZFByb2plY3QobmFtZSkgeyAvL3JldHVybiBhIHByb2plY3QgaW4gdGhlIHByb2plY3QgYXJyYXkgdXNpbmcgYW4gaW5wdXR0ZWQgcHJvamVjdCBuYW1lXHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUgPT0gbmFtZSlcclxufVxyXG5cclxuZGVsZXRlUHJvamVjdChuYW1lKSB7IC8vcmVtb3ZlcyB0aGUgaW5wdXR0ZWQgcHJvamVjdCBieSB1c2luZyBzcGxpY2UgdG8gcmVtb3ZlIHRoaCAxIGVsZW1lbnQgYXQgdGhlIGdpdmVuIHByb2plY3QncyBpbmRleFxyXG4gICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UodGhpcy5wcm9qZWN0cy5pbmRleE9mKHRoaXMuZmluZFByb2plY3QobmFtZSkpLCAxKVxyXG59XHJcblxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZVRvRG9MaXN0IGZyb20gXCIuL21vZHVsZXMvbG9naWNcIjtcclxuXHJcbmNvbnN0IHRvRG9MaXN0ID0gY3JlYXRlVG9Eb0xpc3QoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==