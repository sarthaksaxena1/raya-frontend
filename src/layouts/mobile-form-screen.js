export const MobileFormScreenLayout = ({ children }) => {
  return (
    <div className="w-full bg-white min-h-screen overflow-y-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <img src="/raya_logo.png" alt="raya logo" />
      </div>
      {children}
    </div>
  );
};
