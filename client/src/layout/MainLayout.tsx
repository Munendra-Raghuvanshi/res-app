import Navbar from "@/components/ui/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"




const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2  md:m-0 ">
        <header>
            <Navbar/>
        </header>
        <div className="flex-1">
            <Outlet/>
        </div>
        <div className="">
         <footer className="Footer">
          <Footer/>
         </footer>
        </div>
    </div>
  )
}
export default MainLayout;