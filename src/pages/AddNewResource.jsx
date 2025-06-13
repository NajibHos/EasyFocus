import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";
import { Link } from "react-router-dom";
import FormStatusAlert from "../components/FormStatusAlert";

const AddNewResource = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_RESOURCES_COLLECTION;
  const filtersID = import.meta.env.VITE_APPWRITE_RESOURCES_FILTER;
  const [filters, setFilters] = useState([]);
  const [formStatus, setFormStatus] = useState('');

  // getting all filters and updating filters state variable
  const getResourceFilters = async () => {
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
      console.error("Fetching error :" + error.message);
    }
  }

  // adding new note
  const addNewResource = async (formData) => {
    const resourceTitle = formData.get('title');
    const resourceLink = formData.get('link');
    const resourceCategory = formData.get('category') || 'Uncategorized';
    const resourceDescription = formData.get('description') || '';

    try {
      await databases.createDocument(
        databaseID,
        collectionID,
        ID.unique(), // generating unique id for the document
        {
          title: resourceTitle,
          link: resourceLink,
          description: resourceDescription,
          category: resourceCategory,
          status: 'unread'
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
    getResourceFilters();
  }, [])

  // rendering the alert upon formStatus
  if (formStatus === 'success') {
    return <FormStatusAlert status={'success'} type={'Resource'} />
  } else if (formStatus === 'failed') {
    return <FormStatusAlert status={'failed'} type={'Resource'} />
  }

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center">
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
            <Link to='/resources'>
            <h2 className="text-base font-medium
             font-description text-zinc-200 underline">
              Resources Page
            </h2>
            </Link>
          </div>
        </div>
        <div className="h-auto w-full lg:max-2xl:w-[60%]">
          <form action={addNewResource} className="h-auto w-full flex
           flex-col justify-center items-center gap-8">
            <div className="h-auto w-full flex flex-col gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                text-white">
                  Title
                </h2>
              </div>
              <div className="h-auto w-auto">
                <input type="text" placeholder="Type here" name="title"
                 className="input w-full bg-zinc-900 font-description
                 font-medium text-blue-200" required />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                text-white">
                  Link
                </h2>
              </div>
              <div className="h-auto w-auto">
                <input type="text" placeholder="Type here" name="link"
                 className="input w-full bg-zinc-900 font-description
                 font-medium underline text-blue-600" required />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                text-white">
                  Category
                </h2>
              </div>
              <div className="h-auto w-auto">
                <select defaultValue="Uncategorized" className="select
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
                  Description
                </h2>
              </div>
              <div className="h-auto w-auto">
                <textarea placeholder="Type here" className="textarea
                w-full font-description font-medium bg-zinc-900
                text-zinc-200 overflow-auto" name="description" >
                </textarea>
              </div>
            </div>
            <div className="h-auto w-full mt-3">
              <button type="submit" className="w-full py-2 bg-white
              text-base font-medium font-description rounded
              text-zinc-950 cursor-pointer">
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewResource