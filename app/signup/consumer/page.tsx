export default function ConsumerSignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="bg-white/80 rounded-3xl p-8 border border-blue-200 shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up as Consumer</h1>
        {/* TODO: Integrate with Neon Auth and assign role 'consumer' */}
        <p className="text-center text-gray-600">Signup form for consumers goes here.</p>
      </div>
    </div>
  );
} 