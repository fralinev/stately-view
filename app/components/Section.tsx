type SectionProps = {
  children: React.ReactNode;
  text: string;
};

export default function Section({ children, text }: SectionProps) {
  return (
    <div className="w-full max-w-[720px] bg-blue-900/20 border border-blue-950">
      <h2 className="px-10 py-3 bg-blue-900/30 text-blue-200 font-semibold ">
        {text}
      </h2>
      <div className="flex flex-col gap-5 p-6">
      {children}
      </div>
    </div>
  )
}