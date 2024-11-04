import CardList from "@/components/CardList";
import CategoryList from "@/components/CategoryList";
import Featured from "@/components/Featured";
import Menu from "@/components/Menu";

export default async function Home({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className="container">
      <Featured />
      <CategoryList />
      <div className="flex gap-[50px] max-md:flex-col">
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
