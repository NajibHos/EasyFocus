import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { databases } from "../appwrite/appwrite";
import ViewPageSkeleton from "../components/ViewPageSkeleton";

const ResourceView = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_RESOURCES_COLLECTION;
  const {docID} = useParams(); // getting the document id from the url
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  /* getting current resource by document id and updating the note state
   variable */
  const getDocument = async () => {
    setLoading(true);

    try {
      const data = await databases.getDocument(
        databaseID,
        collectionID,
        docID
      )

      // updating resource data state variable
      setData(data);
    } catch (error) {
      console.error("Fetching error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // updating resource status
  const updateDocumentStatus = async (status) => {
    try {
      await databases.updateDocument(
        databaseID,
        collectionID,
        docID,
        {
          status: status
        }
      )
    } catch (error) {
      console.error("Database error :" + error.message);
    } finally {
      // getting current document again after successfully updating it
      getDocument();
    }

  }

  useEffect(() => {
    //fetching current resource on every render and document id change
    getDocument();
  }, [])

  if (loading) {
    return <ViewPageSkeleton />
  }

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center
    dark:bg-dark-bg">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:gap-12">
        <div className="h-auto w-full text-left">
          <button type="button" className="px-4 py-2
            text-base font-medium font-description rounded cursor-pointer
            text-white bg-stone-900 dark:text-zinc-900 dark:bg-white"
            onClick={() => {
              navigate('/resources')
            }} >
              Go Back
          </button>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-3">
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-description font-medium
            text-zinc-700 dark:text-zinc-400">
              Title
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-lg font-description font-medium
            text-zinc-900 dark:text-zinc-200">
              {data.title}
            </h2>
          </div>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-3">
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-description font-medium
            text-zinc-700 dark:text-zinc-400">
              Description
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-lg font-description font-medium
            text-zinc-900 dark:text-zinc-200">
              {data.description || 'Not available'}
            </h2>
          </div>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-3">
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-description font-medium
            text-zinc-700 dark:text-zinc-400">
              Link
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <a href={data.link} target="_blank" className="text-lg
             font-description font-medium underline text-blue-600">
              {data.link}
            </a>
          </div>
        </div>
        <div className="h-auto w-full flex justify-between
         items-center flex-wrap">
          <div className="h-auto w-[40%] lg:w-[30%] flex
           flex-col justify-center items-center gap-3">
            <div className="h-auto w-full text-left">
            <h2 className="text-base font-description font-medium
            text-zinc-700 dark:text-zinc-400">
              Category
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-lg font-description font-medium
            text-zinc-900 dark:text-zinc-200">
              {data.category}
            </h2>
          </div>
          </div>
          <div className="h-auto w-[40%] lg:w-[30%] flex
           flex-col justify-center items-center gap-3">
            <div className="h-auto w-full text-center">
            <h2 className="text-base font-description font-medium
            text-zinc-700 dark:text-zinc-400">
              Status
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className={`text-lg font-description font-medium
            ${data.status === 'read' ? 'text-green-600' : 'text-red-600'}
            `}>
              {data.status}
            </h2>
          </div>
          </div>
          <div className="h-auto w-[100%] lg:w-[30%] flex
           flex-col justify-center items-center gap-3 mt-5 lg:mt-0">
            <div className="h-auto w-full text-left lg:text-right">
            <h2 className="text-base font-description font-medium
            text-zinc-700 dark:text-zinc-400">
              Action
            </h2>
          </div>

          {/* buttons to update current resource status */}
          <div className="h-auto w-full text-left lg:text-right">
            <div className={`h-auto w-full lg:w-auto
             ${data.status === 'read' ? 'block' : 'hidden'} `}>
              <button type="button" className="bg-red-600
              text-base font-medium font-description rounded
              text-white cursor-pointer w-full lg:w-auto
               px-0 lg:px-4 py-2"
              onClick={() => updateDocumentStatus('unread')}>
                Mask as Unread
              </button>
            </div>
            <div className={`h-auto w-full lg:w-auto
             ${data.status === 'read' ? 'hidden' : 'block'} `}>
              <button type="button" className="bg-green-600
              text-base font-medium font-description rounded
              text-white cursor-pointer w-full lg:w-auto
              px-0 lg:px-4 py-2"
              onClick={() => updateDocumentStatus('read')} >
                Mask as Read
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceView