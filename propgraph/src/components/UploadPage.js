import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import CSVReader from "react-csv-reader";

import { uploadProperties } from "../util/api";

function UploadPage(props) {
  const [loading, setLoading] = useState(false);
  const upload = async (data, fileInfo, originalFile) => {
    console.log("upload", data, fileInfo, originalFile);
    setLoading(true);
    try {
      const body = { properties: data };
      await uploadProperties(body);
    } catch (e) {
      alert(e.toString());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h1>Upload new property data</h1>
      <p>
        To load data into the graph, follow the guide{" "}
        <a
          href="https://support.redfin.com/hc/en-us/articles/360016476931-Downloading-Data"
          target="_blank"
        >
          here
        </a>
      </p>{" "}
      and upload the CSV to the PropGraph index.
      <CSVReader onFileLoaded={upload} />
    </div>
  );
}

export default UploadPage;
