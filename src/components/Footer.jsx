const Footer = () => {
  return (
    <div className="h-[10vh] w-full flex justify-center items-center dark:bg-dark-bg">
      <div className="h-auto w-full text-center">
        <h2 className="text-base font-medium font-description text-zinc-800
          dark:text-zinc-300 ">
            WebApp Developed by
            <a href="https://najibdev.vercel.app" target="_blank"
              className="underline text-zinc-800 dark:hover:text-white ml-2">
                Najib Hossain
            </a>
        </h2>
      </div>
    </div>
  )
}

export default Footer