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
    constructor(title, desc, priority, date) {
        this.title = title
        this.desc = desc
        this.priority= priority
        this.date = date
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
        this.date = date
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

function createToDo(title, desc, priority, date) {
    const task = new _classes__WEBPACK_IMPORTED_MODULE_0__.Task(title, desc, priority, date)
    return task
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

//organize all tasks based on when they are due, if they are important, and completion status

//DOM Logic
const screenController = function() {
    const projectList = document.querySelector('.project-list')
    const main = document.querySelector('.to-do-content')
    const projectForm = document.getElementById('create-project')
    const editTaskForm = document.getElementById('edit-task')
    const taskForm = document.getElementById('create-task')

    
    const openDialog = function(button, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.showModal()
        })
    }
    
    const cancelDialog = function(button, dialog, form) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            form.reset()
            dialog.close()
        })
    }

    const cancelEditDialog = function(button, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
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
                projectForm.reset()
            })
            
            cancelDialog(cancel, dialog, projectForm)
            
        }

        const createDefaultProjects = function() {
            const project1 = displayProject((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createProject)('Work'))
            return project1
        }
        
        const submitProject = function() {
            if (nameInput.value == '') return alert('Project Name cannot be empty')
            
            const project = ((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createProject)(nameInput.value))
            displayProject(project)
        }
        
        //display all projects from project array in the main section
        function displayProject(project) {
            const projectHeader = document.createElement('h2')
            projectHeader.textContent = project.name
            
            projectList.appendChild(projectHeader)
            return project
        }
        
        createButtons()
        createDefaultProjects()
    }
    
    //add task button that calls new task class to create a task
    const addNewTask = function() {
        const dialog = document.getElementById('task-dialog')
        const editDialog = document.getElementById('edit-dialog')
        const title = document.getElementById('task-title')
        const desc = document.getElementById('task-desc')
        const date = document.getElementById('task-date')
        const editSubmit = document.getElementById('edit-submit')
        
        
        const createButtons = function() {
            const addTask = document.getElementById('add-task')
            const cancel = document.getElementById('task-cancel')
            const editCancel = document.getElementById('edit-cancel')
            const submit = document.getElementById('task-submit')
            
            openDialog(addTask, dialog)
            
            cancelDialog(cancel, dialog, taskForm)
            
            cancelEditDialog(editCancel, editDialog)
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                if (title.value == '' || date.value == '') return alert('Text fields must be filled')
                submitTask()
                dialog.close()
            })

        }
        
        
        
        const createDefaultTasks = function() {
            const task1 = displayTask((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createToDo)('Create Module 1', 'Module 1 will contain application logic', 'medium', '2024-01-01'))
            tasks.push(task1)
        }
        
        const submitTask = function() {
            const priority = document.querySelector("input[name='task-priority']:checked").value
            
            const task = (0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createToDo)(title.value, desc, priority, date.value)
            tasks.push(task)
            displayTask(task)
            taskForm.reset()
        }
        
        const displayTask = function(task) {
            
            const editTask = function() {
                editDialog.showModal()
                console.log(currentTask)
                const editTitle = document.getElementById('edit-task-title')
                const editDesc = document.getElementById('edit-task-desc')
                const priority = document.getElementsByName('edit-task-priority')
                const editDate = document.getElementById('edit-task-date')
                editTitle.value = task.title
                priority.forEach((button) => {
                    if (button.value == task.priority) button.setAttribute('checked', 'checked')
                })
            editDate.value = task.date

            editSubmit.addEventListener('click', (event) => {
                event.preventDefault()
                console.log(currentTask)
            })
        }
        

        const currentTask = task
            // console.log(currentTask)
            const toDo = document.createElement('div')
            const check = document.createElement('div')
            const name = document.createElement('p')
            const priority = document.createElement('p')
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
            
            priority.classList.add('priority')
            priority.textContent = 'Priority'
            if (task.priority == 'low') priority.classList.add('low-priority')
            if (task.priority == 'medium') priority.classList.add('medium-priority')
            if (task.priority == 'high') priority.classList.add('high-priority')
            
            dueDate.classList.add('date')
            dueDate.textContent = task.date
            edit.classList.add('edit-button')
            icon.src = './pics/square-edit-outline.svg'
            edit.appendChild(icon)
            edit.addEventListener('click', editTask)
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

        createButtons()
        createDefaultTasks()
        //need module that will add a task specifically to the project currently in
        
        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvRG8iLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuICAgIFxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZGF0ZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgICAgICB0aGlzLnByaW9yaXR5PSBwcmlvcml0eVxyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldERlc2NyaXB0aW9uKGRlc2MpIHtcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldFByaW9yaXR5KHByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgIH0gIFxyXG4gICAgXHJcbiAgICAvLyBzZXQgaXNDb21wbGV0ZShjb21wbGV0ZSkge1xyXG4gICAgLy8gICAgIHRoaXMuaXNDb21wbGV0ZSA9IGNvbXBsZXRlXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3QsIFRhc2sgfSIsImltcG9ydCB7IFByb2plY3QsIFRhc2sgfSBmcm9tIFwiLi9jbGFzc2VzXCJcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpXHJcbiAgICByZXR1cm4gcHJvamVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb0RvKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZGF0ZSkge1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZGF0ZSlcclxuICAgIHJldHVybiB0YXNrXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9EbyB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL0FwcCBMb2dpY1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9EbyB9IGZyb20gXCIuL21vZHVsZXMvY3JlYXRlVG9Eb1wiXHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IFtdXHJcbmNvbnN0IHRhc2tzID0gW11cclxuXHJcbi8vb3JnYW5pemUgYWxsIHRhc2tzIGJhc2VkIG9uIHdoZW4gdGhleSBhcmUgZHVlLCBpZiB0aGV5IGFyZSBpbXBvcnRhbnQsIGFuZCBjb21wbGV0aW9uIHN0YXR1c1xyXG5cclxuLy9ET00gTG9naWNcclxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0JylcclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tY29udGVudCcpXHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtcHJvamVjdCcpXHJcbiAgICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrJylcclxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS10YXNrJylcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IG9wZW5EaWFsb2cgPSBmdW5jdGlvbihidXR0b24sIGRpYWxvZykge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGNhbmNlbERpYWxvZyA9IGZ1bmN0aW9uKGJ1dHRvbiwgZGlhbG9nLCBmb3JtKSB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgZm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYW5jZWxFZGl0RGlhbG9nID0gZnVuY3Rpb24oYnV0dG9uLCBkaWFsb2cpIHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vYWRkIHByb2plY3QgYnV0dG9uIHRoYXQgY2FsbHMgbmV3IHByb2plY3QgY2xhc3MgdG8gbWFrZSBwcm9qZWN0XHJcbiAgICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGlhbG9nJylcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJylcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXN1Ym1pdCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QnKVxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jYW5jZWwnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb3BlbkRpYWxvZyhhZGRQcm9qZWN0LCBkaWFsb2cpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIHN1Ym1pdFByb2plY3QoKVxyXG4gICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhbmNlbERpYWxvZyhjYW5jZWwsIGRpYWxvZywgcHJvamVjdEZvcm0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3JlYXRlRGVmYXVsdFByb2plY3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QxID0gZGlzcGxheVByb2plY3QoY3JlYXRlUHJvamVjdCgnV29yaycpKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdDFcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc3VibWl0UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlID09ICcnKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IChjcmVhdGVQcm9qZWN0KG5hbWVJbnB1dC52YWx1ZSkpXHJcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0KHByb2plY3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vZGlzcGxheSBhbGwgcHJvamVjdHMgZnJvbSBwcm9qZWN0IGFycmF5IGluIHRoZSBtYWluIHNlY3Rpb25cclxuICAgICAgICBmdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXHJcbiAgICAgICAgICAgIHByb2plY3RIZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNyZWF0ZUJ1dHRvbnMoKVxyXG4gICAgICAgIGNyZWF0ZURlZmF1bHRQcm9qZWN0cygpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vYWRkIHRhc2sgYnV0dG9uIHRoYXQgY2FsbHMgbmV3IHRhc2sgY2xhc3MgdG8gY3JlYXRlIGEgdGFza1xyXG4gICAgY29uc3QgYWRkTmV3VGFzayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRpYWxvZycpXHJcbiAgICAgICAgY29uc3QgZWRpdERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LWRpYWxvZycpXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpXHJcbiAgICAgICAgY29uc3QgZGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRlc2MnKVxyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcclxuICAgICAgICBjb25zdCBlZGl0U3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtc3VibWl0JylcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2snKVxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwnKVxyXG4gICAgICAgICAgICBjb25zdCBlZGl0Q2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtY2FuY2VsJylcclxuICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0JylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2coYWRkVGFzaywgZGlhbG9nKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FuY2VsRGlhbG9nKGNhbmNlbCwgZGlhbG9nLCB0YXNrRm9ybSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhbmNlbEVkaXREaWFsb2coZWRpdENhbmNlbCwgZWRpdERpYWxvZylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLnZhbHVlID09ICcnIHx8IGRhdGUudmFsdWUgPT0gJycpIHJldHVybiBhbGVydCgnVGV4dCBmaWVsZHMgbXVzdCBiZSBmaWxsZWQnKVxyXG4gICAgICAgICAgICAgICAgc3VibWl0VGFzaygpXHJcbiAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY3JlYXRlRGVmYXVsdFRhc2tzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2sxID0gZGlzcGxheVRhc2soY3JlYXRlVG9EbygnQ3JlYXRlIE1vZHVsZSAxJywgJ01vZHVsZSAxIHdpbGwgY29udGFpbiBhcHBsaWNhdGlvbiBsb2dpYycsICdtZWRpdW0nLCAnMjAyNC0wMS0wMScpKVxyXG4gICAgICAgICAgICB0YXNrcy5wdXNoKHRhc2sxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzdWJtaXRUYXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3Rhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gY3JlYXRlVG9Ebyh0aXRsZS52YWx1ZSwgZGVzYywgcHJpb3JpdHksIGRhdGUudmFsdWUpXHJcbiAgICAgICAgICAgIHRhc2tzLnB1c2godGFzaylcclxuICAgICAgICAgICAgZGlzcGxheVRhc2sodGFzaylcclxuICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkaXNwbGF5VGFzayA9IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0RGlhbG9nLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGFzaylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stdGl0bGUnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdERlc2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWRlc2MnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZWRpdC10YXNrLXByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXREYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtdGFzay1kYXRlJylcclxuICAgICAgICAgICAgICAgIGVkaXRUaXRsZS52YWx1ZSA9IHRhc2sudGl0bGVcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5LmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidXR0b24udmFsdWUgPT0gdGFzay5wcmlvcml0eSkgYnV0dG9uLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGVkaXREYXRlLnZhbHVlID0gdGFzay5kYXRlXHJcblxyXG4gICAgICAgICAgICBlZGl0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGFzaylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYXNrID0gdGFza1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50VGFzaylcclxuICAgICAgICAgICAgY29uc3QgdG9EbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgY29uc3QgaWNvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKCd0by1kbycpXHJcbiAgICAgICAgICAgIGNoZWNrLmNsYXNzTGlzdC5hZGQoJ2NoZWNrbWFyaycpXHJcbiAgICAgICAgICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LnRvZ2dsZSgnY2hlY2tlZCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIG5hbWUuY2xhc3NMaXN0LmFkZCgndG8tZG8tbmFtZScpXHJcbiAgICAgICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpXHJcbiAgICAgICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gJ1ByaW9yaXR5J1xyXG4gICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnbG93JykgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbG93LXByaW9yaXR5JylcclxuICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ21lZGl1bScpIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09ICdoaWdoJykgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnaGlnaC1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxyXG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kYXRlXHJcbiAgICAgICAgICAgIGVkaXQuY2xhc3NMaXN0LmFkZCgnZWRpdC1idXR0b24nKVxyXG4gICAgICAgICAgICBpY29uLnNyYyA9ICcuL3BpY3Mvc3F1YXJlLWVkaXQtb3V0bGluZS5zdmcnXHJcbiAgICAgICAgICAgIGVkaXQuYXBwZW5kQ2hpbGQoaWNvbilcclxuICAgICAgICAgICAgZWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRUYXNrKVxyXG4gICAgICAgICAgICByZW1vdmUuY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWJ1dHRvbicpXHJcbiAgICAgICAgICAgIHJlbW92ZS5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCBcInJldHVybiB0aGlzLnBhcmVudE5vZGUucmVtb3ZlKCk7XCIpXHJcbiAgICAgICAgICAgIGljb24yLnNyYyA9ICcuL3BpY3MvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJ1xyXG4gICAgICAgICAgICByZW1vdmUuYXBwZW5kQ2hpbGQoaWNvbjIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGNoZWNrKVxyXG4gICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKG5hbWUpXHJcbiAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQocHJpb3JpdHkpXHJcbiAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcclxuICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChlZGl0KVxyXG4gICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKHJlbW92ZSlcclxuICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZCh0b0RvKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQnV0dG9ucygpXHJcbiAgICAgICAgY3JlYXRlRGVmYXVsdFRhc2tzKClcclxuICAgICAgICAvL25lZWQgbW9kdWxlIHRoYXQgd2lsbCBhZGQgYSB0YXNrIHNwZWNpZmljYWxseSB0byB0aGUgcHJvamVjdCBjdXJyZW50bHkgaW5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9hbGwgdGFza3Mgc2VjdGlvbiB0aGF0IGRpc3BsYXlzIGFsbCB0YXNrIGFycmF5IGVsZW1lbnRzIGZyb20gYWxsIHByb2plY3RzXHJcbiAgICBcclxuICAgIC8vb3RoZXIgdGFicyB0aGF0IGRpc3BsYXkgdGFza3MgZnJvbSBhbGwgcHJvamVjdHMgYmFzZWQgb24gc29tZSBjcml0ZXJpYVxyXG4gICAgXHJcbiAgICBhZGROZXdQcm9qZWN0KClcclxuICAgIGFkZE5ld1Rhc2soKVxyXG59XHJcblxyXG5zY3JlZW5Db250cm9sbGVyKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=