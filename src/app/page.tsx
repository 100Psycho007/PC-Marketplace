import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x1080/2563eb/ffffff?text=PC+Marketplace"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build Your Dream PC
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Find the perfect components, get expert advice, and build your ideal PC
            with our comprehensive marketplace.
          </p>
          <div className="mt-10">
            <Link
              href="/builder"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Start Building
            </Link>
          </div>
        </div>
      </div>

      {/* Featured categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900">Featured Categories</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'CPUs',
              description: 'Find the perfect processor for your build',
              image: 'https://placehold.co/600x400/2563eb/ffffff?text=CPUs',
            },
            {
              title: 'GPUs',
              description: 'Power your gaming and creative work',
              image: 'https://placehold.co/600x400/2563eb/ffffff?text=GPUs',
            },
            {
              title: 'Motherboards',
              description: 'The foundation of your PC build',
              image: 'https://placehold.co/600x400/2563eb/ffffff?text=Motherboards',
            },
          ].map((category) => (
            <div
              key={category.title}
              className="relative rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-medium text-gray-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {category.description}
                </p>
                <Link
                  href={`/listings?category=${category.title.toLowerCase()}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Browse {category.title}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Professional Services
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'PC Assembly',
                description:
                  'Let our experts build your PC with precision and care',
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Technical Support',
                description:
                  'Get help with troubleshooting and maintenance',
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Custom Builds',
                description:
                  'Get a custom PC built to your exact specifications',
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                ),
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-primary-600">{service.icon}</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {service.description}
                </p>
                <Link
                  href="/technicians"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Find a Technician
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 