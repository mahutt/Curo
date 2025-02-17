export default function PhoneOutline({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative w-[375px] h-[700px] border-black border-x-4 border-y-8 rounded-3xl overflow-hidden">
      {children}
    </div>
  )
}
