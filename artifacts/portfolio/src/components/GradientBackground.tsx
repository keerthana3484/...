export default function GradientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] animate-drift1" />
      <div className="absolute top-[40%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-orange-900/10 blur-[150px] animate-drift2" />
      <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-stone-800/20 blur-[100px] animate-drift3" />
    </div>
  );
}
