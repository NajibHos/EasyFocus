import { useEffect, useState } from "react"
import { databases } from "../appwrite/appwrite"
import { Query } from "appwrite"
import { useNavigate } from "react-router-dom"
import NotesFilterButton from "../components/NotesFilterButton"
import FilterButtonSkeleton from "../components/FilterButtonSkeleton"
import NoteCards from "../components/NoteCards"
import CardsSkeleton from "../components/CardsSkeleton"
import Alert from "../components/Alert"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Notes = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_NOTES_COLLECTION;
  const filtersID = import.meta.env.VITE_APPWRITE_NOTES_FILTER;
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [noteFilters, setNoteFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [notes, setNotes] = useState([]);
  const [notesLength, setNotesLength] = useState(0);
  const navigate = useNavigate();
  // pagination variables
  const [page, setPage] = useState(1);
  const notesPerPage = 6;

  // getting all note filters and updating the noteFilters state variable
  const getNoteFilters = async () => {
    setFiltersLoading(true);

    try {
      const data = await databases.listDocuments(
        databaseID,
        filtersID,
        [
          Query.orderDesc("$createdAt") // fetching the newest doc first
        ]
      )

      // updating noteFilters variable
      setNoteFilters(data.documents);
    } catch (error) {
      console.error("Fetching error " + error.message);
    } finally {
      setFiltersLoading(false);
    }
  }

  // getting all notes and updating the notes state variable
  const getAllNotes = async (page) => {
    setLoading(true);

    const offset = (page - 1) * notesPerPage; // offset

    try {
      const data = await databases.listDocuments(
        databaseID,
        collectionID,
        [
          Query.limit(notesPerPage),
          Query.offset(offset),
          Query.orderDesc("$createdAt") // fetching the newest doc first
        ]
      )

      // updating notes and notesLength state variable
      setNotes(data.documents);
      setNotesLength(data.total); // collecting notes length
    } catch (error) {
      console.error('Fetching error ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  // getting category based notes and updating notes variable
  const getFilteredNotes = async (filterValue) => {
    setLoading(true);

    setPage(1); // reset to first page when filter is applied

    try {
      const data = await databases.listDocuments(
        databaseID,
        collectionID,
        [
          Query.equal('category', filterValue), // filtering the notes
          Query.orderDesc("$createdAt") // fetching the newest doc first
        ]
      )

      // updating notes and notesLength state variable
      setNotes(data.documents);
      setNotesLength(data.total); // collecting notes length
    } catch (error) {
      console.error("Fetching error: " + error.message)
    } finally {
      setLoading(false);
    }
  }

  /* removing current document by document id and fetching the same
   category documents immediately*/
  const removeNote = async (documentID, noteCategory) => {
    try {
      await databases.deleteDocument(
        databaseID,
        collectionID,
        documentID
      )

    } catch (error) {
      console.error('Database error ' + error.message);
    } finally {
      /* fetching notes from same category again after removing current
       document. actually, I do not have the "All" category on the
       database. I'm using it as a default category here. So, if
       user removes a note from the "All" category. After removing
       the document, user will immediately redirect to the category and
       remaining notes will be fetched */
      getFilteredNotes(noteCategory);
    }
  }

  // pagination logic
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 &&
      selectedPage <= Math.ceil(notesLength / notesPerPage) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  }

  useEffect(() => {
    // getting all note filters
    getNoteFilters();

    // fetching all notes if the category is set to All
    if (activeFilter === 'All') {
      getAllNotes(page);
    }
  }, [page]) // we have the page as a dependency here

  return (
    <div className="h-auto py-12 w-full flex justify-center
     items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-medium
           font-description text-zinc-200">
            Notes
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto text-left">
            <h2 className="text-base font-medium
             font-description text-zinc-200">
              Notes History
            </h2>
          </div>
          <div className="h-auto w-auto text-right">
            <button type="button" className="px-4 py-2 bg-white
            text-base font-medium font-description rounded
            text-zinc-950 cursor-pointer"
              onClick={() => {
                navigate('/add-new-note');
              }}  >
              Add New Note
            </button>
          </div>
        </div>
        <div className="h-auto w-full flex justify-start items-center
         gap-6 overflow-x-auto">

          {/* Default All filter button */}
          <button type="button" className={`px-4 py-2 text-base
           font-medium font-description rounded cursor-pointer
           ${filtersLoading ? 'hidden' : 'block'}
           ${activeFilter === 'All' ? ('bg-white text-zinc-950'
           ) : ('bg-zinc-950 text-white')} `}
            onClick={() => {
              setActiveFilter('All');
              setPage(1); // reset page
              getAllNotes(1);
            }} >
            All
          </button>

          {/* filter buttons */}
          {
            filtersLoading ? (<FilterButtonSkeleton />
            ) : (noteFilters.map((value, i) => {
              return <NotesFilterButton
              key={i}
              data={value}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              action={getFilteredNotes} />
            }) )
          }
        </div>
        <div className={`${notesLength < 1 ? 'block' : 'hidden'} h-auto w-full
          ${loading && 'grid grid-cols-1 lg:grid-cols-3 gap-8'}`}>
          {
            loading ? <CardsSkeleton /> : <Alert height={'h-[400px]'} type={'notes'} />
          }
        </div>
        <div className={` ${notesLength < 1 ? 'hidden' : 'block'} h-auto w-full`}>
          <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2
          lg:grid-cols-3 gap-8">
          {
            loading ? <CardsSkeleton /> : (notes.map((value, i) => {
              return <NoteCards
               key={i}
               data={value}
               setActiveFilter={setActiveFilter}
               removeNote={removeNote} />
            }))
          }
          </div>
        </div>
        {/* pagination buttons */}
        <div className={`${notesLength > notesPerPage ? 'block' : 'hidden'}
         w-full flex justify-center items-center gap-5`}>
          <div className="h-auto w-auto">
            <button className={`px-2 py-2 text-base text-white bg-zinc-900
             ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
             onClick={() => {selectPageHandler(page - 1)}}>
              <ChevronLeft/>
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className="px-5 py-2 text-base text-white font-medium
            font-description bg-zinc-950 cursor-not-allowed">
              {page}
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className={`px-2 py-2 text-base text-white bg-zinc-900
             ${page === Math.ceil(notesLength / notesPerPage) ?
             'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
             onClick={() => {selectPageHandler(page + 1)}} >
              <ChevronRight/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes