import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthProvider';


function App() {
    return(
        <AuthProvider>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Home page</h1>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/register' element={<RegisterPage/>} />
                <Route path='/tasks' element={<h1>Listar Tareas</h1>} />
                <Route path='/task/:id' element={<h1>Tarea</h1>} />
                <Route path='/add-task' element={<h1>Create Task</h1>} />
                <Route path='/update-task/:id' element={<h1>Update Task</h1>} />
                <Route path='/delete-task/:id' element={<h1>Delete Task</h1>} />
                <Route path='/users' element={<h1>Listar Users</h1>} />
                <Route path='/user/:id' element={<h1>User</h1>} />
                <Route path='/update-user/:id' element={<h1>Update User</h1>} />
                <Route path='/delete-user/:id' element={<h1>Delete User</h1>} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
    }

export default App