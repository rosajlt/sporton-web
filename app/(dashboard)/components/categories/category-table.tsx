import priceFormatter from "@/app/utils/price-formatter";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

type TCategoryTableProps = {
    categories: Category[];
    onDelete: (category: Category) => void;
    onEdit: (id: string) => void;
}

const CategoryTable = ({ categories, onDelete, onEdit }: TCategoryTableProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Category Name</th>
                        <th className="px-6 py-4 font-semibold">Description</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((data, index) => (
                        <tr 
                            key={index} 
                            className="border-b border-gray-200 last:border-b-0"
                            >
                            <td className="px-6 py-4 font-medium">
                                <div className="flex gap-2 items-center">
                                <div className="aspect-square bg-gray-100 rounded-md">
                                    <Image src={getImageUrl(data.imageUrl)} width={52} height={52} alt={data.name} className="aspect-square object-contain" />
                                </div>
                                <span>{data.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                {data.description}
                            </td>
                            <td className="px-6 py-7.5 flex items-center gap-3 text-gray-600">
                               <button onClick={() => onEdit?.(data._id)} className="cursor-pointer">
                                <FiEdit2 size={20} />
                               </button> 
                               <button onClick={() => onDelete?.(data)} className="cursor-pointer">
                                <FiTrash2 size={20} />
                               </button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default CategoryTable;