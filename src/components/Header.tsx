type HeaderProps = {
  headerText: string;
};

const Header = ({ headerText }: HeaderProps) => {
  return (
    <div className="bg-customBlue text-white h-16 flex items-center justify-center font-bold">
      {headerText}
    </div>
  );
};

export default Header;
