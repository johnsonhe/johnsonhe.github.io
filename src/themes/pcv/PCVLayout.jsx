export default function PCVLayout({ children, fullHeight = false }) {
  return (
    <div 
      className={`bg-white text-[#0066ff] ${
        fullHeight ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      <div className="ml-28 md:ml-36 px-6 md:px-8 pt-20 pb-12 max-w-4xl">
        {children}
      </div>
    </div>
  )
}
