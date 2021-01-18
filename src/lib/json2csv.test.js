import json2csv from "./json2csv";

const exampleTable = [
  {
    Year: 1997,
    Make: "Ford",
    Model: "E350",
    Description: "ac, abs, moon",
    Price: "3000.00",
  },
  {
    Year: 1999,
    Make: "Chevy",
    Model: `Venture "Extended Edition"`,
    Description: "",
    Price: "4900.00",
  },
  {
    Year: 1999,
    Make: "Chevy",
    Model: `Venture "Extended Edition, Very Large"`,
    Description: "",
    Price: "5000.00",
  },
  {
    Year: 1996,
    Make: "Jeep",
    Model: "Grand Cherokee",
    Description: `MUST SELL!
air, moon roof, loaded`,
    Price: "4799.00",
  },
];

const exampleCSV = `Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""",,4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!
air, moon roof, loaded",4799.00`;

test("produces an empty csv for edge cases json", () => {
  const edgeCases = ["[]", "{}", "", 5, undefined, null, false];

  edgeCases.forEach((edgeCase) => {
    const gotCsv = json2csv(edgeCase);
    expect(gotCsv).toBe("");
  });
});

test("produces a valid csv for common cases json", () => {
  const tests = [
    {
      json: `[{"Year":"1997","Make":"Ford","Model":"E350"},
{"Year":"2000","Make":"Mercury","Model":"Cougar"}]`,
      csv: `Year,Make,Model
1997,Ford,E350
2000,Mercury,Cougar`.trim(),
    },
    {
      json: JSON.stringify(exampleTable),
      csv: exampleCSV,
    },
  ];

  tests.forEach((test) => {
    const gotCsv = json2csv(test.json);
    expect(gotCsv).toBe(test.csv);
  });
});

test("throws an error for a nested json", () => {
  const nestedJson = JSON.stringify({
    a: {
      b: "c",
    },
  });

  expect(() => json2csv(nestedJson)).toThrow();
});
