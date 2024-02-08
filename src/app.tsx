import logo from './assets/logo.png'
import { NoteCard } from './components/note-card'
import { NewNoteCard } from './components/newnotecard'
import { ChangeEvent, useState } from 'react'

interface Note{
    id: string 
    date: Date 
    content: string
}


export function App() {
    const [search, setSearch] = useState('')
    const[notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorange = localStorage.getItem('notes')

        if (notesOnStorange){
            return JSON.parse(notesOnStorange)
        }
        return[]
    }
      )

    function onNoteCreated(content: string){
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content
        }
        const notesArray = [newNote, ...notes]

        setNotes(notesArray)

        localStorage.setItem('notes', JSON.stringify(notesArray))
    }

    function onNoteDeleted(id: string){
        const notesArray = notes.filter(note =>{
            return note.id != id
        })

        setNotes(notesArray)
        localStorage.setItem('notes', JSON.stringify(notesArray))
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>){
        const query = event.target.value 
        setSearch(query)
    }

    const filteredNotes = search != ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    :notes

 return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
        <img src={logo}/>

        <form className='w-full'>
            <input
             type="text"
             className="w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500"
              placeholder='busque em suas notas...'
              onChange={handleSearch}/>
        </form>

     <div className="h-px bg-slate-700"/>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">

         
          <NewNoteCard onNoteCreated={onNoteCreated}/>
       
         {filteredNotes.map(note =>{
            return <NoteCard note={note} onNoteDeleted={onNoteDeleted}/>
         })

         }
     </div>
    </div>
)
}


