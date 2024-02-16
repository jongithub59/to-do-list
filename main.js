/******/ (() => { // webpackBootstrap
/******/ 	'use strict'
  /******/ 	const __webpack_modules__ = ({

    /***/ './src/modules/classes.js':
    /*! ********************************!*\
  !*** ./src/modules/classes.js ***!
  \********************************/
    /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__)
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Project: () => (/* binding */ Project),
        /* harmony export */ Task: () => (/* binding */ Task)
        /* harmony export */ })
      class Project {
        constructor (name) {
          this.name = name
          this.tasks = []
        }

        set setName (name) {
          this.name = name
        }

        get getName () {
          return this.name
        }

        set setTasks (tasks) {
          this.tasks = tasks
        }

        get getTasks () {
          return this.tasks
        }

        createTask (title, priority, dueDate) { // create a new task and add it to this project's task list
          const task = new Task(title, priority, dueDate)
          this.tasks.push(task)
          return task
        }

        addTaskToProject (task) {
          this.tasks.push(task)
        }

        findTask (title) {
          return this.tasks.find((task) => task.getTitle == title)
        }

        deleteTask (taskTitle) { // removes inputted task from the tasks array by replacing the array with one that excludes the task title given
          this.tasks = this.tasks.filter(task => task.title !== taskTitle)
        }
      }

      // create new task class/object with title, description, priority, and due date collected from the user and add to the task array
      class Task {
        constructor (title, priority, date) { // initialize values from dialog input
          this.title = title
          // this.desc = desc
          this.priority = priority
          this.date = date
          this.completion = false
        }

        set setTitle (title) { // set task title to inputted title name
          this.title = title
        }

        get getTitle () { // return the task title
          return this.title
        }

        set setDescription (desc) {
          this.desc = desc
        }

        set setPriority (priority) {
          this.priority = priority
        }

        get getPriority () {
          return this.priority
        }

        set setDate (date) {
          this.date = date
        }

        get getDate () {
          return this.date
        }

        set setCompletion (completion) {
          this.completion = completion
        }
      }
      /***/ },

    /***/ './src/modules/logic.js':
    /*! ******************************!*\
  !*** ./src/modules/logic.js ***!
  \******************************/
    /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__)
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => (/* binding */ createToDoList)
        /* harmony export */ })
      /* harmony import */ const _toDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDoList */ './src/modules/toDoList.js')

      function createToDoList () {
        const toDoList = new _toDoList__WEBPACK_IMPORTED_MODULE_0__.default()

        const screenController = (function () {
        // set global variables
          const main = document.querySelector('.to-do-content')
          const projectList = document.querySelector('.project-list')
          const projectTitle = document.getElementById('to-do-title')
          const toDoContent = document.querySelector('.to-do-content')
          const editDialog = document.getElementById('edit-dialog')
          const editForm = document.getElementById('edit-task')
          const editSubmit = document.getElementById('edit-submit')
          const editTitle = document.getElementById('edit-task-title')
          const editDesc = document.getElementById('edit-task-desc')
          const editPriority = document.getElementsByName('edit-task-priority')
          const editDate = document.getElementById('edit-task-date')
          const editCancel = document.getElementById('edit-cancel')
          let currentProject = ''
          let currentTask = ''

          const taskFunctions = function () {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const priority = document.getElementsByName('task-priority')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')

            const getTaskDialog = function () { // returns the dialog for adding tasks for use elsewhere
              return dialog
            }

            const createButtons = (function () {
              const submit = document.getElementById('task-submit')
              const cancel = document.getElementById('task-cancel')

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

            const validateTask = function () { // ensures input fields are filled and no repeat names used
              if (title.value == '') return alert('Title cannot be empty')
              if (currentProject.findTask(title.value)) return alert('Task Name already in use')
              if (!document.querySelector("input[name='task-priority']:checked")) return alert('Priority cannot be unselected')
              if (date.value == '') return alert('Date cannot be empty')
              const priority = document.querySelector("input[name='task-priority']:checked").value

              const task = currentProject.createTask(title.value, priority, date.value)

              addTask(currentProject, task)
            }

            const cancelEdit = (function () { // close dialog and reset input fields
              editCancel.addEventListener('click', (e) => {
                e.preventDefault()
                editForm.reset()
                editDialog.close()
              })
            })()

            editSubmit.addEventListener('click', (e) => {
              e.preventDefault()
              validateEditTask(editTitle.value, editDate.value, currentTask)
              editDialog.close()
              editForm.reset()
            })

            const openEditDialog = (button, task) => {
              button.addEventListener('click', (e) => {
                e.preventDefault()
                console.log(task)
                showEditDetails(task)
              })
            }

            const showEditDetails = function (task) { // opens edit pop up window and fills placeholder content with the current task details
              editDialog.showModal()
              editTitle.value = task.title
              console.log(editTitle.value)
              editPriority.forEach((button) => {
                if (button.value == task.priority) button.setAttribute('checked', 'checked')
              })
              editDate.value = task.date
              currentTask = currentProject.findTask(task.title) // sets clicked task as the active task in the program for easy access
            }

            const validateEditTask = function (editTitle, editDate, task) { // new variables for new values for the task created for clarity
              if (editTitle == '') return alert('Title cannot be empty')
              if (editDate == '') return alert('Date cannot be empty')

              const newTitle = editTitle
              const newPriority = document.querySelector("input[name='edit-task-priority']:checked").value
              const newDate = editDate

              editTask(newTitle, newPriority, newDate, task)
            }

            const editTask = function (newTitle, newPriority, newDate, task) { // task class properties changed and ready to be sent for updating
              task.setTitle = newTitle
              task.setPriority = newPriority
              task.setDate = newDate
              updateTask()
            }

            const updateTask = function () { // clears task area repopulates it with updated task info of the active project
              toDoContent.innerHTML = ''
              for (const i in currentProject.tasks) {
                addTask(currentProject, currentProject.tasks[i])
              }
            }

            const addTask = function (currentProject, task) { // create DOM elements for to do list item and populate with task class properties
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
              if (task.completion == true) check.classList.add('checked') // prechecks the checkbox when repopulating if it was checked before
              check.addEventListener('click', () => {
                check.classList.toggle('checked')
                if (task.completion == true) return task.setCompletion = false
                if (task.completion == false) return task.setCompletion = true
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
              openEditDialog(edit, task)

              remove.classList.add('delete-button')
              remove.addEventListener('click', () => { // removes task DOM element from the page and from project array if clicked
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

          const project = (function () {
            const makeTask = taskFunctions()
            const projectForm = document.getElementById('create-project')
            const dialog = document.getElementById('project-dialog')
            const projectNameInput = document.getElementById('project-name')
            const allProjects = document.getElementById('all')
            const priorityProjects = document.getElementById('priority')
            const completedProjects = document.getElementById('completed')

            const createButtons = (function () { // create funtionality for project dialog buttons
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

            const validateProject = function (projectName) {
              if (projectName == '') return alert('Project Name cannot be empty')
              if (toDoList.findProject(projectName)) return alert('Project Name already in use') // if findProject() runs, then a project with that name exists so end loop

              addProject(projectName)
            }

            const addProject = function (projectName) { // create DOM element with project details and functions
              const projectListItem = document.createElement('div')
              const projectListItemHeader = document.createElement('h2')
              const deleteProject = document.createElement('img')
              deleteProject.src = './pics/delete-forever.svg'
              projectListItemHeader.textContent = projectName

              projectListItemHeader.addEventListener('click', (e) => {
                console.log(toDoList.findProject(e.target.textContent)) // will return the project related to the list element to use a a parameter for another element
                displayProjectDetails(toDoList.findProject(e.target.textContent))
              })

              deleteProject.addEventListener('click', () => {
                toDoList.findProject(projectName).tasks = []
                toDoList.deleteProject(projectListItemHeader.textContent)
                projectListItem.remove() // removes the element from the DOM
                projectTitle.textContent = ''
                toDoContent.innerHTML = ''
              })

              toDoList.createProject(projectName) // add the project to the projects array
              projectListItem.appendChild(projectListItemHeader)
              projectListItem.appendChild(deleteProject)
              projectList.appendChild(projectListItem)
            }

            const displayProjectTasks = function (toDoContent, tasks, project) { // will iterate over project's tasks array and display them to the DOM
              toDoContent.innerHTML = ''
              for (const i in tasks) {
                makeTask.addTask(project, tasks[i])
              }
            }

            const displayProjectDetails = function (project) { // updates project header to clicked project title and replaces previous tasks with the new projects tasks
              currentProject = project
              const addTask = document.getElementById('add-task')
              addTask.classList.remove('hidden')
              const toDoContent = document.querySelector('.to-do-content')
              addTask.addEventListener('click', () => {
                makeTask.getTaskDialog().showModal()
              })
              projectTitle.textContent = project.name
              displayProjectTasks(toDoContent, project.tasks, project) // displays the selected project's tasks array using a for loop
              return currentProject
            }

            const displayDefaultProjectDetails = function (project) { // same as displayProjectDetails but calls unique functions to display all tasks that meet a certain condition
              currentProject = project
              projectTitle.textContent = project.name
              document.getElementById('add-task').classList.add('hidden')

              if (project.name == 'All') getAllTasks(toDoList.projects, project)
              if (project.name == 'Priority') getPriorityTasks(toDoList.projects, project)
              if (project.name == 'Completed') getCompletedTasks(toDoList.projects, project)

              displayDefaultProjectTasks(toDoContent, project.tasks, project)
            }

            const displayDefaultProjectTasks = function (toDoContent, tasks, project) { // will iterate over project's tasks array and display them to the DOM then resets the array for next time
              toDoContent.innerHTML = ''
              for (const i in tasks) {
                makeTask.addTask(project, tasks[i])
              }
              project.tasks = []
            }

            // go through each project, check that each task array within in each project contains tasks, then add every task to the "All" project tasks
            const getAllTasks = function (projects, project) {
              for (const i in projects) {
                if (projects[i].tasks != '') {
                  for (const j in projects[i].tasks) {
                    project.addTaskToProject(projects[i].tasks[j])
                  }
                }
              }
            }

            // go through each project, check that each task array within in each project contains tasks, then add every task that has a priority of "high" to the "Priority" project tasks
            const getPriorityTasks = function (projects, project) {
              for (const i in projects) {
                if (projects[i].tasks != '') {
                  for (const j in projects[i].tasks) {
                    if (projects[i].tasks[j].priority == 'high') project.addTaskToProject(projects[i].tasks[j])
                  }
                }
              }
            }

            const getCompletedTasks = function (projects, project) { // go through each project, check that each task array within in each project contains tasks, then add every task that is conpleted to the "Completed" project tasks
              for (const i in projects) {
                if (projects[i].tasks != '') {
                  for (const j in projects[i].tasks) {
                    if (projects[i].tasks[j].completion == true) project.addTaskToProject(projects[i].tasks[j])
                  }
                }
              }
            }

            const createDefaultProjects = (function () { // creates premade projects with tasks and adds event listeners that give access to their corresponding project classes
              allProjects.addEventListener('click', (e) => {
                displayDefaultProjectDetails(toDoList.findProject(e.target.textContent))
              })

              priorityProjects.addEventListener('click', (e) => {
                displayDefaultProjectDetails(toDoList.findProject(e.target.textContent))
              })

              completedProjects.addEventListener('click', (e) => {
                displayDefaultProjectDetails(toDoList.findProject(e.target.textContent))
              })

              addProject('Work')
              currentProject = displayProjectDetails(toDoList.findProject('Work'))
              currentProject.createTask('Create Module 1', 'medium', '2024-02-14')
              currentProject.createTask('Talk to manager', 'medium', '2024-02-14')
              currentProject.createTask('Meet with team', 'high', '2024-02-14')
              displayProjectTasks(toDoContent, currentProject.tasks, currentProject)
              addProject('Home')
              toDoList.findProject('Home').createTask('Do laundry', 'low', '2024-02-16')
              toDoList.findProject('Home').createTask('Do the dishes', 'medium', '2024-02-16')
              toDoList.findProject('Home').createTask('Prepare meals for the week', 'high', '2024-02-14')
              toDoList.findProject('Home').createTask('Training', 'high', '2024-02-16')
            })()
          })()
        })()
      }
      /***/ },

    /***/ './src/modules/toDoList.js':
    /*! *********************************!*\
  !*** ./src/modules/toDoList.js ***!
  \*********************************/
    /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__)
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => (/* binding */ ToDoList)
        /* harmony export */ })
      /* harmony import */ const _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ './src/modules/classes.js')

      class ToDoList {
        constructor () {
          this.projects = []
          this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('All'))
          this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('Priority'))
          this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('Completed'))
        }

        createProject (name) { // create new project class and add it to the project array
          const project = new _classes__WEBPACK_IMPORTED_MODULE_0__.Project(name)
          this.projects.push(project)
        }

        get getProjects () { // return the array with all projects
          return this.projects
        }

        findProject (name) { // return a project in the project array using an inputted project name
          return this.projects.find((project) => project.getName == name)
        }

        deleteProject (name) { // removes the inputted project by using splice to remove thh 1 element at the given project's index
          this.projects.splice(this.projects.indexOf(this.findProject(name)), 1)
        }
      }
      /***/ }

    /******/ 	})
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	const __webpack_module_cache__ = {}
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__ (moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		const cachedModule = __webpack_module_cache__[moduleId]
    /******/ 		if (cachedModule !== undefined) {
      /******/ 			return cachedModule.exports
      /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		const module = __webpack_module_cache__[moduleId] = {
      /******/ 			// no module.id needed
      /******/ 			// no module.loaded needed
      /******/ 			exports: {}
      /******/ 		}
    /******/
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__)
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports
    /******/ 	}
  /******/
  /************************************************************************/
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
      /******/ 			for (const key in definition) {
        /******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
          /******/ 				}
        /******/ 			}
      /******/ 		}
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
      /******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
        /******/ 			}
      /******/ 			Object.defineProperty(exports, '__esModule', { value: true })
      /******/ 		}
    /******/ 	})()
  /******/
  /************************************************************************/
  const __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*! **********************!*\
  !*** ./src/index.js ***!
  \**********************/
    __webpack_require__.r(__webpack_exports__)
    /* harmony import */ const _modules_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/logic */ './src/modules/logic.js')

    const UI = (0, _modules_logic__WEBPACK_IMPORTED_MODULE_0__.default)()
  })()
