const Footer = () => {
  return (
    <footer className="w-full text-center border-t border-grey p-4 pin-b bg-white sticky -bottom-0">
      <p className="font-sans">&copy; {new Date().getFullYear()} Cypher</p>
    </footer>
  );
};

export default Footer;
