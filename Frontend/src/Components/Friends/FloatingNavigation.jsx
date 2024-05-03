function FloatingNavigation({ page, setPage }) {
  const menuItems = [
    {
      id: 1,
      title: "Your Friends",
      href: "friends",
    },
    {
      id: 2,
      title: "Incoming Requests",
      href: "incoming-requests",
    },
    {
      id: 3,
      title: "Add Friends",
      href: "add-friends",
    },
  ];
  return (
    <div className="mx-auto my-6 flex max-w-sm flex-col rounded-lg bg-white text-black sm:max-w-4xl sm:flex-row">
      {menuItems.map((item) => (
        <div
          onClick={() => setPage(item.href)}
          key={item.id}
          className={`${
            page == item.href ? "bg-gray-200" : ""
          } flex w-full cursor-pointer items-center justify-center rounded-lg py-2 text-center font-medium transition-colors hover:bg-gray-200 sm:w-1/3`}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default FloatingNavigation;
