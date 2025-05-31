import { FloatingWhatsApp } from "react-floating-whatsapp";
import logo from "../../public/LahoreShops.png";
const Whatsapp = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="923207803941" // international format
      accountName="Lahore Shops"
      chatMessage="Hello! How can we help you?"
      placeholder="Type your message here"
      avatar={logo} // optional avatar image
    />
  );
};

export default Whatsapp;
