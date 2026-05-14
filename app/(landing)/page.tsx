import HeroSection from "./(landing)/components/home/hero";
import CategoriesSection from "./(landing)/components/home/categories";
import { getAllCategories } from "./services/category.services";
import ProductsSection from "./(landing)/components/home/products";
import { getAllProducts } from "./services/product.services";



export default async function Home() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <main>
      <HeroSection/>
      <CategoriesSection categories={categories}/>
      <ProductsSection products={products} />
    </main>
  );
}
