import { useEffect, useState } from 'react'
import "./index.css"


const baseUrl = import.meta.env.VITE_API_BASE_URL

const App=()=>{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [submittedTask, setsubmittedTask] = useState({})
    const [todos, setTodos] = useState([])

    const handleSubmit=event=>{
        event.preventDefault()

        if(!title.trim()||!description.trim()){
            alert("Both fields are needed")
            return
        }

        const newTask = {title,description}
            
        fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if (!response.ok) { throw new Error("Failed") }
            return response.json()
        })
        .then((data) => {
            setsubmittedTask(data)
            alert("Task submitted successfully")

            setTimeout(()=>{
                setDescription("")
                setTitle("")                    
            },2000)

        })
        .catch((error) => console.log(error))
        .finally()
    }

    useEffect(() =>{

        fetch(baseUrl)
            .then(res => {
                if (!res.ok) { throw new Error("Failed") }
                return res.json()
            })
            .then(data => {
                setTodos(data)
                console.log("Data from API >> ", data)
            })
            .catch(error => console.error(error))
    }, []);

    const tasks = [submittedTask, ...todos] 

    return (
        <main className='text-center bg-zinc-800 min-h-200 w-full p-20'>
            <h1 className='text-red-600 text-4xl font-extrabold mb-5'>THIS IS A TASK MANAGEMENT APPLICATION</h1>
            <div className='text-xl'>
                <form onSubmit={handleSubmit}>
                    <label className='text-white font-bold text-xl m-2'>Title of the Task;</label><br />
                    <input
                        className='m-2 border border-white border-4 rounded-md p-2 text-gray-300 text-2xl outline-0'
                        type='text'
                        placeholder='Title of the task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    /><br />
                    <label className='m-2 text-white font-bold text-xl'>Description of the Task;</label><br />
                    <input
                        className='m-2 border border-white border-4 rounded-md p-2 text-gray-300 text-2xl outline-0'
                        type='text'
                        placeholder='Description of the task'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    /><br />
                    <button
                        className='m-4 bg-transparent text-red-600 border border-red-600 p-2 rounded-md'
                        type='submit'>
                            Submit
                    </button>
                </form>
                <h2>The Submitted Task</h2>
                <div className='text-blue-700 font-bold text-2xl'>{submittedTask.title}:{submittedTask.description}</div>
                
                <ol className='text-gray-200 font-bold'>
                    {tasks.map((task, index) => (
                        <li key={index} className='text-gray-300'>{task.title}</li>
                    ))}
                </ol>
            </div>
        </main>
    )
}
export default App
