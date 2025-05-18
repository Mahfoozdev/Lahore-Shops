import Form from "../components/Form";

const Contact = () => {
  return (
    <div className="w-full flex justify-center ">
      {/* <MetaData metaData={'Metax Digital | Contact'}/> */}
      <main className="md:w-[90%] xl:w-[85%] w-[95%] width-contact flex justify-center flex-col items-center">
        <div className="w-full  pt-20 banner">
          <h1 className="lg:text-6xl xl:text-7xl md:text-5xl text-4xl font-semibold text-center  z-30 pt-10">
            Get <span className="gradientText">in touch</span>{" "}
          </h1>
          <p className="text-[grey] text-center lg:text-lg py-10">
            Let us know how we can assist you, and one of our dedicated{" "}
            <br className="hidden lg:block" /> support team members will get
            back to you shortly.
          </p>
        </div>

        <div className="py-32 w-full flex formContact justify-center">
          <Form />
        </div>
      </main>
    </div>
  );
};

export default Contact;
