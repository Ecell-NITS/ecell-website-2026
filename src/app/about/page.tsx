import { Poppins } from "next/font/google"
const poppins=Poppins({
  subsets:["latin"],
  weight:["400","600"]})
import Image from "next/image";


export default function AboutPage() {
  return (
    <div className="relative text-white min-h-screen">
  
    

    <main className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-[#050224e4] to-[#020223]">
    <header className="">
        <br/>
        <div className="">
          <h1 className={`${poppins.className} text-3xl lg:text-3.5xl md:text-3xl sm:text-2.7xl xl:text-4xl 2xl:text-5xl text-center `}>WHO ARE WE?</h1>
        </div>
        <hr className="mx-2 sm:mx-6 lg:mx-8 xl:mx-10 border-0.5 sm:border-1.0 md:border-1.0 lg:border-1.5 xl:border-2 2xl:border-2.3"></hr>
        <br/>
        <h3 className={`${poppins.className} px-4 sm:px-6 lg:px-9 xl:px-12 2xl:px-15 text-sm sm:text-lg md:text-xl lg:text-1.0xl xl:text-1.7xl 2xl:text-2xl text-center`}>E-Cell, NIT Silchar is a non-profit student-run organization promoting and nurturing the entrepreneurial spirit among students. It offers pre-incubation facilities to startups and encourages students to work on their ideas through events. E-Cell's mission is to improve the culture of entrepreneurship in technical and non-technical fields and uplift students to innovate and develop their models. Its objective is to develop the spirit of entrepreneurship by providing various programs and events such as Srijan to educate students on financial literacy, real-world problem-solving skills, and event management.</h3>
    </header>


     <br/>
     <br/>
     <br/>

    <div className="">
      
        <div className="">
          <h1 className={`${poppins.className} text-3xl 2xl:text-5xl lg:text-3.5xl md:text-3xl sm:text-2.7xl xl:text-4xl text-center `}>MOTTO</h1>
          <hr className="mx-2 sm:mx-6 lg:mx-8 xl:mx-10 border-0.5 sm:border-1.0 md:border-1.0 lg:border-1.5 xl:border-2 2xl:border-2.3"></hr>
          <br/>
        </div>

        <div className="cards-set-1 flex mx-10 lg:mx-0 flex-wrap gap-10 justify-evenly">
          
          <div className="about_card_ justify-content-center shadow-lg transition-transform duration-500 ease-out hover:scale-105 w-84 h-84 items-center border-gray-800 border-6">
            <div className="image_style pt-2 h-1/2 justify-items-center bg-linear-to-b from-[#000000] to-[#05290dcf]"><Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767000084/ICON_xhuywa.png" alt="cardimage" width={200} height={200} className="image_style"/></div>
            <div className="motto_card_text h-1/2 pt-6 text-center text-sm w-full bg-linear-to-b from-[#05290dcf] to-[#0A231D]">Inspiring Ideas, Igniting Innovation." We encourage students to brainstorm innovative ideas and nurture their creativity.</div>
          </div>
          <div className="about_card_ justify-content-center shadow-lg transition-transform duration-500 ease-out hover:scale-105 w-84 h-84 items-center border-gray-800 border-6">
            <div className="image_style justify-items-center h-1/2 bg-linear-to-b from-[#000000] to-[#05290dcf]"><Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767000156/e96e7b616aeb9701f0695efea726d724-removebg-preview_1_jbnhm2.png" alt="cardimage" width={155} height={155} className="image_style"/></div>
            <div className="motto_card_text text-center pt-6 h-1/2 text-sm w-full bg-linear-to-b from-[#05290dcf] to-[#0A231D]">Guiding You Towards Success." We provide guidance to students in the form of mentorship programs, workshops, and networking events to help them refine their ideas and develop their skills.</div>
          </div>
          <div className="about_card_ justify-content-center shadow-lg transition-transform duration-500 ease-out hover:scale-105 w-84 items-center border-gray-800 border-6">
            <div className="image_style pt-2 h-1/2 justify-items-center bg-linear-to-b from-[#000000] to-[#05290dcf]"><Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767000255/024fbe719072ac086e1dba55fb8f18c5-removebg-preview_1_nrnbw9.png" alt="cardimage" width={150} height={150} className="image_style"/></div>
            <div className="motto_card_text h-1/2 pt-6 text-center text-sm w-full bg-linear-to-b from-[#05290dcf] to-[#0A231D]">Transforming Ideas into Reality." We provide incubation facilities and funding support to promising startups and ideas, helping them take off the ground. </div>
          </div>
          <div className="about_card_ justify-content-center shadow-lg transition-transform duration-500 ease-out hover:scale-105 w-84 h-84 items-center border-gray-800 border-6">
            <div className="image_style pt-4 h-1/2 justify-items-center bg-linear-to-b from-[#000000] to-[#05290dcf]"><Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767000733/images_bbmyzl.jpg" alt="cardimage" width={150} height={150} className="image_style"/></div>
            <div className="motto_card_text h-1/2 pt-6 text-center text-sm w-full bg-linear-to-b from-[#05290dcf] to-[#0A231D]">Connecting Ideas, Building Networks." We organize various events like business plan competitions, hackathons, and networking sessions to help students showcase their ideas and connect with investors, mentors, and other entrepreneurs.</div>
          </div>
          <div className="about_card_ justify-content-center shadow-lg transition-transform duration-500 ease-out hover:scale-105  w-84 h-84 items-center border-gray-800 border-6">
            <div className="image_style justify-items-center h-1/2 bg-linear-to-b from-[#000000] to-[#05290dcf]"><Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767000495/Frame_1116606601_bz40iq.png" alt="cardimage" width={200} height={200} className="image_style"/></div>
            <div className="motto_card_text h-1/2 pt-6 text-center text-sm w-full bg-linear-to-b from-[#05290dcf] to-[#0A231D]">Creating a Community of Entrepreneurs."We aim to create a culture of entrepreneurship on campus by celebrating success stories, organizing interactive sessions, and inspiring students to think beyond traditional career paths.</div></div>
          </div>
  
   </div>

   <br/>
   <br/>
   <br/>


  <div className="">
     <h1 className={`${poppins.className} 2xl:text-5xl lg:text-3xl md:text-2.5xl sm:text-2xl xl:text-4xl text-center `}>PILLARS OF E-CELL</h1>
     <hr className="mx-2 sm:mx-6 lg:mx-8 xl:mx-10 border-0.5 sm:border-1.0 md:border-1.0 lg:border-1.5 xl:border-2 2xl:border-2.3"></hr>
     <br/>
  </div>


  <div className="flex mx-10 lg:mx-0 flex-wrap gap-10 justify-evenly">



     <div className=" flex flex-col border-2 rounded-md shadow-lg transition-transform duration-500 ease-out hover:scale-105 justify-content-center w-84 items-center">
      <div className="ellipse pt-4">
        <Image src="https://res.cloudinary.com/ecell/image/upload/v1756627441/IMG_174134284467cac87c778b1_kzqtmj.jpg" alt="" width={100} height={100} className="rounded-full object-cover"/>
      </div>
      <br/>
      <div className="text-center rectangle h-1/2">
        <span className="name_pillars text-center text-xl lg:text-2xl w-full"><b>Prof. Rahul Dev Misra</b></span><br/>
        <span className="designation_pillars text-center text-lg lg:text-xl w-full">IIC President, NIT Silchar.</span><br/><br/><br/>
        <p className="description_pillars text-center text-md lg:text-lg w-57">Prof. Rahul Dev Misra is a professor in the mechanical engineering department and the president of IIC, NIT Silchar. He is the backbone of IIC and has been an excellent mentor to the students and a great support to the organization.</p>
      </div>
     </div>




     <div className=" flex flex-col border-2 rounded-md shadow-lg transition-transform duration-500 ease-out hover:scale-105 justify-content-center w-84 items-center">
       <div className="ellipse pt-4">
         <Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767025863/WasimArifSir-d33400e4_qmpii4.jpg" alt="" width={100} height={100} className="rounded-full object-cover"/>
       </div>
       <br/>
       <div className="rectangle text-center items-center justify-items-center">
        <span className="name_pillars text-center text-xl lg:text-2xl w-full"><b>Dr. Wasim Arif</b></span><br/>
        <span className="designation_pillars text-center text-lg lg:text-xl w-full"> Convener IIC, NIT Silchar.</span><br/><br/><br/>
        <p className="description_pillars text-center text-md lg:text-lg w-57">Dr. Wasim Arif is an associate professor in the department of Electronics and Communication and is a faculty advisor at E-Cell, NIT Silchar. He has always been a guiding support to the organization and has always guided the members in the right direction.</p>
       </div>
     </div>





     <div className="flex flex-col border-2 rounded-md  shadow-lg transition-transform duration-500 ease-out hover:scale-105 justify-items-center w-84 items-center">
        <div className="ellipse item-center pt-4 justify-items-center">
         <Image src="https://res.cloudinary.com/dw3n9vflw/image/upload/v1767035373/sertf_edymgq.jpg" alt="" width={100} height={100} className="rounded-full object-cover"/>
        </div>
        <br/>
  
        <div className="rectangle text-center items-center justify-items-center">
         <span className="name_pillars text-center items-center justify-items-center text-xl lg:text-2xl w-full"><b>Dr. A.B. Deoghare</b></span><br/>
         <span className="designation_pillars text-center text-lg lg:text-xl w-full">Asso Prof, Mechanical Engineering.</span><br/><br/><br/>
         <p className="description_pillars text-center text-md lg:text-lg w-57">Dr. A.B. Deoghare is an associate professor in the department of mechanical engineering and supports the Ecell organization as a faculty advisor. We are eternally grateful for the support and guidance that we have received from him.</p> 
        </div>
     </div>






  </div>



    </main>
  </div>
  );
}
