export default function Unauthorized() {
  return (
    <div className="grow flex flex-col justify-center items-center text-primary-foreground">
      <h1 className="text-center text-8xl font-mondwest max-sm:text-5xl max-md:text-6xl max-lg:text-7xl">
        UnAuthorized
      </h1>
      <p className="text-center mt-8 text-2xl max-sm:text-base max-md:text-lg">
        Log In to Continue.
      </p>
    </div>
  );
}
