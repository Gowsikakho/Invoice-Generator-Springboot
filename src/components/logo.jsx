import LogoImage from "/src/assets/logo.jpg";

const Logo = () => {
  return (
    <div className="logo">
      <img
        src={LogoImage}
        alt="Logo"
        style={{ height: "40px" }}
      />
    </div>
  );
};

export default Logo;
