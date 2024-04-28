import React from "react";

const Widget = () => {
  return (
    <div className="ml-6 h-[790px] max-h-[790px]">
      <iframe
        src="https://www.linkedin.com/embed/feed/update/urn:li:share:6800334336500006400"
        title="Embedded post"
        className="w-fit 2xl:min-w-[400px] h-full"
      />
    </div>
  );
};

export default Widget;
