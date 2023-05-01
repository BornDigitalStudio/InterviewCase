import InputField from "@components/InputField/InputField";
import Icon from "@components/IcomoonIcon/Icon";
import USFlag from "@assets/images/united-states.png";

export default function Header() {
  console.log(USFlag);
  return (
    <header className="flex flex-row items-center justify-between  w-full h-16 px-6 py-3   border border-solid">
      <InputField
        contstyle="max-w-xs   border border-solid rounded"
        inputClassName="h-10 focus:border-gray-500"
        prefix={<Icon icon="search" size={16} color="gray" />}
        placeholder="Search"
        inputMode="search"
      />

      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <img src={USFlag} alt="US flag" className="h-5" />
          USD
        </div>

        <Icon icon="shopping-cart" size={20} color="gray" />

        <Icon icon="bell-o" size={20} color="gray" />

        <Icon icon="help-circle" size={20} color="gray" />
      </div>
    </header>
  );
}
