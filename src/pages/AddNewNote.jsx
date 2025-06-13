import { useEffect } from "react";
import { databases } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormStatusAlert from "../components/FormStatusAlert";

const AddNewNote = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_NOTES_COLLECTION;
  const filtersID = import.meta.env.VITE_APPWRITE_NOTES_FILTER;
  const [filters, setFilters] = useState([]);
  const [formStatus, setFormStatus] = useState('');

  // getting all filters and updating filters state variable
  const getNoteFilters = async () => {
    try {
      const data = await databases.listDocuments(
        databaseID,
        filtersID,
        [
          Query.orderDesc("$createdAt")
        ]
      )

      // updating filters
      setFilters(data.documents);
    } catch (error) {
      console.error("Fetching error: " + error.message);
    }
  }

  // adding new note
  const addNewNote = async (formData) => {
    const noteTitle = formData.get('title');
    const noteCategory = formData.get('category') || 'Uncategorized';
    const noteDescription = formData.get('description');

    try {
      await databases.createDocument(
        databaseID,
        collectionID,
        ID.unique(), // generating unique id for the document
        {
          title: noteTitle,
          category: noteCategory,
          description: noteDescription
        }
      )

      // updating formStatus state variable to trigger success alert
      setFormStatus('success');

      // updating formStatus state variable again to remove success alert
      setTimeout(() => {
        setFormStatus('');
      }, 3000);

    } catch (error) {
      console.error("Submission error " + error.message);

      // updating formStatus state variable to trigger failed alert
      setFormStatus('failed');

      // updating formStatus state variable again to remove failed alert
      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }
  }

  useEffect(() => {
    // getting all filters on every render
    getNoteFilters();
  }, [])

  // rendering the alert upon formStatus
  if (formStatus === 'success') {
    return <FormStatusAlert status={'success'} type={'Note'} />
  } else if (formStatus === 'failed') {
    return <FormStatusAlert status={'failed'} type={'Note'} />
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl lg:text-xl font-medium
             font-description text-white">
              Add New Note
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <Link to='/notes'>
            <h2 className="text-base font-medium
             font-description text-zinc-200 underline">
              Notes Page
            </h2>
            </Link>
          </div>
        </div>
        <div className="h-auto w-full lg:max-2xl:w-[60%]">
          <form action={addNewNote} className="h-auto w-full flex flex-col
           justify-center items-center gap-8">
            <div className="h-auto w-full flex flex-col gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                text-white">
                  Note Title
                </h2>
              </div>
              <div className="h-auto w-auto">
                <input type="text" placeholder="Type here" name="title"
                 className="input w-full bg-zinc-900 font-description
                 font-medium text-zinc-200" required />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                text-white">
                  Note Category
                </h2>
              </div>
              <div className="h-auto w-auto">
                <select defaultValue="Uncategorised" className="select
                w-full bg-zinc-900 font-description font-medium
                text-zinc-200" name="category" >
                  <option disabled={true}>Pick a category</option>
                  {/* dynamically handling the options */}
                  {
                    filters.map((value, i) => {
                      return <option key={i} value={value.title}>
                        {value.title}
                      </option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                text-white">
                  Note Description
                </h2>
              </div>
              <div className="h-auto w-auto">
                <textarea placeholder="Type here" className="textarea
                w-full font-description font-medium bg-zinc-900
                text-zinc-200 overflow-auto" name="description"
                required >
                </textarea>
              </div>
            </div>
            <div className="h-auto w-full mt-3">
              <button type="submit" className="w-full py-2 bg-white
              text-base font-medium font-description rounded
              text-zinc-950 cursor-pointer">
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewNote