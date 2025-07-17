export default function DealerSignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-purple-300 to-purple-500">
      <div className="bg-white/80 rounded-3xl p-8 border border-purple-200 shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up as Dealer</h1>
        {/* TODO: Integrate with Neon Auth and assign role 'dealer' */}
        <p className="text-center text-gray-600">Signup form for dealers goes here.</p>
      </div>
    </div>
  );
} 