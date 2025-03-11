function VisionMore({enable = false}) {
  return (
    <div className={`font-poppin-regular w-screen text-lg md:flex flex-col gap-2 ${enable ? "flex":" hidden"} ` }>
      <p>Ipsum Lorem</p>
      <p className="text-lg">
        Lorem ipsum is here for the start of this application. This is the
        beginner text for Right now
      </p>
    </div>
  );
}

export default VisionMore;
