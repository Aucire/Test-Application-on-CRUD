import { useEffect, useState } from 'react'


const baseUrl = "https://jsonplaceholder.typicode.com/todos"

function App() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [submittedTask, setsubmittedTask] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTask = { title, description }

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

                setDescription("")
                setTitle("")
            })
            .catch((error) => console.log(error))

    }


    //THE USEEFFECT IS NOT WORKING......!!!
    //WITHOUT THE USEEFFECT IT RE-RENDERS WITHE EACH KEY-STROKE
    useEffect(()=>{ 
        console.log("IT ENTERED THE USEEFFECT;")
        fetch(baseUrl)
            .then(res=>res.json())
            .then(data=>console.log("task added;",data))
            .catch(error=>console.error(error))  
     },[])

    return (
        <main className='text-center bg-zinc-800 h-200 w-full p-20'>
            <h1 className='text-red-600 text-4xl font-extrabold mb-5'>THIS IS A TASK MANAGEMENT APPLICATION</h1>
            <div className='text-xl'>
                <form onSubmit={handleSubmit}>
                    <label className='text-white font-bold text-xl m-2'>Title of the Task;</label><br />
                    <input
                        className='m-2 border border-white border-4 rounded-md p-2 text-gray-300 text-2xl outline-0'
                        type='text'
                        id='Title'
                        placeholder='Title of the task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} /><br />
                    <label className='m-2 text-white font-bold text-xl'>Description of the Task;</label><br />
                    <input
                        className='m-2 border border-white border-4 rounded-md p-2 text-gray-300 text-2xl outline-0'
                        type='text'
                        id='description'
                        placeholder='Description of the task'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} /><br />
                    <button 
                        className='m-4 bg-transparent text-red-600 border border-red-600 p-2 rounded-md'
                        type='submit'>Submit</button>
                </form>
                <h2>The Submitted Task</h2>
                <div className='text-blue-700 font-bold text-2xl'>{submittedTask.title}:{submittedTask.description}</div>
                    <>Data from API</>
                <div>

                </div>
            </div>
        </main>
    )
}
export default App
