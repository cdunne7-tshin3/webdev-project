## Current Structure (UPDATED):

                        App
                         |
                         | (wraps with BrowserRouter)
                         ↓
                    <BrowserRouter>
                         |
                    <Routes>
                   /  |  |  |  \  \
                  /   |  |  |   \  \
                 ↓    ↓  ↓  ↓    ↓  ↓
            Home  Main ClassList StudentList LessonDetail CreateLesson
                   |                              |            |
                   ↓                              ↓            ↓
              MainList                      (uses params) (form state)

## Complete Component Hierarchy:

App (Root - Stateful)
├── Parse Initialization
└── BrowserRouter
├── Navigation Menu
└── Routes
├── "/" → Home (Stateless)
├── "/lessons" → Main (Stateful)
│ └── MainList (Stateless)
├── "/classes" → ClassList (Stateful)
├── "/students" → StudentList (Stateful)
├── "/lesson/:id" → LessonDetail (Stateful)
└── "/create" → CreateLesson (Stateful)

## Component Relationships & Data Flow:

Parent Components (Stateful):

- App: Root component, initializes Parse
- Main: Manages lesson state, fetches all lessons
- ClassList: Manages class state, handles class CRUD
- StudentList: Manages student state, handles student CRUD
- LessonDetail: Fetches single lesson by ID
- CreateLesson: Manages form state for new lessons

Child Components (Stateless):

- MainList: Displays lesson list (receives lessons prop)
- Home: Static navigation hub

## Parse Service Integration:

LearnService.js → Main, LessonDetail, CreateLesson
ClassService.js → ClassList, StudentList (for dropdown)
StudentService.js → StudentList

## Props Passed:

- Main → MainList: { lessons: Array<Lesson> }
- URL Params → LessonDetail: { id: string }
- URL Params → StudentList: { classId?: string }

## Data Relationships:

Class (1) -----> (\*) Student

- One Class has many Students
- Student has reference to Class

Lesson (standalone entity)

- No direct relationships

## Route Structure:

/ (Home)
├── /lessons (Main → MainList)
├── /lesson/:id (LessonDetail)
├── /classes (ClassList)
├── /students (StudentList)
│ └── /students?classId=xxx (filtered)
└── /create (CreateLesson)ShareContent00:00:00

Feature 4 is again broken down into your roles of Student A and B. Remember that for this feature you will be keeping the same role that you had for Feature 3. The point distribution for this feature is generally the same as from Feature 3, with 40 points for the individual tasks includingpasted
