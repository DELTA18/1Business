
export default async function CreatePostPage() {

  const posttypes = [
    { id: 1, type: "Start your business" },
    { id: 2, type: "Share your Profession" },
    { id: 3, type: "Share your Thing" },
  ];
  return (
    <main className="flex flex-col items-center justify-center gap-10 p-24">
      <h1 className="text-7xl font-bold text-amber-200">Create Post</h1>
      <p className="text-lg text-gray-600">Select Which Type of Post You Want</p>

      <div>
        {posttypes.map((post) => (
          <div
            key={post.id}
            className="px-20 py-10 m-2 bg-blue-200 text-center rounded-lg cursor-pointer border-blue-600 border-2 hover:bg-blue-300"
          >
            <label className="text-2xl text-gray-900">{post.type}</label>
          </div>
        ))}
      </div>
      {/* Add your post creation form or component here */}
    </main>
  );
}