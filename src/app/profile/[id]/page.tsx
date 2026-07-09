type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserProfilePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Profile
        </h1>

        <hr className="mb-6 border-gray-300" />

        <p className="text-lg text-gray-700">
          Welcome to your profile
        </p>

        <div className="mt-6">
          <span className="text-gray-500">User ID</span>

          <div className="mt-2 inline-block rounded-lg bg-red-500 px-4 py-2 text-lg font-semibold text-white shadow-md">
            {id}
          </div>
        </div>
      </div>
    </div>
  );
}