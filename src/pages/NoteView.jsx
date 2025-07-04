import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { databases } from "../appwrite/appwrite";
import ViewPageSkeleton from "../components/ViewPageSkeleton";

const NoteView = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_NOTES_COLLECTION;
  const {docID} = useParams(); // getting the document id from the url
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState({});

  /* getting current note by document id and updating the note state
   variable */
  const getNote = async () => {
    setLoading(true);

    try {
      const data = await databases.getDocument(
        databaseID,
        collectionID,
        docID
      )

      // updating note data state variable
      setNote(data);
    } catch (error) {
      console.error('Fetching error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // fetching current note on every render and document id change
    getNote();
  }, [docID])

  if(loading) {
    return <ViewPageSkeleton />
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center dark:bg-dark-bg">
      <div className="h-[80%] w-[90%] flex flex-col justify-start
       items-center gap-16 lg:max-2xl:gap-12 overflow-auto">
        <div className="h-auto w-full text-left">
          <button type="button" className="px-4 py-2
            text-base font-medium font-description rounded cursor-pointer
            text-white bg-stone-900 dark:text-zinc-900 dark:bg-white"
            onClick={() => {
              navigate('/notes')
            }} >
              Go Back
          </button>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="text-lg font-description font-medium
          text-zinc-900 dark:text-zinc-200">
            {note.title}
          </h2>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="text-base font-description font-medium
          text-zinc-800 dark:text-zinc-400 whitespace-pre-wrap">
            {note.description}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default NoteView