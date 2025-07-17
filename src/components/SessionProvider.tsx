'use client'

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
  session: null
}) {
  return <>{children}</>;
} 