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
    
    createTask(title, desc, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, desc, priority, dueDate)
        this.tasks.push(task)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, desc, priority, dueDate) {
        this.title = title
        this.desc = desc
        this.priority= priority
        this.dueDate = dueDate
        this.isComplete = 0
    }

    set setTitle(title) {
        this.title = title
    }   

    set setDescription(desc) {
        this.desc = desc
    }   

    set setPriority(priority) {
        this.priority = priority
    }   

    set setDate(date) {
        this.dueDate = date
    }  
    
    // set isComplete(complete) {
    //     this.isComplete = complete
    // }
}



/***/ }),

/***/ "./src/modules/createToDo":
/*!********************************!*\
  !*** ./src/modules/createToDo ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProject: () => (/* binding */ createProject),
/* harmony export */   createToDo: () => (/* binding */ createToDo)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./src/modules/classes.js");


function createProject(name) {
    const project = new _classes__WEBPACK_IMPORTED_MODULE_0__.Project(name)
    return project
}

function createToDo(title, desc, priority, dueDate) {
    const task = new _classes__WEBPACK_IMPORTED_MODULE_0__.Task(title, desc, priority, dueDate)
    return task
}

function editToDo(task) {
    
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
/* harmony import */ var _modules_createToDo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/createToDo */ "./src/modules/createToDo");
//App Logic




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
            
            projects.push((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createProject)(projectName))
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
                
                tasks.push((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createToDo)(title, desc, taskPriority, date))
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUN5QztBQUN6QztBQUNBO0FBQ0Esd0JBQXdCLDZDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNoQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrRUFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvRG8iLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuICAgIFxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgICAgICB0aGlzLnByaW9yaXR5PSBwcmlvcml0eVxyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldERlc2NyaXB0aW9uKGRlc2MpIHtcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldFByaW9yaXR5KHByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGVcclxuICAgIH0gIFxyXG4gICAgXHJcbiAgICAvLyBzZXQgaXNDb21wbGV0ZShjb21wbGV0ZSkge1xyXG4gICAgLy8gICAgIHRoaXMuaXNDb21wbGV0ZSA9IGNvbXBsZXRlXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3QsIFRhc2sgfSIsImltcG9ydCB7IFByb2plY3QsIFRhc2sgfSBmcm9tIFwiLi9jbGFzc2VzXCJcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpXHJcbiAgICByZXR1cm4gcHJvamVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb0RvKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSlcclxuICAgIHJldHVybiB0YXNrXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVkaXRUb0RvKHRhc2spIHtcclxuICAgIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9EbyB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL0FwcCBMb2dpY1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9EbyB9IGZyb20gXCIuL21vZHVsZXMvY3JlYXRlVG9Eb1wiXHJcblxyXG5cclxuY29uc3QgcHJvamVjdHMgPSBbXVxyXG5jb25zdCB0YXNrcyA9IFtdXHJcblxyXG4gIFxyXG4vLyBwcm9qZWN0cy5wdXNoKGNyZWF0ZVByb2plY3QoJ1RvIGRvIGxpc3QnKSlcclxuLy8gY29uc29sZS5sb2cocHJvamVjdHNbMF0pXHJcbi8vIHByb2plY3RzWzBdLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMScsICdNYWtlIHRoZSBhcHAgbG9naWMnICwnSGlnaCcgLCdUb21vcnJvdycpXHJcbi8vIHByb2plY3RzWzBdLnRhc2tzWzBdLnNldFRpdGxlID0gJ2JybydcclxuLy8gY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3MpXHJcblxyXG4vL29yZ2FuaXplIGFsbCB0YXNrcyBiYXNlZCBvbiB3aGVuIHRoZXkgYXJlIGR1ZSwgaWYgdGhleSBhcmUgaW1wb3J0YW50LCBhbmQgY29tcGxldGlvbiBzdGF0dXNcclxuXHJcblxyXG4vL0RPTSBMb2dpY1xyXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKVxyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuXHJcbiAgICBjb25zdCBvcGVuRGlhbG9nID0gZnVuY3Rpb24oYnV0dG9uLCBkaWFsb2cpIHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBjYW5jZWxEaWFsb2cgPSBmdW5jdGlvbihidXR0b24sIGlucHV0LCBkaWFsb2cpIHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICByZXNldERpYWxvZyhpbnB1dCwgZGlhbG9nKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHJlc2V0RGlhbG9nID0gZnVuY3Rpb24oaW5wdXQsIGRpYWxvZykge1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gJydcclxuICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8vYWRkIHByb2plY3QgYnV0dG9uIHRoYXQgY2FsbHMgbmV3IHByb2plY3QgY2xhc3MgdG8gbWFrZSBwcm9qZWN0XHJcbiAgICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGlhbG9nJylcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJylcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXN1Ym1pdCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QnKVxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jYW5jZWwnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb3BlbkRpYWxvZyhhZGRQcm9qZWN0LCBkaWFsb2cpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIHN1Ym1pdFByb2plY3QoKVxyXG4gICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhbmNlbERpYWxvZyhjYW5jZWwsIG5hbWVJbnB1dCwgZGlhbG9nKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc3VibWl0UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdE5hbWUgPSBuYW1lSW5wdXQudmFsdWVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PSAnJykgcmV0dXJuIGFsZXJ0KCdQcm9qZWN0IE5hbWUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHByb2plY3RzLnB1c2goY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSkpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKVxyXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdChwcm9qZWN0TmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9kaXNwbGF5IGFsbCBwcm9qZWN0cyBmcm9tIHByb2plY3QgYXJyYXkgaW4gdGhlIG1haW4gc2VjdGlvblxyXG4gICAgICAgIGZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXHJcbiAgICAgICAgICAgIHByb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZVxyXG5cclxuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdClcclxuICAgICAgICAgICAgcmVzZXREaWFsb2cobmFtZUlucHV0LCBkaWFsb2cpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgY3JlYXRlQnV0dG9ucygpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vYWRkIHRhc2sgYnV0dG9uIHRoYXQgY2FsbHMgbmV3IHRhc2sgY2xhc3MgdG8gY3JlYXRlIGEgdGFza1xyXG4gICAgY29uc3QgYWRkTmV3VGFzayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRpYWxvZycpXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpXHJcbiAgICAgICAgY29uc3QgZGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRlc2MnKVxyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2snKVxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwnKVxyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1zdWJtaXQnKVxyXG5cclxuICAgICAgICAgICAgb3BlbkRpYWxvZyhhZGRUYXNrLCBkaWFsb2cpXHJcbiAgICBcclxuICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygneWVzcycpXHJcbiAgICAgICAgICAgICAgICByZXNldERpYWxvZygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRUYXNrKClcclxuICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXRUYXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGl0bGUudmFsdWUgPT0gJycgfHwgZGVzYy52YWx1ZSA9PSAnJyB8fCBkYXRlLnZhbHVlID09ICcnKSByZXR1cm4gYWxlcnQoJ1RleHQgZmllbGRzIG11c3QgYmUgZmlsbGVkJylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpdGxlKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd0YXNrLXByaW9yaXR5J106Y2hlY2tlZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0YXNrcy5wdXNoKGNyZWF0ZVRvRG8odGl0bGUsIGRlc2MsIHRhc2tQcmlvcml0eSwgZGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5VGFzayh0aXRsZSwgZGVzYywgdGFza1ByaW9yaXR5LCBkYXRlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5VGFzaz0gZnVuY3Rpb24odGl0bGUsIGRlc2MsIHRhc2tQcmlvcml0eSwgZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG9EbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcblxyXG4gICAgICAgICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKCd0by1kbycpXHJcbiAgICAgICAgICAgICAgICBjaGVjay5zcmMgPSAnLi9waWNzL2NoZWNrIGljb24ucG5nJ1xyXG4gICAgICAgICAgICAgICAgY2hlY2suYWx0ID0nY2hlY2tib3gnXHJcbiAgICAgICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5hZGQoJ3RvLWRvLW5hbWUnKVxyXG4gICAgICAgICAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IHRpdGxlLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSAnUHJpb3JpdHknXHJcbiAgICAgICAgICAgICAgICBpZiAodGFza1ByaW9yaXR5ID09ICdsb3cnKSBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdsb3ctcHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA9PSAnbWVkaXVtJykgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbWVkaXVtLXByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrUHJpb3JpdHkgPT0gJ2hpZ2gnKSBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdoaWdoLXByaW9yaXR5JylcclxuXHJcbiAgICAgICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxyXG4gICAgICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGRhdGUudmFsdWVcclxuICAgICAgICAgICAgICAgIGVkaXQuY2xhc3NMaXN0LmFkZCgnZWRpdC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSAnLi9waWNzL3NxdWFyZS1lZGl0LW91dGxpbmUuc3ZnJ1xyXG4gICAgICAgICAgICAgICAgZWRpdC5hcHBlbmRDaGlsZChpY29uKVxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgaWNvbjIuc3JjID0gJy4vcGljcy90cmFzaC1jYW4tb3V0bGluZS5zdmcnXHJcbiAgICAgICAgICAgICAgICByZW1vdmUuYXBwZW5kQ2hpbGQoaWNvbjIpXHJcblxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQobmFtZSlcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQocHJpb3JpdHkpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGR1ZURhdGUpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGVkaXQpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKHJlbW92ZSlcclxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodG9EbylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL25lZWQgbW9kdWxlIHRoYXQgd2lsbCBhZGQgYSB0YXNrIHNwZWNpZmljYWxseSB0byB0aGUgcHJvamVjdCBjdXJyZW50bHkgaW5cclxuXHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgcmVzZXREaWFsb2cgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVCdXR0b25zKClcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9hbGwgdGFza3Mgc2VjdGlvbiB0aGF0IGRpc3BsYXlzIGFsbCB0YXNrIGFycmF5IGVsZW1lbnRzIGZyb20gYWxsIHByb2plY3RzXHJcbiAgICBcclxuICAgIC8vb3RoZXIgdGFicyB0aGF0IGRpc3BsYXkgdGFza3MgZnJvbSBhbGwgcHJvamVjdHMgYmFzZWQgb24gc29tZSBjcml0ZXJpYVxyXG4gICAgXHJcbiAgICBhZGROZXdQcm9qZWN0KClcclxuICAgIGFkZE5ld1Rhc2soKVxyXG59XHJcblxyXG5zY3JlZW5Db250cm9sbGVyKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=