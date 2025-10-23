```
                    Component Tree Diagram
                    =====================

Structure with Routing:
--------------------------------
                        App
                         |
                         | (wraps with BrowserRouter)
                         ↓
                    <BrowserRouter>
                         |
                    <Routes>
                    /    |    \
                   /     |     \
                  /      |      \
                 ↓       ↓       ↓
            Home    LessonList   LessonDetail    CreateLesson
                        |            |                |
                        |            |                |
                        ↓            ↓                ↓
                   MainList     LessonView      LessonForm
                  (stateless)   (stateless)     (stateful)

Component Relationships:
------------------------
Parent Components (Stateful):
- App: Root component, initializes Parse
- Main/LessonList: Manages lesson state, fetches data
- CreateLesson: Manages form state
- Home: Navigation hub

Child Components (Stateless):
- MainList: Displays lesson list
- LessonView: Displays single lesson details
- LessonForm: Form UI for lesson creation

Data Flow:
----------
App → Parse initialization
  ↓
Routes → Component based on URL
  ↓
Parent Component → Fetch data from Parse service
  ↓
Child Component → Display data via props

Props Passed:
-------------
- Main → MainList: { lessons: Array }
- LessonDetail → LessonView: { lesson: Object }
- CreateLesson → LessonForm: { onSubmit: Function }
```
