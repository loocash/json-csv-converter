import csv2json, { normalizeValues } from "./csv2json";

const exampleTable = [
  {
    Year: "1997",
    Make: "Ford",
    Model: "E350",
    Description: "ac, abs, moon",
    Price: "3000.00",
  },
  {
    Year: "1999",
    Make: "Chevy",
    Model: 'Venture "Extended Edition"',
    Description: "",
    Price: "4900.00",
  },
  {
    Year: "1999",
    Make: "Chevy",
    Model: 'Venture "Extended Edition, Very Large"',
    Description: "",
    Price: "5000.00",
  },
  {
    Year: "1996",
    Make: "Jeep",
    Model: "Grand Cherokee",
    Description: `MUST SELL! air, moon roof, loaded`,
    Price: "4799.00",
  },
];

const exampleCSV = `Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""",,4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL! air, moon roof, loaded",4799.00`;

test("produces an empty json for edge cases csv", () => {
  const edgeCases = ["", "Ala,ma,kota", undefined, null, false];

  edgeCases.forEach((edgeCase) => {
    const gotJson = csv2json(edgeCase);
    expect(gotJson).toBe("");
  });
});

test("produces a valid json for common cases csv", () => {
  const tests = [
    {
      json: `[{"Year":"1997","Make":"Ford","Model":"E350"},{"Year":"2000","Make":"Mercury","Model":"Cougar"}]`,
      csv: `Year,Make,Model
1997,Ford,E350
2000,Mercury,Cougar`.trim(),
    },
    {
      json: `{\"Year\":\"1999\",\"Make\":\"Chevy\",\"Model\":\"Venture \\\"Extended Edition\\\"\",\"Description\":\"\",\"Price\":\"4900.00\"}`,
      csv: `Year,Make,Model,Description,Price
1999,Chevy,"Venture ""Extended Edition""",,4900.00`,
    },
    {
      json: JSON.stringify(exampleTable),
      csv: exampleCSV,
    },
  ];

  tests.forEach((test) => {
    const gotJson = csv2json(test.csv);
    expect(gotJson).toBe(test.json);
  });
});

test("normalizeValues gives proper results", () => {
  const tests = [
    {
      in: `1997,Ford,E350,"ac, abs, moon",3000.00`.split(","),
      want: ["1997", "Ford", "E350", "ac, abs, moon", "3000.00"],
    },
    {
      in: `1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00`.split(
        ","
      ),
      want: [
        "1999",
        "Chevy",
        'Venture "Extended Edition, Very Large"',
        "",
        "5000.00",
      ],
    },
    {
      in: `1999,Chevy,"Venture ""Extended Edition""",,4900.00`.split(","),
      want: ["1999", "Chevy", 'Venture "Extended Edition"', "", "4900.00"],
    },
  ];

  tests.forEach((test) => {
    const got = normalizeValues(test.in);
    expect(got).toEqual(test.want);
  });
});
