import {BsGithub,BsLinkedin} from "react-icons/bs"
import { Link } from "react-router-dom"

function Footer() {
    const date=new Date()
    const year=date.getFullYear()
  return (
    <>
    <footer className="relative left-0 bottom-0 flex flex-col items-center justify-between sm:flex-row py-5 h-[15vh] bg-gray-800 text-white sm:px-20">
        <section className="text-xl">
            Copright {year} | All rigths are Reserved
        </section>
        <section className="flex items-center justify-between gap-5 text-white my-3">
            <Link className="hover:bg-yellow-500 transition-all ease-in-out duration-300" to="https://www.linkedin.com/in/manas-halari-92687b275/">
                <BsLinkedin size={30}/>
            </Link>
            <Link className="hover:bg-yellow-500 transition-all ease-in-out duration-300" to="https://github.com/ManasHalari">
                <BsGithub size={30}/>
            </Link>
        </section>
    </footer>

    </>
  )
}

export default Footer