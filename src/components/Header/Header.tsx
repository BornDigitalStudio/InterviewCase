import InputField from "@components/InputField/InputField";
import Icon from "@components/IcomoonIcon/Icon";
import USFlag from "@assets/images/united-states.png";
import { forwardRef } from "react";

const Header = forwardRef((_props, ref) => {
  return (
    <header
      ref={ref as React.LegacyRef<HTMLElement>}
      className="bg-white  flex flex-row items-center justify-between w-full h-16 gap-8 px-2 sm:px-10 py-3   border border-solid"
    >
      <InputField
        contstyle="max-w-xs border border-solid rounded"
        inputClassName="h-10 focus:border-gray-500"
        prefix={<Icon icon="search" size={16} color="gray" />}
        placeholder="Search"
        inputMode="search"
      />

      <div className="flex flex-row items-center sm:gap-5 gap-4">
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <img src={USFlag} alt="US flag" className="h-5" />
          <p className="mr-4 sm:mr-0">USD</p>
        </div>

        <Icon icon="shopping-cart" size={20} color="gray" />

        <Icon icon="bell-o" size={20} color="gray" />

        <Icon icon="help-circle" size={20} color="gray" />
      </div>
    </header>
  );
});

export default Header;
