// This Sheet must be shared as "Anyone with the link: Viewer" or published as CSV.
// Keep the headers in public/pickleball-season-2-live-scores-template.csv.
const spreadsheetId = "14pumiAfq_KFrxzHjSN5rx_I0YQPtO88aItENwMPqxLc";
const sheetGid = "0";
const csvExportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${sheetGid}`;
const visualizationUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${sheetGid}`;

export const googleScoresConfig = {
  spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?gid=${sheetGid}#gid=${sheetGid}`,
  publishedCsvUrl: csvExportUrl,
  csvExportUrl,
  visualizationUrl,
  refreshIntervalMs: 30000,
};
