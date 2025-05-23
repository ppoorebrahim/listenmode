import ErrorBoundary from "@/components/ErrorBoundary"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="w-full h-full overflow-hidden">{children}</div>
    </ErrorBoundary>
  )
}
