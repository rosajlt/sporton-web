"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBox, FiCreditCard, FiLayers } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();

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
      icon: FiCreditCard,
      link: "/admin/transactions",
    },
    {
      name: "Bank Information",
      icon: FiCreditCard,
      link: "/admin/bank-information",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-white border-r border-gray-200">
      
      {/* Logo */}
      <div className="px-8 py-7 border-b border-gray-100">
        <Image
          src="/logo-admin.svg"
          alt="logo admin"
          width={180}
          height={40}
        />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 p-6 mt-6">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.link;

          return (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <item.icon size={22} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;