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
/* harmony import */ var _toDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDoList */ "./src/modules/toDoList.js");
// import { Project, Task } from "./classes";


function createToDoList() {
    const toDoList = new _toDoList__WEBPACK_IMPORTED_MODULE_0__["default"]
    
    const screenController = (function() {
        const main = document.querySelector('.to-do-content')
        const projectList = document.querySelector('.project-list')
        const projectTitle = document.getElementById('to-do-title')
        let currentProject = ''

        const edit = function() {
            const editDialog = document.getElementById('edit-dialog')
            const editForm = document.getElementById('edit-task')
            const editSubmit = document.getElementById('edit-submit')
            const editTitle = document.getElementById('edit-task-title')
            const editDesc = document.getElementById('edit-task-desc')
            const editPriority = document.getElementsByName('edit-task-priority')
            const editDate = document.getElementById('edit-task-date')
            const editCancel = document.getElementById('edit-cancel')

            const cancelEdit = (function() {
                editCancel.addEventListener('click', (e) => {
                    e.preventDefault()
                    editForm.reset()
                    editDialog.close()
                })
            })()

            const submitEditButton = function(task) {
                editSubmit.addEventListener('click', (e) => {
                    e.preventDefault()
                    validateEditTask(editTitle.value, editDate.value, task)
                    editDialog.close()
                    editForm.reset()
                })
            }
            
            const openEditDialog = (button, task) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault()
                    showEditDetails(task)
                    editDialog.showModal()
                })
            } 
            
            const showEditDetails = function(task) {
                editTitle.value = task.title
                console.log(editTitle.value)
                editPriority.forEach((button) => {
                    if (button.value == task.priority) button.setAttribute('checked', 'checked')
                })
                editDate.value = task.date
            }

            const validateEditTask = function(editTitle, editDate, task) {
                console.log(editTitle)
                if (editTitle == '' ) return alert('Title cannot be empty')
                if (editDate == '') return alert('Date cannot be empty')

                const newTitle = editTitle
                const newPriority = document.querySelector("input[name='edit-task-priority']:checked").value
                const newDate = editDate 

                editTask(newTitle, newPriority, newDate, task)
            }

            const editTask = function(newTitle, newPriority, newDate, task) {
                task.setTitle = newTitle
                task.setPriority = newPriority
                task.setDate = newDate
                updateTask(task)
            }

            const updateTask = function(task) {
                
            }
        
            return { openEditDialog, submitEditButton }
        }

        const task = function() {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const priority = document.getElementsByName('task-priority')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')

            const editTask = edit()

            const getTaskDialog = function() {
                return dialog
            }
            
            const createButtons = (function() {
                const submit = document.getElementById('task-submit')
                const addTask = document.getElementById('add-task')
                const cancel = document.getElementById('task-cancel')
                
                // addTask.addEventListener('click', (e) => {
                //     e.preventDefault()
                //     dialog.showModal()
                // })

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
            
                const task = currentProject.createTask(title.value, priority, date.value)


                addTask(currentProject, task)
            }

            const addTask = function(currentProject, task) {
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
                editTask.openEditDialog(edit, task)
                editTask.submitEditButton(task)
                remove.classList.add('delete-button')
                remove.addEventListener('click', () => {
                    toDo.remove()
                    currentProject.deleteTask(task.title)
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

            return { addTask, getTaskDialog }
        }

        const project = (function() {
            const makeTask = task()
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
            
            const displayProjectTasks = function(toDoContent, tasks, project) { //will iterate over project's tasks array and display them to the DOM
                toDoContent.innerHTML = ''
                for (const i in tasks ) {
                    makeTask.addTask(project, tasks[i])
                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                currentProject = project
                const addTask = document.getElementById('add-task')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    makeTask.getTaskDialog().showModal()
                })
                projectTitle.textContent = project.name
                displayProjectTasks(toDoContent, project.tasks, project) //displays the selected project's tasks array using a for loop
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
                const defaultTask = currentProject.createTask('Create Module 1', 'medium', '2024-02-14')
                makeTask.addTask(currentProject, defaultTask)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQzdDO0FBQ0EsaUJBQWlCLDBEQUFjLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvRG9MaXN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnRhc2tzID0gW11cclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0TmFtZShuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgfSAgXHJcblxyXG4gICAgZ2V0IGdldE5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBnZXRUYXNrcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrc1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRhc2sodGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKSB7IC8vY3JlYXRlIGEgbmV3IHRhc2sgYW5kIGFkZCBpdCB0byB0aGlzIHByb2plY3QncyB0YXNrIGxpc3QgXHJcbiAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBwcmlvcml0eSwgZHVlRGF0ZSlcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzaylcclxuICAgICAgICByZXR1cm4gdGFza1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUYXNrKHRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5nZXRUaXRsZSA9PSB0aXRsZSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUYXNrKHRhc2tUaXRsZSkgeyAvL3JlbW92ZXMgaW5wdXR0ZWQgdGFzayBmcm9tIHRoZSB0YXNrcyBhcnJheSBieSByZXBsYWNpbmcgdGhlIGFycmF5IHdpdGggb25lIHRoYXQgZXhjbHVkZXMgdGhlIHRhc2sgdGl0bGUgZ2l2ZW5cclxuICAgICAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnRpdGxlICE9PSB0YXNrVGl0bGUpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vY3JlYXRlIG5ldyB0YXNrIGNsYXNzL29iamVjdCB3aXRoIHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGFuZCBkdWUgZGF0ZSBjb2xsZWN0ZWQgZnJvbSB0aGUgdXNlciBhbmQgYWRkIHRvIHRoZSB0YXNrIGFycmF5XHJcbmNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIHByaW9yaXR5LCBkYXRlKSB7IC8vaW5pdGlhbGl6ZSB2YWx1ZXMgZnJvbSBkaWFsb2cgaW5wdXRcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgICAgICAvLyB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgICAgIHRoaXMuY29tcGxldGlvbiA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKSB7IC8vIHNldCB0YXNrIHRpdGxlIHRvIGlucHV0dGVkIHRpdGxlIG5hbWVcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgIH0gICBcclxuXHJcbiAgICBnZXQgZ2V0VGl0bGUoKSB7IC8vcmV0dXJuIHRoZSB0YXNrIHRpdGxlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGVcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCBnZXRQcmlvcml0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXREYXRlKGRhdGUpIHtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0RGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldENvbXBsZXRpb24oY29tcGxldGlvbikge1xyXG4gICAgICAgIHRoaXMuY29tcGxldGlvbiA9IGNvbXBsZXRpb25cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdCwgVGFzayB9IiwiLy8gaW1wb3J0IHsgUHJvamVjdCwgVGFzayB9IGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0IFRvRG9MaXN0IGZyb20gXCIuL3RvRG9MaXN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUb0RvTGlzdCgpIHtcclxuICAgIGNvbnN0IHRvRG9MaXN0ID0gbmV3IFRvRG9MaXN0XHJcbiAgICBcclxuICAgIGNvbnN0IHNjcmVlbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0by1kby10aXRsZScpXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gJydcclxuXHJcbiAgICAgICAgY29uc3QgZWRpdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0RGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrJylcclxuICAgICAgICAgICAgY29uc3QgZWRpdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXN1Ym1pdCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stdGl0bGUnKVxyXG4gICAgICAgICAgICBjb25zdCBlZGl0RGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stZGVzYycpXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdlZGl0LXRhc2stcHJpb3JpdHknKVxyXG4gICAgICAgICAgICBjb25zdCBlZGl0RGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stZGF0ZScpXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1jYW5jZWwnKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsRWRpdCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgICAgICBlZGl0RGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pKClcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEVkaXRCdXR0b24gPSBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZUVkaXRUYXNrKGVkaXRUaXRsZS52YWx1ZSwgZWRpdERhdGUudmFsdWUsIHRhc2spXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdERpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgb3BlbkVkaXREaWFsb2cgPSAoYnV0dG9uLCB0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dFZGl0RGV0YWlscyh0YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXREaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBzaG93RWRpdERldGFpbHMgPSBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0VGl0bGUudmFsdWUgPSB0YXNrLnRpdGxlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZGl0VGl0bGUudmFsdWUpXHJcbiAgICAgICAgICAgICAgICBlZGl0UHJpb3JpdHkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi52YWx1ZSA9PSB0YXNrLnByaW9yaXR5KSBidXR0b24uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGVkaXREYXRlLnZhbHVlID0gdGFzay5kYXRlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlRWRpdFRhc2sgPSBmdW5jdGlvbihlZGl0VGl0bGUsIGVkaXREYXRlLCB0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZGl0VGl0bGUpXHJcbiAgICAgICAgICAgICAgICBpZiAoZWRpdFRpdGxlID09ICcnICkgcmV0dXJuIGFsZXJ0KCdUaXRsZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXREYXRlID09ICcnKSByZXR1cm4gYWxlcnQoJ0RhdGUgY2Fubm90IGJlIGVtcHR5JylcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGVkaXRUaXRsZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0nZWRpdC10YXNrLXByaW9yaXR5J106Y2hlY2tlZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGF0ZSA9IGVkaXREYXRlIFxyXG5cclxuICAgICAgICAgICAgICAgIGVkaXRUYXNrKG5ld1RpdGxlLCBuZXdQcmlvcml0eSwgbmV3RGF0ZSwgdGFzaylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbihuZXdUaXRsZSwgbmV3UHJpb3JpdHksIG5ld0RhdGUsIHRhc2spIHtcclxuICAgICAgICAgICAgICAgIHRhc2suc2V0VGl0bGUgPSBuZXdUaXRsZVxyXG4gICAgICAgICAgICAgICAgdGFzay5zZXRQcmlvcml0eSA9IG5ld1ByaW9yaXR5XHJcbiAgICAgICAgICAgICAgICB0YXNrLnNldERhdGUgPSBuZXdEYXRlXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUYXNrKHRhc2spXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4geyBvcGVuRWRpdERpYWxvZywgc3VibWl0RWRpdEJ1dHRvbiB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRpYWxvZycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS10YXNrJylcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpXHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3Rhc2stcHJpb3JpdHknKVxyXG4gICAgICAgICAgICBjb25zdCBkZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGVzYycpXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRUYXNrID0gZWRpdCgpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXRUYXNrRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlhbG9nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbnMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1zdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIC8vICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRhc2sodGl0bGUudmFsdWUsIHByaW9yaXR5LCBkYXRlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkoKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVUYXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT0gJycgKSBhbGVydCgnVGl0bGUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UHJvamVjdC5maW5kVGFzayh0aXRsZS52YWx1ZSkpIHJldHVybiBhbGVydCgnVGFzayBOYW1lIGFscmVhZHkgaW4gdXNlJylcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3Rhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpKSBhbGVydCgnUHJpb3JpdHkgY2Fubm90IGJlIHVuc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGUudmFsdWUgPT0gJycpIGFsZXJ0KCdEYXRlIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd0YXNrLXByaW9yaXR5J106Y2hlY2tlZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBjdXJyZW50UHJvamVjdC5jcmVhdGVUYXNrKHRpdGxlLnZhbHVlLCBwcmlvcml0eSwgZGF0ZS52YWx1ZSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVGFzayhjdXJyZW50UHJvamVjdCwgdGFzaylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnRQcm9qZWN0LCB0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRvRG8uY2xhc3NMaXN0LmFkZCgndG8tZG8nKVxyXG4gICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LmFkZCgnY2hlY2ttYXJrJylcclxuICAgICAgICAgICAgICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrLmNsYXNzTGlzdC50b2dnbGUoJ2NoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIG5hbWUuY2xhc3NMaXN0LmFkZCgndG8tZG8tbmFtZScpXHJcbiAgICAgICAgICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gdGFzay50aXRsZVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ1ByaW9yaXR5J1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2xvdycpIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdsb3ctcHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ21lZGl1bScpIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tcHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2hpZ2gnKSB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnaGlnaC1wcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZGF0ZScpXHJcbiAgICAgICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kYXRlXHJcbiAgICAgICAgICAgICAgICBlZGl0LmNsYXNzTGlzdC5hZGQoJ2VkaXQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIGljb24uc3JjID0gJy4vcGljcy9zcXVhcmUtZWRpdC1vdXRsaW5lLnN2ZydcclxuICAgICAgICAgICAgICAgIGVkaXQuYXBwZW5kQ2hpbGQoaWNvbilcclxuICAgICAgICAgICAgICAgIGVkaXRUYXNrLm9wZW5FZGl0RGlhbG9nKGVkaXQsIHRhc2spXHJcbiAgICAgICAgICAgICAgICBlZGl0VGFzay5zdWJtaXRFZGl0QnV0dG9uKHRhc2spXHJcbiAgICAgICAgICAgICAgICByZW1vdmUuY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9Eby5yZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LmRlbGV0ZVRhc2sodGFzay50aXRsZSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpY29uMi5zcmMgPSAnLi9waWNzL3RyYXNoLWNhbi1vdXRsaW5lLnN2ZydcclxuICAgICAgICAgICAgICAgIHJlbW92ZS5hcHBlbmRDaGlsZChpY29uMilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQobmFtZSlcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChkdWVEYXRlKVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChlZGl0KVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChyZW1vdmUpXHJcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZENoaWxkKHRvRG8pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7IGFkZFRhc2ssIGdldFRhc2tEaWFsb2cgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgbWFrZVRhc2sgPSB0YXNrKClcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXByb2plY3QnKVxyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kaWFsb2cnKVxyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpXHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbCcpXHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5UHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKVxyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZWRQcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWQnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IChmdW5jdGlvbigpIHsgLy9jcmVhdGUgZnVudGlvbmFsaXR5IGZvciBwcm9qZWN0IGRpYWxvZyBidXR0b25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByb2plY3QocHJvamVjdE5hbWVJbnB1dC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9Eb0xpc3QuZ2V0UHJvamVjdHMpXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdE5hbWUgPT0gJycpIHJldHVybiBhbGVydCgnUHJvamVjdCBOYW1lIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodG9Eb0xpc3QuZmluZFByb2plY3QocHJvamVjdE5hbWUpKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBhbHJlYWR5IGluIHVzZScpIC8vaWYgZmluZFByb2plY3QoKSBydW5zLCB0aGVuIGEgcHJvamVjdCB3aXRoIHRoYXQgbmFtZSBleGlzdHMgc28gZW5kIGxvb3BcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0TmFtZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0TmFtZSkgeyAvL2NyZWF0ZSBET00gZWxlbWVudCB3aXRoIHByb2plY3QgZGV0YWlscyBhbmQgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpIFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdC5zcmMgPSAnLi9waWNzL2RlbGV0ZS1mb3JldmVyLnN2ZydcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbUhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpIC8vd2lsbCByZXR1cm4gdGhlIHByb2plY3QgcmVsYXRlZCB0byB0aGUgbGlzdCBlbGVtZW50IHRvIHVzZSBhIGEgcGFyYW1ldGVyIGZvciBhbm90aGVyIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGVQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdExpc3RJdGVtSGVhZGVyLnRleHRDb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5yZW1vdmUoKSAvL3JlbW92ZXMgdGhlIGVsZW1lbnQgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gJydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpIC8vYWRkIHRoZSBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0cyBhcnJheVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbUhlYWRlcilcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0KVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RJdGVtKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVByb2plY3RUYXNrcyA9IGZ1bmN0aW9uKHRvRG9Db250ZW50LCB0YXNrcywgcHJvamVjdCkgeyAvL3dpbGwgaXRlcmF0ZSBvdmVyIHByb2plY3QncyB0YXNrcyBhcnJheSBhbmQgZGlzcGxheSB0aGVtIHRvIHRoZSBET01cclxuICAgICAgICAgICAgICAgIHRvRG9Db250ZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGFza3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFrZVRhc2suYWRkVGFzayhwcm9qZWN0LCB0YXNrc1tpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVByb2plY3REZXRhaWxzID0gZnVuY3Rpb24ocHJvamVjdCkgeyAvL3VwZGF0ZXMgcHJvamVjdCBoZWFkZXIgdG8gY2xpY2tlZCBwcm9qZWN0IHRpdGxlIGFuZCByZXBsYWNlcyBwcmV2aW91cyB0YXNrcyB3aXRoIHRoZSBuZXcgcHJvamVjdHMgdGFza3NcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdFxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0RvQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICAgICAgICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFrZVRhc2suZ2V0VGFza0RpYWxvZygpLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdFRhc2tzKHRvRG9Db250ZW50LCBwcm9qZWN0LnRhc2tzLCBwcm9qZWN0KSAvL2Rpc3BsYXlzIHRoZSBzZWxlY3RlZCBwcm9qZWN0J3MgdGFza3MgYXJyYXkgdXNpbmcgYSBmb3IgbG9vcFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9qZWN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZURlZmF1bHRQcm9qZWN0cyA9IChmdW5jdGlvbigpIHsgLy9hZGRzIGV2ZW50IGxpc3RlbmVycyB0aGF0IGdpdmUgYWNjZXNzIHRvIHRoZWlyIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBjbGFzc2VzXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHByaW9yaXR5UHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZFByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0KCdXb3JrJylcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdBbGwnKSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUYXNrID0gY3VycmVudFByb2plY3QuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAxJywgJ21lZGl1bScsICcyMDI0LTAyLTE0JylcclxuICAgICAgICAgICAgICAgIG1ha2VUYXNrLmFkZFRhc2soY3VycmVudFByb2plY3QsIGRlZmF1bHRUYXNrKVxyXG4gICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgfSkoKVxyXG5cclxuXHJcbiAgICB9KSgpXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coJ3Rlc3QgZGVtbycpXHJcbiAgICAvLyBjb25zb2xlLmxvZygndmFyaWFibGVzIGluaXRpYWxpemVkJylcclxuICAgIC8vIGNvbnN0IHByb2plY3Q0ID0gdG9Eb0xpc3QuY3JlYXRlUHJvamVjdCgnUHJvamVjdCA0JylcclxuICAgIC8vIGNvbnN0IHByb2plY3QxID0gdG9Eb0xpc3QuY3JlYXRlUHJvamVjdCgnUHJvamVjdCAxJylcclxuICAgIC8vIGNvbnNvbGUubG9nKHRvRG9MaXN0KVxyXG4gICAgLy8gY29uc3QgbW9kdWxlMSA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMScsICdkZXNjcmlwdGlvbicsICdIaWdoJywgJ3RvbW9ycm93JylcclxuICAgIC8vIGNvbnN0IG1vZHVsZTIgPSBwcm9qZWN0MS5jcmVhdGVUYXNrKCdDcmVhdGUgTW9kdWxlIDInLCAnZGVzY3JpcHRpb24nLCAnTWVkaXVtJywgJ3RvbW9ycm93JylcclxuICAgIC8vIGNvbnN0IG1vZHVsZTMgPSBwcm9qZWN0MS5jcmVhdGVUYXNrKCdDcmVhdGUgTW9kdWxlIDMnLCAnZGVzY3JpcHRpb24nLCAnTG93JywgJ3RvbW9ycm93JylcclxuICAgIC8vIGNvbnN0IG1vZHVsZTQgPSBwcm9qZWN0MS5jcmVhdGVUYXNrKCdDcmVhdGUgTW9kdWxlIDQnLCAnZGVzY3JpcHRpb24nLCAnSGlnaCcsICd0b21vcnJvdycpXHJcbiAgICAvLyBtb2R1bGU0LnNldENvbXBsZXRpb24gPSB0cnVlXHJcbiAgICAvLyBwcm9qZWN0MS5kZWxldGVUYXNrKG1vZHVsZTQudGl0bGUpXHJcbiAgICAvLyBtb2R1bGUyLnNldENvbXBsZXRpb24gPSB0cnVlXHJcbiAgICAvLyBtb2R1bGUxLnNldENvbXBsZXRpb24gPSB0cnVlXHJcbiAgICAvLyBjb25zb2xlLmxvZyhtb2R1bGUxLnNldFRpdGxlID0gJ2NyZWF0ZSBtb2R1bGUgMicpXHJcbiAgICAvLyB0b0RvTGlzdC5kZWxldGVQcm9qZWN0KHByb2plY3Q0Lm5hbWUpXHJcblxyXG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdDEudGFza3MpXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0b0RvTGlzdC5wcm9qZWN0cylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdwcmlvcml0eScsdG9Eb0xpc3QuZmluZFByb2plY3QoJ1ByaW9yaXR5JykudGFza3MpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnY29tcGxldGVkJywgdG9Eb0xpc3QuZmluZFByb2plY3QoJ0NvbXBsZXRlZCcpLnRhc2tzKVxyXG4gICAgXHJcbiAgICAvLyBjb25zdCBhZGRUb0FycmF5ID0gZnVuY3Rpb24odGFzaykgeyAvL2FkZHMgdGhlIHRhc2sgdG8gb25lIG9mIHRoZSBiZWxvdyBhcnJheXMgaWYgaXQgbWVldHMgYW55IG9mIHRoZSBjb25kaXRpb25zXHJcbiAgICAvLyAgICAgaWYodGFzay5wcmlvcml0eSA9PSAnSGlnaCcpIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdQcmlvcml0eScpLnRhc2tzLnB1c2godGFzaylcclxuICAgIC8vICAgICBpZih0YXNrLmNvbXBsZXRpb24gPT0gdHJ1ZSkgdG9Eb0xpc3QuZmluZFByb2plY3QoJ0NvbXBsZXRlZCcpLnRhc2tzLnB1c2godGFzaylcclxuICAgIC8vIH1cclxuICAgIC8vIGFkZFRvQXJyYXkobW9kdWxlMSlcclxuICAgIC8vIGFkZFRvQXJyYXkobW9kdWxlMilcclxuICAgIC8vIGFkZFRvQXJyYXkobW9kdWxlMylcclxuICAgIC8vIC8vIGFkZFRvQXJyYXkobW9kdWxlNClcclxuICAgIC8vIGNvbnNvbGUubG9nKCcnKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2FkZGVkIHRvIGFycmF5cycpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnJylcclxuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3QxLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3ByaW9yaXR5JywgdG9Eb0xpc3QuZmluZFByb2plY3QoJ1ByaW9yaXR5JykudGFza3MpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnY29tcGxldGVkJywgdG9Eb0xpc3QuZmluZFByb2plY3QoJ0NvbXBsZXRlZCcpLnRhc2tzKVxyXG4gICAgLy8gcmV0dXJuIHRvRG9MaXN0XHJcbn0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vY2xhc3Nlc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ0FsbCcpKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnUHJpb3JpdHknKSlcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ0NvbXBsZXRlZCcpKVxyXG4gICAgfVxyXG5cclxuY3JlYXRlUHJvamVjdChuYW1lKSB7IC8vY3JlYXRlIG5ldyBwcm9qZWN0IGNsYXNzIGFuZCBhZGQgaXQgdG8gdGhlIHByb2plY3QgYXJyYXlcclxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKVxyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpXHJcbn1cclxuXHJcbmdldCBnZXRQcm9qZWN0cygpIHsgLy9yZXR1cm4gdGhlIGFycmF5IHdpdGggYWxsIHByb2plY3RzXHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1xyXG59XHJcblxyXG5maW5kUHJvamVjdChuYW1lKSB7IC8vcmV0dXJuIGEgcHJvamVjdCBpbiB0aGUgcHJvamVjdCBhcnJheSB1c2luZyBhbiBpbnB1dHRlZCBwcm9qZWN0IG5hbWVcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSA9PSBuYW1lKVxyXG59XHJcblxyXG5kZWxldGVQcm9qZWN0KG5hbWUpIHsgLy9yZW1vdmVzIHRoZSBpbnB1dHRlZCBwcm9qZWN0IGJ5IHVzaW5nIHNwbGljZSB0byByZW1vdmUgdGhoIDEgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gcHJvamVjdCdzIGluZGV4XHJcbiAgICB0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YodGhpcy5maW5kUHJvamVjdChuYW1lKSksIDEpXHJcbn1cclxuXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlVG9Eb0xpc3QgZnJvbSBcIi4vbW9kdWxlcy9sb2dpY1wiO1xyXG5cclxuY29uc3QgdG9Eb0xpc3QgPSBjcmVhdGVUb0RvTGlzdCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9