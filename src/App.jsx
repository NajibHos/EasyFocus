import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./utils/ThemeProvider";
import { AuthProvider } from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import NotesManager from "./pages/NotesManager"
import AddNewNote from "./pages/AddNewNote"
import NoteView from "./pages/NoteView"
import TaskManager from "./pages/TaskManager"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ResourcesManager from "./pages/ResourcesManager";
import AddNewResource from "./pages/AddNewResource";
import ResourceView from "./pages/ResourceView";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
      <Header />
      <main className="h-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/notes' element={<NotesManager />} />
            <Route path='/add-new-note' element={<AddNewNote />} />
            <Route path='/note-view/:docID' element={<NoteView />} />
            <Route path='/todos' element={<TaskManager />} />
            <Route path='/resources' element={<ResourcesManager />} />
            <Route path='/add-new-resource' element={<AddNewResource />} />
            <Route path='/resource-view/:docID' element={<ResourceView />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

export default App