/******/ })()

// # sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUN0Qix3QkFBd0IsNkNBQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ051QztBQUN2QztBQUNBLFdBQVcsMERBQVEsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9jbGFzc2VzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0TmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRhc2tzKHRhc2tzKSB7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdldFRhc2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgICAgIHJldHVybiB0YXNrXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFza1RvUHJvamVjdCh0YXNrKSB7XHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBmaW5kVGFzayh0aXRsZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUgPT0gdGl0bGUpXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzayh0YXNrVGl0bGUpIHsgLy9yZW1vdmVzIGlucHV0dGVkIHRhc2sgZnJvbSB0aGUgdGFza3MgYXJyYXkgYnkgcmVwbGFjaW5nIHRoZSBhcnJheSB3aXRoIG9uZSB0aGF0IGV4Y2x1ZGVzIHRoZSB0YXNrIHRpdGxlIGdpdmVuXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay50aXRsZSAhPT0gdGFza1RpdGxlKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBwcmlvcml0eSwgZGF0ZSkgeyAvL2luaXRpYWxpemUgdmFsdWVzIGZyb20gZGlhbG9nIGlucHV0XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICAgICAgLy8gdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgICAgICB0aGlzLmNvbXBsZXRpb24gPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXRUaXRsZSh0aXRsZSkgeyAvLyBzZXQgdGFzayB0aXRsZSB0byBpbnB1dHRlZCB0aXRsZSBuYW1lXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICB9ICAgXHJcblxyXG4gICAgZ2V0IGdldFRpdGxlKCkgeyAvL3JldHVybiB0aGUgdGFzayB0aXRsZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldERlc2NyaXB0aW9uKGRlc2MpIHtcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldFByaW9yaXR5KHByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBnZXQgZ2V0UHJpb3JpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHlcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgfSAgXHJcblxyXG4gICAgZ2V0IGdldERhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXRDb21wbGV0aW9uKGNvbXBsZXRpb24pIHtcclxuICAgICAgICB0aGlzLmNvbXBsZXRpb24gPSBjb21wbGV0aW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3QsIFRhc2sgfSIsImltcG9ydCBUb0RvTGlzdCBmcm9tIFwiLi90b0RvTGlzdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVG9Eb0xpc3QoKSB7XHJcbiAgICBjb25zdCB0b0RvTGlzdCA9IG5ldyBUb0RvTGlzdFxyXG4gICAgXHJcbiAgICBjb25zdCBzY3JlZW5Db250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vc2V0IGdsb2JhbCB2YXJpYWJsZXNcclxuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWNvbnRlbnQnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvLWRvLXRpdGxlJylcclxuICAgICAgICBjb25zdCB0b0RvQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICBjb25zdCBlZGl0RGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtZGlhbG9nJylcclxuICAgICAgICBjb25zdCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2snKVxyXG4gICAgICAgIGNvbnN0IGVkaXRTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1zdWJtaXQnKVxyXG4gICAgICAgIGNvbnN0IGVkaXRUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stdGl0bGUnKVxyXG4gICAgICAgIGNvbnN0IGVkaXREZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtdGFzay1kZXNjJylcclxuICAgICAgICBjb25zdCBlZGl0UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZWRpdC10YXNrLXByaW9yaXR5JylcclxuICAgICAgICBjb25zdCBlZGl0RGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stZGF0ZScpXHJcbiAgICAgICAgY29uc3QgZWRpdENhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LWNhbmNlbCcpXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gJydcclxuICAgICAgICBsZXQgY3VycmVudFRhc2sgPSAnJ1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHRhc2tGdW5jdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXRhc2snKVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJylcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgndGFzay1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjJylcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRhdGUnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGdldFRhc2tEaWFsb2cgPSBmdW5jdGlvbigpIHsgLy9yZXR1cm5zIHRoZSBkaWFsb2cgZm9yIGFkZGluZyB0YXNrcyBmb3IgdXNlIGVsc2V3aGVyZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpYWxvZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVCdXR0b25zID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNhbmNlbCcpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRhc2sodGl0bGUudmFsdWUsIHByaW9yaXR5LCBkYXRlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSgpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZVRhc2sgPSBmdW5jdGlvbigpIHsgLy9lbnN1cmVzIGlucHV0IGZpZWxkcyBhcmUgZmlsbGVkIGFuZCBubyByZXBlYXQgbmFtZXMgdXNlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLnZhbHVlID09ICcnICkgcmV0dXJuIGFsZXJ0KCdUaXRsZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQcm9qZWN0LmZpbmRUYXNrKHRpdGxlLnZhbHVlKSkgcmV0dXJuIGFsZXJ0KCdUYXNrIE5hbWUgYWxyZWFkeSBpbiB1c2UnKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0ndGFzay1wcmlvcml0eSddOmNoZWNrZWRcIikpICByZXR1cm4gYWxlcnQoJ1ByaW9yaXR5IGNhbm5vdCBiZSB1bnNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgIGlmIChkYXRlLnZhbHVlID09ICcnKSByZXR1cm4gYWxlcnQoJ0RhdGUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3Rhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGN1cnJlbnRQcm9qZWN0LmNyZWF0ZVRhc2sodGl0bGUudmFsdWUsIHByaW9yaXR5LCBkYXRlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVGFzayhjdXJyZW50UHJvamVjdCwgdGFzaylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsRWRpdCA9IChmdW5jdGlvbigpIHsvL2Nsb3NlIGRpYWxvZyBhbmQgcmVzZXQgaW5wdXQgZmllbGRzXHJcbiAgICAgICAgICAgICAgICBlZGl0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBlZGl0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdERpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSgpXHJcblxyXG4gICAgICAgICAgICBlZGl0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFZGl0VGFzayhlZGl0VGl0bGUudmFsdWUsIGVkaXREYXRlLnZhbHVlLCBjdXJyZW50VGFzaylcclxuICAgICAgICAgICAgICAgIGVkaXREaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgZWRpdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3BlbkVkaXREaWFsb2cgPSAoYnV0dG9uLCB0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2spXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0VkaXREZXRhaWxzKHRhc2spXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgc2hvd0VkaXREZXRhaWxzID0gZnVuY3Rpb24odGFzaykgeyAvL29wZW5zIGVkaXQgcG9wIHVwIHdpbmRvdyBhbmQgZmlsbHMgcGxhY2Vob2xkZXIgY29udGVudCB3aXRoIHRoZSBjdXJyZW50IHRhc2sgZGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgZWRpdERpYWxvZy5zaG93TW9kYWwoKVxyXG4gICAgICAgICAgICAgICAgZWRpdFRpdGxlLnZhbHVlID0gdGFzay50aXRsZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWRpdFRpdGxlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgZWRpdFByaW9yaXR5LmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidXR0b24udmFsdWUgPT0gdGFzay5wcmlvcml0eSkgYnV0dG9uLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBlZGl0RGF0ZS52YWx1ZSA9IHRhc2suZGF0ZVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFRhc2sgPSBjdXJyZW50UHJvamVjdC5maW5kVGFzayh0YXNrLnRpdGxlKSAvL3NldHMgY2xpY2tlZCB0YXNrIGFzIHRoZSBhY3RpdmUgdGFzayBpbiB0aGUgcHJvZ3JhbSBmb3IgZWFzeSBhY2Nlc3NcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVFZGl0VGFzayA9IGZ1bmN0aW9uKGVkaXRUaXRsZSwgZWRpdERhdGUsIHRhc2spIHsgLy9uZXcgdmFyaWFibGVzIGZvciBuZXcgdmFsdWVzIGZvciB0aGUgdGFzayBjcmVhdGVkIGZvciBjbGFyaXR5XHJcbiAgICAgICAgICAgICAgICBpZiAoZWRpdFRpdGxlID09ICcnKSByZXR1cm4gYWxlcnQoJ1RpdGxlIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAoZWRpdERhdGUgPT0gJycpIHJldHVybiBhbGVydCgnRGF0ZSBjYW5ub3QgYmUgZW1wdHknKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZWRpdFRpdGxlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSdlZGl0LXRhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRlID0gZWRpdERhdGUgXHJcblxyXG4gICAgICAgICAgICAgICAgZWRpdFRhc2sobmV3VGl0bGUsIG5ld1ByaW9yaXR5LCBuZXdEYXRlLCB0YXNrKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKG5ld1RpdGxlLCBuZXdQcmlvcml0eSwgbmV3RGF0ZSwgdGFzaykgeyAvL3Rhc2sgY2xhc3MgcHJvcGVydGllcyBjaGFuZ2VkIGFuZCByZWFkeSB0byBiZSBzZW50IGZvciB1cGRhdGluZ1xyXG4gICAgICAgICAgICAgICAgdGFzay5zZXRUaXRsZSA9IG5ld1RpdGxlXHJcbiAgICAgICAgICAgICAgICB0YXNrLnNldFByaW9yaXR5ID0gbmV3UHJpb3JpdHlcclxuICAgICAgICAgICAgICAgIHRhc2suc2V0RGF0ZSA9IG5ld0RhdGVcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRhc2soKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVUYXNrID0gZnVuY3Rpb24oKSB7IC8vY2xlYXJzIHRhc2sgYXJlYSByZXBvcHVsYXRlcyBpdCB3aXRoIHVwZGF0ZWQgdGFzayBpbmZvIG9mIHRoZSBhY3RpdmUgcHJvamVjdFxyXG4gICAgICAgICAgICAgICAgdG9Eb0NvbnRlbnQuaW5uZXJIVE1MID0gJydcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBjdXJyZW50UHJvamVjdC50YXNrcyApIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRUYXNrKGN1cnJlbnRQcm9qZWN0LCBjdXJyZW50UHJvamVjdC50YXNrc1tpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnRQcm9qZWN0LCB0YXNrKSB7IC8vY3JlYXRlIERPTSBlbGVtZW50cyBmb3IgdG8gZG8gbGlzdCBpdGVtIGFuZCBwb3B1bGF0ZSB3aXRoIHRhc2sgY2xhc3MgcHJvcGVydGllc1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvRG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKCd0by1kbycpXHJcbiAgICAgICAgICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKCdjaGVja21hcmsnKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suY29tcGxldGlvbiA9PSB0cnVlKSBjaGVjay5jbGFzc0xpc3QuYWRkKCdjaGVja2VkJykgLy9wcmVjaGVja3MgdGhlIGNoZWNrYm94IHdoZW4gcmVwb3B1bGF0aW5nIGlmIGl0IHdhcyBjaGVja2VkIGJlZm9yZVxyXG4gICAgICAgICAgICAgICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LnRvZ2dsZSgnY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suY29tcGxldGlvbiA9PSB0cnVlKSByZXR1cm4gdGFzay5zZXRDb21wbGV0aW9uID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5jb21wbGV0aW9uID09IGZhbHNlKSByZXR1cm4gdGFzay5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIG5hbWUuY2xhc3NMaXN0LmFkZCgndG8tZG8tbmFtZScpXHJcbiAgICAgICAgICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gdGFzay50aXRsZVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ1ByaW9yaXR5J1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2xvdycpIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdsb3ctcHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ21lZGl1bScpIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdtZWRpdW0tcHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2hpZ2gnKSB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnaGlnaC1wcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZGF0ZScpXHJcbiAgICAgICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kYXRlXHJcbiAgICAgICAgICAgICAgICBlZGl0LmNsYXNzTGlzdC5hZGQoJ2VkaXQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIGljb24uc3JjID0gJy4vcGljcy9zcXVhcmUtZWRpdC1vdXRsaW5lLnN2ZydcclxuICAgICAgICAgICAgICAgIGVkaXQuYXBwZW5kQ2hpbGQoaWNvbilcclxuICAgICAgICAgICAgICAgIG9wZW5FZGl0RGlhbG9nKGVkaXQsIHRhc2spXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlbW92ZS5jbGFzc0xpc3QuYWRkKCdkZWxldGUtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgLy9yZW1vdmVzIHRhc2sgRE9NIGVsZW1lbnQgZnJvbSB0aGUgcGFnZSBhbmQgZnJvbSBwcm9qZWN0IGFycmF5IGlmIGNsaWNrZWRcclxuICAgICAgICAgICAgICAgICAgICB0b0RvLnJlbW92ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFByb2plY3QuZGVsZXRlVGFzayh0YXNrLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGljb24yLnNyYyA9ICcuL3BpY3MvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJ1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmFwcGVuZENoaWxkKGljb24yKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGNoZWNrKVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChuYW1lKVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGR1ZURhdGUpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGVkaXQpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKHJlbW92ZSlcclxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodG9EbylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHsgYWRkVGFzaywgZ2V0VGFza0RpYWxvZyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtYWtlVGFzayA9IHRhc2tGdW5jdGlvbnMoKVxyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtcHJvamVjdCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRpYWxvZycpXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJylcclxuICAgICAgICAgICAgY29uc3QgYWxsUHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsJylcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlQcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlZFByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXBsZXRlZCcpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVCdXR0b25zID0gKGZ1bmN0aW9uKCkgeyAvL2NyZWF0ZSBmdW50aW9uYWxpdHkgZm9yIHByb2plY3QgZGlhbG9nIGJ1dHRvbnNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXN1Ym1pdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNhbmNlbCcpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJvamVjdChwcm9qZWN0TmFtZUlucHV0LnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpIHsgXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdE5hbWUgPT0gJycpIHJldHVybiBhbGVydCgnUHJvamVjdCBOYW1lIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodG9Eb0xpc3QuZmluZFByb2plY3QocHJvamVjdE5hbWUpKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBhbHJlYWR5IGluIHVzZScpIC8vaWYgZmluZFByb2plY3QoKSBydW5zLCB0aGVuIGEgcHJvamVjdCB3aXRoIHRoYXQgbmFtZSBleGlzdHMgc28gZW5kIGxvb3BcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0TmFtZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0TmFtZSkgeyAvL2NyZWF0ZSBET00gZWxlbWVudCB3aXRoIHByb2plY3QgZGV0YWlscyBhbmQgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpIFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdC5zcmMgPSAnLi9waWNzL2RlbGV0ZS1mb3JldmVyLnN2ZydcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbUhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpIC8vd2lsbCByZXR1cm4gdGhlIHByb2plY3QgcmVsYXRlZCB0byB0aGUgbGlzdCBlbGVtZW50IHRvIHVzZSBhIGEgcGFyYW1ldGVyIGZvciBhbm90aGVyIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGVQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvRG9MaXN0LmZpbmRQcm9qZWN0KHByb2plY3ROYW1lKS50YXNrcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgdG9Eb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0TGlzdEl0ZW1IZWFkZXIudGV4dENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLnJlbW92ZSgpIC8vcmVtb3ZlcyB0aGUgZWxlbWVudCBmcm9tIHRoZSBET01cclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRvRG9Db250ZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKSAvL2FkZCB0aGUgcHJvamVjdCB0byB0aGUgcHJvamVjdHMgYXJyYXlcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdEl0ZW1IZWFkZXIpXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdClcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVByb2plY3RUYXNrcyA9IGZ1bmN0aW9uKHRvRG9Db250ZW50LCB0YXNrcywgcHJvamVjdCkgeyAvL3dpbGwgaXRlcmF0ZSBvdmVyIHByb2plY3QncyB0YXNrcyBhcnJheSBhbmQgZGlzcGxheSB0aGVtIHRvIHRoZSBET01cclxuICAgICAgICAgICAgICAgIHRvRG9Db250ZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGFza3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFrZVRhc2suYWRkVGFzayhwcm9qZWN0LCB0YXNrc1tpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVByb2plY3REZXRhaWxzID0gZnVuY3Rpb24ocHJvamVjdCkgeyAvL3VwZGF0ZXMgcHJvamVjdCBoZWFkZXIgdG8gY2xpY2tlZCBwcm9qZWN0IHRpdGxlIGFuZCByZXBsYWNlcyBwcmV2aW91cyB0YXNrcyB3aXRoIHRoZSBuZXcgcHJvamVjdHMgdGFza3NcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdFxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0RvQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICAgICAgICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFrZVRhc2suZ2V0VGFza0RpYWxvZygpLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdFRhc2tzKHRvRG9Db250ZW50LCBwcm9qZWN0LnRhc2tzLCBwcm9qZWN0KSAvL2Rpc3BsYXlzIHRoZSBzZWxlY3RlZCBwcm9qZWN0J3MgdGFza3MgYXJyYXkgdXNpbmcgYSBmb3IgbG9vcFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9qZWN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlEZWZhdWx0UHJvamVjdERldGFpbHMgPSBmdW5jdGlvbihwcm9qZWN0KSB7IC8vc2FtZSBhcyBkaXNwbGF5UHJvamVjdERldGFpbHMgYnV0IGNhbGxzIHVuaXF1ZSBmdW5jdGlvbnMgdG8gZGlzcGxheSBhbGwgdGFza3MgdGhhdCBtZWV0IGEgY2VydGFpbiBjb25kaXRpb25cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdFxyXG4gICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2snKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09ICdBbGwnKSBnZXRBbGxUYXNrcyh0b0RvTGlzdC5wcm9qZWN0cywgcHJvamVjdClcclxuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT0gJ1ByaW9yaXR5JykgZ2V0UHJpb3JpdHlUYXNrcyh0b0RvTGlzdC5wcm9qZWN0cywgcHJvamVjdClcclxuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT0gJ0NvbXBsZXRlZCcpIGdldENvbXBsZXRlZFRhc2tzKHRvRG9MaXN0LnByb2plY3RzLCBwcm9qZWN0KVxyXG5cclxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZWZhdWx0UHJvamVjdFRhc2tzKHRvRG9Db250ZW50LCBwcm9qZWN0LnRhc2tzLCBwcm9qZWN0KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5RGVmYXVsdFByb2plY3RUYXNrcyA9IGZ1bmN0aW9uKHRvRG9Db250ZW50LCB0YXNrcywgcHJvamVjdCkgeyAvL3dpbGwgaXRlcmF0ZSBvdmVyIHByb2plY3QncyB0YXNrcyBhcnJheSBhbmQgZGlzcGxheSB0aGVtIHRvIHRoZSBET00gdGhlbiByZXNldHMgdGhlIGFycmF5IGZvciBuZXh0IHRpbWVcclxuICAgICAgICAgICAgICAgIHRvRG9Db250ZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGFza3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFrZVRhc2suYWRkVGFzayhwcm9qZWN0LCB0YXNrc1tpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb2plY3QudGFza3MgPSBbXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgLy9nbyB0aHJvdWdoIGVhY2ggcHJvamVjdCwgY2hlY2sgdGhhdCBlYWNoIHRhc2sgYXJyYXkgd2l0aGluIGluIGVhY2ggcHJvamVjdCBjb250YWlucyB0YXNrcywgdGhlbiBhZGQgZXZlcnkgdGFzayB0byB0aGUgXCJBbGxcIiBwcm9qZWN0IHRhc2tzXHJcbiAgICAgICAgICAgIGNvbnN0IGdldEFsbFRhc2tzID0gZnVuY3Rpb24ocHJvamVjdHMsIHByb2plY3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBwcm9qZWN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS50YXNrcyAhPSAnJykgZm9yICggY29uc3QgaiBpbiBwcm9qZWN0c1tpXS50YXNrcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmFkZFRhc2tUb1Byb2plY3QocHJvamVjdHNbaV0udGFza3Nbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZ28gdGhyb3VnaCBlYWNoIHByb2plY3QsIGNoZWNrIHRoYXQgZWFjaCB0YXNrIGFycmF5IHdpdGhpbiBpbiBlYWNoIHByb2plY3QgY29udGFpbnMgdGFza3MsIHRoZW4gYWRkIGV2ZXJ5IHRhc2sgdGhhdCBoYXMgYSBwcmlvcml0eSBvZiBcImhpZ2hcIiB0byB0aGUgXCJQcmlvcml0eVwiIHByb2plY3QgdGFza3NcclxuICAgICAgICAgICAgY29uc3QgZ2V0UHJpb3JpdHlUYXNrcyA9IGZ1bmN0aW9uKHByb2plY3RzLCBwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gcHJvamVjdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNbaV0udGFza3MgIT0gJycpIGZvciAoIGNvbnN0IGogaW4gcHJvamVjdHNbaV0udGFza3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnRhc2tzW2pdLnByaW9yaXR5ID09ICdoaWdoJykgcHJvamVjdC5hZGRUYXNrVG9Qcm9qZWN0KHByb2plY3RzW2ldLnRhc2tzW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdldENvbXBsZXRlZFRhc2tzID0gZnVuY3Rpb24ocHJvamVjdHMsIHByb2plY3QpIHsgLy9nbyB0aHJvdWdoIGVhY2ggcHJvamVjdCwgY2hlY2sgdGhhdCBlYWNoIHRhc2sgYXJyYXkgd2l0aGluIGluIGVhY2ggcHJvamVjdCBjb250YWlucyB0YXNrcywgdGhlbiBhZGQgZXZlcnkgdGFzayB0aGF0IGlzIGNvbnBsZXRlZCB0byB0aGUgXCJDb21wbGV0ZWRcIiBwcm9qZWN0IHRhc2tzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gcHJvamVjdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNbaV0udGFza3MgIT0gJycpIGZvciAoIGNvbnN0IGogaW4gcHJvamVjdHNbaV0udGFza3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnRhc2tzW2pdLmNvbXBsZXRpb24gPT0gdHJ1ZSkgcHJvamVjdC5hZGRUYXNrVG9Qcm9qZWN0KHByb2plY3RzW2ldLnRhc2tzW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZURlZmF1bHRQcm9qZWN0cyA9IChmdW5jdGlvbigpIHsgLy9jcmVhdGVzIHByZW1hZGUgcHJvamVjdHMgd2l0aCB0YXNrcyBhbmQgYWRkcyBldmVudCBsaXN0ZW5lcnMgdGhhdCBnaXZlIGFjY2VzcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIHByb2plY3QgY2xhc3Nlc1xyXG5cclxuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVmYXVsdFByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlZmF1bHRQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZFByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVmYXVsdFByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdCgnV29yaycpXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IGRpc3BsYXlQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdCgnV29yaycpKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb2plY3QuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAxJywgJ21lZGl1bScsICcyMDI0LTAyLTE0JylcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LmNyZWF0ZVRhc2soJ1RhbGsgdG8gbWFuYWdlcicsICdtZWRpdW0nLCAnMjAyNC0wMi0xNCcpXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdC5jcmVhdGVUYXNrKCdNZWV0IHdpdGggdGVhbScsICdoaWdoJywgJzIwMjQtMDItMTQnKVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3RUYXNrcyh0b0RvQ29udGVudCwgY3VycmVudFByb2plY3QudGFza3MsIGN1cnJlbnRQcm9qZWN0KVxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdCgnSG9tZScpXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5maW5kUHJvamVjdCgnSG9tZScpLmNyZWF0ZVRhc2soJ0RvIGxhdW5kcnknLCAnbG93JywgJzIwMjQtMDItMTYnKVxyXG4gICAgICAgICAgICAgICAgdG9Eb0xpc3QuZmluZFByb2plY3QoJ0hvbWUnKS5jcmVhdGVUYXNrKCdEbyB0aGUgZGlzaGVzJywgJ21lZGl1bScsICcyMDI0LTAyLTE2JylcclxuICAgICAgICAgICAgICAgIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdIb21lJykuY3JlYXRlVGFzaygnUHJlcGFyZSBtZWFscyBmb3IgdGhlIHdlZWsnLCAnaGlnaCcsICcyMDI0LTAyLTE0JylcclxuICAgICAgICAgICAgICAgIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdIb21lJykuY3JlYXRlVGFzaygnVHJhaW5pbmcnLCAnaGlnaCcsICcyMDI0LTAyLTE2JylcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIH0pKClcclxuICAgIH0pKClcclxufSIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9jbGFzc2VzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnQWxsJykpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdQcmlvcml0eScpKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnQ29tcGxldGVkJykpXHJcbiAgICB9XHJcblxyXG5jcmVhdGVQcm9qZWN0KG5hbWUpIHsgLy9jcmVhdGUgbmV3IHByb2plY3QgY2xhc3MgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBhcnJheVxyXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpXHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcclxufVxyXG5cclxuZ2V0IGdldFByb2plY3RzKCkgeyAvL3JldHVybiB0aGUgYXJyYXkgd2l0aCBhbGwgcHJvamVjdHNcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzXHJcbn1cclxuXHJcbmZpbmRQcm9qZWN0KG5hbWUpIHsgLy9yZXR1cm4gYSBwcm9qZWN0IGluIHRoZSBwcm9qZWN0IGFycmF5IHVzaW5nIGFuIGlucHV0dGVkIHByb2plY3QgbmFtZVxyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lID09IG5hbWUpXHJcbn1cclxuXHJcbmRlbGV0ZVByb2plY3QobmFtZSkgeyAvL3JlbW92ZXMgdGhlIGlucHV0dGVkIHByb2plY3QgYnkgdXNpbmcgc3BsaWNlIHRvIHJlbW92ZSB0aGggMSBlbGVtZW50IGF0IHRoZSBnaXZlbiBwcm9qZWN0J3MgaW5kZXhcclxuICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZih0aGlzLmZpbmRQcm9qZWN0KG5hbWUpKSwgMSlcclxufVxyXG5cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVVSSBmcm9tIFwiLi9tb2R1bGVzL2xvZ2ljXCI7XHJcblxyXG5jb25zdCBVSSA9IGNyZWF0ZVVJKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
