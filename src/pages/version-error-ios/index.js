import { Card } from "antd";

export const VersionErrorIos = () => {
  return (
    <div className="w-full bg-white max-h-screen overflow-y-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <img src="/raya_logo.png" alt="raya logo" />
      </div>

      <Card
        title={<p className="text-red-500">Error</p>}
        className="mt-40 mb-40 w-3/4 ml-auto mr-auto rounded-lg shadow-md"
      >
        <p>
          Your Raya Health application is out of date.Please download the latest
          version to continue using the app!
        </p>
        <p className="pt-4">
          <a
            href="https://apps.apple.com/us/app/raya-health/id1579844338"
            className="text-blue-500"
          >
            Click here
          </a>{" "}
          to update your app
        </p>
      </Card>
    </div>
  );
};
