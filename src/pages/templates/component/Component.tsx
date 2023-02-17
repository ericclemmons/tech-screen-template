export default function Component() {
  return (
    <section className="flex space-x-8">
      <aside className="flex-none w-64 shadow-lg rounded-xl p-8 bg-orange-200">
        Aside
      </aside>
      <main className="flex-auto shadow-lg rounded-xl p-8 bg-fuchsia-200">
        Main
      </main>
    </section>
  );
}
