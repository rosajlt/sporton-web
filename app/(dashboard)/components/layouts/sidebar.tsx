"use client";

import { logout } from "@/app/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiBox, FiCreditCard, FiLayers, FiLogOut, FiShoppingCart } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const {push} = useRouter();

  const menuItems = [
    {
      name: "Products",
      icon: FiBox,
      link: "/admin/products",
    },
    {
      name: "Categories",
      icon: FiLayers,
      link: "/admin/categories",
    },
    {
      name: "Transactions",
      icon: FiShoppingCart,
      link: "/admin/transactions",
    },
    {
      name: "Bank Information",
      icon: FiCreditCard,
      link: "/admin/bank-info",
    },
  ];

  const handleLogout = () => { 
    logout();
    push("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 w-80 h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="px-14 py-8 border-b border-gray-100">
        <Image
          src="/logo-admin.svg"
          alt="logo admin"
          width={215}
          height={36}
        />
      </div>

      <div className="flex flex-col gap-2 mt-12 p-5 ">
        {menuItems.map((item, index) => {
          const isActive =  item.link === pathname;
          return (
            <Link
              key={index}
              href={item.link}
              className={`flex gap-3 items-center py-3 px-4.5 rounded-lg font-medium duration-300
                ${isActive ? "bg-primary/15 text-primary": "hover:bg-gray-100"}`}
            >
              <item.icon size={24} />
              <span>
                {item.name} 
              </span>
            </Link>
          );
        })}
      </div>
      <button 
      className="flex cursor-pointer gap-3 py-3 px-4.5 mx-5 font-medium hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-10"
      onClick={handleLogout}
      >
        <FiLogOut size={24} />
        Log Out
      </button>
    </aside>
  );
};

export default Sidebar;