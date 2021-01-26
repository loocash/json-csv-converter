import React, { useState, useEffect } from "react";
import { Editor } from "./Editor";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-monokai";

import json2csv, { isValidJson } from "../lib/json2csv";
import csv2json, { isValidCsv } from "../lib/csv2json";

export const Converter = ({ initialJson = "", initialCsv = "" }) => {
  const [json, setJson] = useState(initialJson);
  const [csv, setCsv] = useState(initialCsv);

  useEffect(() => {
    if (initialJson) {
      handleJsonChange(initialJson);
    }
    if (initialCsv) {
      handleCsvChange(initialJson);
    }
  }, [initialJson, initialCsv]);

  const handleJsonChange = (newJson) => {
    setJson(newJson);
    if (isValidJson(newJson)) {
      setCsv(json2csv(newJson));
    }
  };

  const handleCsvChange = (newCsv) => {
    setCsv(newCsv);
    if (isValidCsv(newCsv)) {
      setJson(csv2json(newCsv));
    }
  };

  return (
    <div className="Converter">
      <div>
        <h3>JSON</h3>
        <Editor mode="json" onChange={handleJsonChange} value={json} />
      </div>
      <div>
        <h3>CSV</h3>
        <Editor mode="text" onChange={handleCsvChange} value={csv} />
      </div>
    </div>
  );
};
