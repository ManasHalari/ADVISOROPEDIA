import homePageImage from "../Assets/Images/homePageMainImage.png"
import HomeLayout from "../layouts/HomeLayout.jsx"

function HomePage() {
  return (
    
    <HomeLayout>
         <div className="flex items-center justify-center pt-10 mx-10 mb-5 text-white gap-10 h-[85vh]">
                <div className="space-y-6 w-1/2 ">
                    <h1 className="text-5xl  mb-3 text-yellow-500 font-bold">Manas Halari</h1>
                   
                    <p className="text-gray-300 text-xl mb-3">
                        I am FULL STACK DEVELOPER.I am very good <b>MERN</b> Stack.I have created <span className="text-yellow-500 ">Backend</span> of YouTube Clone you can see in my github.
                    </p>                
                 
                </div>
                <div className="w-1/2 space-y-6 flex items-center">
                    <img src={homePageImage} alt="Home page image" className="md:w-[100%] sm:h-[80%]"  />
                </div>
            </div>
    </HomeLayout>
       
           
       
    
  )
}

export default HomePage