export default function PCVLayout({ children, fullHeight = false }) {
  return (
    <div 
      className={`bg-white text-[#0066ff] ${
        fullHeight ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      <div className="max-w-3xl pl-32 md:pl-40 pr-6 pt-20 pb-12">
        {children}
      </div>
    </div>
  )
}
