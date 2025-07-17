export default function TechnicianSignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-300 to-green-500">
      <div className="bg-white/80 rounded-3xl p-8 border border-green-200 shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up as Technician</h1>
        {/* TODO: Integrate with Neon Auth and assign role 'technician' */}
        <p className="text-center text-gray-600">Signup form for technicians goes here.</p>
      </div>
    </div>
  );
} 