import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-container flex-col gap-16 px-12 py-6">
      <Hero />
      <Library />
    </div>
  );
}
