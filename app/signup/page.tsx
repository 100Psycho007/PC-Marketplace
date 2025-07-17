import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Sign Up As</h1>
        <div className="flex flex-col gap-6">
          <Link href="/signup/consumer" className="block w-full text-center py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition">Consumer</Link>
          <Link href="/signup/technician" className="block w-full text-center py-4 rounded-xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition">Technician</Link>
          <Link href="/signup/dealer" className="block w-full text-center py-4 rounded-xl bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition">Dealer</Link>
        </div>
      </div>
    </div>
  );
} 