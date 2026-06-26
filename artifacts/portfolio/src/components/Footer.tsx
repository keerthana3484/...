export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-border mt-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-3xl font-serif text-primary">Ajay Tharendra</h2>
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Creative Video Editor • Motion Designer
        </p>
        <div className="w-12 h-px bg-border my-4" />
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Ajay Tharendra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
