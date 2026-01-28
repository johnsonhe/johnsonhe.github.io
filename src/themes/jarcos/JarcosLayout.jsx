export default function JarcosLayout({ children, fullHeight = false }) {
  return (
    <div 
      className={`bg-jarcos-bg text-jarcos-text ${
        fullHeight ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      <div className={fullHeight ? '' : 'pt-20 pb-12 px-6'}>
        {children}
      </div>
    </div>
  )
}
