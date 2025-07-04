import { useEffect, useState } from "react"
import { databases } from "../appwrite/appwrite"
import { Query } from "appwrite"
import { useNavigate } from "react-router-dom"
import ResourcesFilterButton from "../components/ResourcesFilterButton"
import FilterButtonSkeleton from "../components/FilterButtonSkeleton"
import ResourceCards from "../components/ResourceCards"
import CardsSkeleton from "../components/CardsSkeleton"
import Alert from "../components/Alert"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ResourcesManager = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_RESOURCES_COLLECTION;
  const filtersID = import.meta.env.VITE_APPWRITE_RESOURCES_FILTER;
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [resourceFilters, setResourceFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [resourcesLength, setResourcesLength] = useState(0);
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();
  // pagination variables
  const [page, setPage] = useState(1);
  const resourcesPerPage = 6;

  /* getting all resource filters and updating the resourceFilters state
   variable */
  const getResourceFilters = async () => {
    setFiltersLoading(true);

    try {
      const data = await databases.listDocuments(
        databaseID,
        filtersID,
        [
          Query.orderDesc("$createdAt") // fetching the newest doc first
        ]
      )

      // updating resourceFilters variable
      setResourceFilters(data.documents);
    } catch (error) {
      console.error("Fetching error " + error.message);
    } finally {
      setFiltersLoading(false);
    }
  }

  // getting all resources and updating the resources state variable
  const getAllResources = async (page) => {
    setLoading(true);

    const offset = (page - 1) * resourcesPerPage; // offset

    try {
      const data = await databases.listDocuments(
        databaseID,
        collectionID,
        [
          Query.limit(resourcesPerPage),
          Query.offset(offset),
          Query.orderDesc("$createdAt") // fetching the newest doc first
        ]
      )

      // updating resources and resourcesLength state variable
      setResourcesLength(data.total); // collecting resources length
      setResources(data.documents);
    } catch (error) {
      console.error('Fetching error ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  // getting category based resources and updating resources variable
  const getFilteredResources = async (filterValue) => {
    setLoading(true);

    setPage(1); // reset to first page when filter is applied

    try {
      const data = await databases.listDocuments(
        databaseID,
        collectionID,
        [
          Query.equal('category', filterValue), // filtering the resources
          Query.orderDesc("$createdAt") // fetching the newest doc first
        ]
      )

      // updating resources and resourcesLength state variable
      setResourcesLength(data.total); // collecting resources length
      setResources(data.documents);
    } catch (error) {
      console.error("Fetching error: " + error.message)
    } finally {
      setLoading(false);
    }
  }

  /* removing current document by document id and fetching the same
   category documents immediately*/
  const removeResource = async (documentID, resourceCategory) => {
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
       document. After removing the document, user will immediately
       redirect to the category and remaining resources will be fetched */
      getFilteredResources(resourceCategory);
    }
  }

  // pagination logic
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 &&
      selectedPage <= Math.ceil(resourcesLength / resourcesPerPage) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  }

  useEffect(() => {
    // getting all resource filters
    getResourceFilters();

    // fetching all resources if the category is set to All
    if (activeFilter === 'All') {
      getAllResources(page);
    }
  }, [page]) // we have the page as a dependency here

  return (
    <div className="h-auto py-12 w-full flex justify-center
     items-center dark:bg-dark-bg">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-medium font-description
           text-zinc-900 dark:text-zinc-200">
            Study Resources
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto text-left">
            <h2 className="text-lg font-medium font-description
             text-zinc-700 dark:text-zinc-200">
              Resources History
            </h2>
          </div>
          <div className="h-auto w-auto text-right">
            <button type="button" className="px-4 py-2 text-base font-medium
             font-description rounded cursor-pointer
             text-white bg-stone-900 dark:text-zinc-900 dark:bg-white"
             onClick={() => navigate('/add-new-resource')}
            >
              Add New Resource
            </button>
          </div>
        </div>
        <div className="h-auto w-full flex justify-start items-center
         gap-6 overflow-x-auto">

          {/* Default All filter button */}
          <button type="button" className={`px-4 py-2 text-base
           font-medium font-description cursor-pointer
           border rounded border-stone-300 dark:border-zinc-900
           ${filtersLoading ? 'hidden' : 'block'}
           ${activeFilter === 'All' ?
            ('bg-stone-900 text-white dark:bg-white dark:text-zinc-900'
            ) : ('bg-transparent text-zinc-900 dark:bg-zinc-950 dark:text-white')} `}
            onClick={() => {
              setActiveFilter('All');
              setPage(1); // reset page
              getAllResources(1);
            }} >
            All
          </button>

          {/* filters */}
          {
            filtersLoading ? (<FilterButtonSkeleton />
            ) : (resourceFilters.map((value, i) => {
              return <ResourcesFilterButton
              key={i}
              data={value}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              action={getFilteredResources} />
            }) )
          }
        </div>
        <div className="h-auto w-full">
          {
            loading ? <CardsSkeleton /> : resourcesLength < 1 ? (<Alert
             height={'h-[400px]'} />) : (<div className="h-auto w-full grid
              grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                  resources.map((value, i) => {
                    return <ResourceCards
                    key={i}
                    data={value}
                    setActiveFilter={setActiveFilter}
                    removeResource={removeResource}
                    />
                  })
                }
            </div>)
          }
        </div>
        {/* pagination buttons */}
        <div className={`${resourcesLength > resourcesPerPage ? 'block' : 'hidden'}
         w-full flex justify-center items-center gap-5`}>
          <div className="h-auto w-auto">
            <button className={`px-2 py-2 text-base text-white bg-zinc-950
             dark:text-zinc-900 dark:bg-white rounded
             ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
             onClick={() => {selectPageHandler(page - 1)}}>
              <ChevronLeft />
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className="px-5 py-2 text-base font-medium font-description
             text-white bg-zinc-950 dark:text-zinc-900 dark:bg-white
             rounded cursor-not-allowed">
              {page}
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className={`px-2 py-2 text-base text-white bg-zinc-950
             dark:text-zinc-900 dark:bg-white rounded
             ${page === Math.ceil(resourcesLength / resourcesPerPage) ?
             'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
             onClick={() => {selectPageHandler(page + 1)}} >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesManager