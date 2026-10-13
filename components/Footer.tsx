export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-neutral-500 sm:px-6 dark:text-neutral-400">
        <p>&copy; {year} Han, Ju-Sang (H-Software224)</p>
      </div>
    </footer>
  );
}
