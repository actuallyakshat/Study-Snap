export const Testimonials = () => {
  const data = [
    {
      name: "Akshat Dubey",
      course: "BTECH CSE",
      review: "I really enjoyed using this project",
    },
    {
      name: "John Doe",
      course: "BCOM ECO",
      review: "I really enjoyed using this project",
    },
  ];

  return (
    <div className="min-h-screen w-full h-full flex items-center justify-center testimonial py-8">
      <div className="max-w-[80rem] w-full rounded-xl h-[50rem] bg-black relative overflow-hidden">
        <div className="flex flex-col border border-gray-800 bg-primaryPurple/20 w-full h-full items-center rounded-t-xl">
          <div className="text-4xl flex justify-between font-semibold bg-spaceBlack/80 w-full py-7 rounded-t-xl px-8">
            <h1>Testimonials</h1>
            <div className="flex items-center gap-3">
              <div className="size-4 bg-red-600 rounded-full"></div>
              <div className="size-4 bg-yellow-600 rounded-full"></div>
              <div className="size-4 bg-green-600 rounded-full"></div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center flex-col">
            {data.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide ${index === 0 ? "active" : ""}`}
              >
                <img
                  src="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
                  alt=""
                  className="rounded-full size-40"
                />
                <h2 className="text-xl font-semibold text-white">
                  {testimonial.name}
                </h2>
                <p className="text-gray-200">{testimonial.course}</p>
                <p className="text-gray-300">{testimonial.review}</p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-center mb-6">
            {data.map((_, index) => (
              <button
                key={index}
                className="testimonial-nav-dot mx-2 w-4 h-4 bg-gray-400 rounded-full"
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
