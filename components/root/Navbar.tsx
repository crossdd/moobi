import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/constants";

const Navbar = () => {
  return (
    <div className="relative">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
