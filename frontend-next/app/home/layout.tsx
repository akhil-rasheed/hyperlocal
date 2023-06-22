import Sidebar from "../components/sidebar/Sidebar";
import getCurrentUser from "../actions/auth/getCurrentUser";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
