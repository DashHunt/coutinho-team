export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="container flex flex-col gap-4 px-4 py-4 sm:gap-6 mx-auto">
    {children}
  </div>;
};
