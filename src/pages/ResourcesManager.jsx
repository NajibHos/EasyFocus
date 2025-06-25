import { useEffect, useState } from "react"
import { databases } from "../appwrite/appwrite"
import { Query } from "appwrite"
import { useNavigate } from "react-router-dom"
import ResourcesFilterButton from "../components/ResourcesFilterButton"
import FilterButtonSkeleton from "../components/FilterButtonSkeleton"
import ResourceCards from "../components/ResourceCards"
import CardsSkeleton from "../components/CardsSkeleton"
import Alert from "../components/Alert"

const ResourcesManager = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_RESOURCES_COLLECTION;
  const filtersID = import.meta.env.VITE_APPWRITE_RESOURCES_FILTER;
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [resourceFilters, setResourceFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [resources, setResources] = useState([]);
  const [resourcesLength, setResourcesLength] = useState(0);
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
      setResources(data.documents);
      setResourcesLength(data.total); // collecting resources length
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
      setResources(data.documents);
      setResourcesLength(data.total); // collecting resources length
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
     items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-medium
           font-description text-zinc-200">
            Study Resources
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto text-left">
            <h2 className="text-base font-medium
             font-description text-zinc-200">
              Resources History
            </h2>
          </div>
          <div className="h-auto w-auto text-right">
            <button type="button" className="px-4 py-2 bg-white
            text-base font-medium font-description rounded
            text-zinc-950 cursor-pointer"
              onClick={() => {
                navigate('/add-new-resource');
              }}  >
              Add New Resource
            </button>
          </div>
        </div>
        <div className="h-auto w-full flex justify-start items-center
         gap-8 lg:max-2xl:gap-10 overflow-x-auto">

          {/* Default All filter button */}
          <button type="button" className={`px-4 py-2 text-base
           font-medium font-description rounded cursor-pointer
           ${filtersLoading ? 'hidden' : 'block'}
           ${activeFilter === 'All' ? ('bg-white text-zinc-950'
           ) : ('bg-zinc-950 text-white')} `}
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
        <div className={`${resourcesLength < 1 ? 'block' : 'hidden'}
         h-auto w-full`}>
          {
            !loading ? (<Alert height={'h-[400px]'}
             type={'notes'} />) : ( <CardsSkeleton />)
          }
        </div>
        <div className={` ${resourcesLength < 1 ? 'hidden' : 'block'}
         h-auto w-full `}>
          <div className="h-auto lg:h-[400px] w-full grid grid-cols-1
           sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            loading ? (<CardsSkeleton />
            ) : (resources.map((value, i) => {
              return <ResourceCards
               key={i}
               data={value}
               setActiveFilter={setActiveFilter}
               removeResource={removeResource} />
            }))
          }
          </div>
        </div>

        {/* pagination buttons */}
        <div
         className={
         `${resourcesLength > resourcesPerPage ? 'block' : 'hidden'}
         w-full flex justify-center items-center`}>
          <div className="join">
            <button className="join-item btn bg-zinc-950 text-xl
            text-white"
             disabled={page === 1}
             onClick={() => {selectPageHandler(page - 1)}}>
              «
            </button>
            <button className="join-item btn text-base bg-zinc-950
            text-white font-description font-medium cursor-default">
              {page}
            </button>
            <button className="join-item btn text-xl text-white
            bg-zinc-950"
            disabled={page === Math.ceil(resourcesLength / 6)}
             onClick={() => {selectPageHandler(page + 1)}}>
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesManager