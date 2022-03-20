import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import CSVReader from "react-csv-reader";

import { uploadProperties } from "../util/api";
import { APP_NAME } from "../util/constants";

function UploadPage(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const upload = async (data, fileInfo, originalFile) => {
    console.log("upload", data, fileInfo, originalFile);
    setLoading(true);
    try {
      const [keys, ...values] = data;
      const properties = values.map((array) =>
        array.reduce((a, v, i) => ({ ...a, [keys[i]]: v }), {})
      );

      const body = { properties };
      await uploadProperties(body);
      setData(properties);
    } catch (e) {
      alert(e.toString());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Upload new property data</h1>
      <p>
        To load data into the graph, follow the guide{" "}
        <a
          href="https://support.redfin.com/hc/en-us/articles/360016476931-Downloading-Data"
          target="_blank"
        >
          here
        </a>
        &nbsp; and upload the CSV to the {APP_NAME} index.
      </p>
      <CSVReader onFileLoaded={upload} />
      {data && (
        <div className="success">Successfully uploaded {data.length} rows.</div>
      )}
    </div>
  );
}

export default UploadPage;
