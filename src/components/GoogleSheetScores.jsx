import { useEffect, useRef, useState } from "react";
import { googleScoresConfig } from "../data/googleScores";

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];

    if (character === '"') {
      if (quoted && csv[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && csv[index + 1] === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);

  const [headers, ...data] = rows;
  return {
    headers: headers ?? [],
    rows: data.map((scoreRow) => headers.map((_, index) => scoreRow[index] ?? "")),
  };
}

function parseGoogleVisualization(response) {
  const columns = response.table?.cols ?? [];
  const rows = response.table?.rows ?? [];
  const headers = columns.map((column) => (column.label || column.id || "").trim());

  const isEmptyVisualization =
    headers.every((header) => !header || /^Col\d+$/i.test(header)) &&
    rows.every((row) => !row.c?.some((cell) => cell?.f || cell?.v));

  if (isEmptyVisualization) {
    return { headers: [], rows: [] };
  }

  return {
    headers,
    rows: rows.map((row) =>
      columns.map((_, index) => {
        const cell = row.c?.[index];
        return cell?.f ?? cell?.v ?? "";
      }),
    ),
  };
}

function loadGoogleVisualization(url) {
  return new Promise((resolve, reject) => {
    const callback = `avishkarSheetCallback${Date.now()}`;
    const script = document.createElement("script");
    const existingGoogle = window.google;
    const google = existingGoogle ?? {};
    const visualization = google.visualization ?? {};
    const query = visualization.Query ?? {};
    const existingCallback = query.setResponse;
    let finished = false;

    const cleanUp = () => {
      script.remove();
      if (existingCallback) {
        query.setResponse = existingCallback;
      } else {
        delete query.setResponse;
      }
      if (!existingGoogle) delete window.google;
    };

    query.setResponse = (response) => {
      if (finished) return;
      finished = true;
      cleanUp();
      resolve(parseGoogleVisualization(response));
    };
    visualization.Query = query;
    google.visualization = visualization;
    window.google = google;

    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callback}`;
    script.onerror = () => {
      if (finished) return;
      finished = true;
      cleanUp();
      reject(new Error("Unable to load the Google Sheet"));
    };
    document.head.appendChild(script);
  });
}

function getValue(row, headers, names) {
  const headerIndex = headers.findIndex((header) =>
    names.includes(header.toLowerCase().replace(/[^a-z0-9]/g, "")),
  );
  return headerIndex >= 0 ? row[headerIndex] : "";
}

function ScoreCards({ scores }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {scores.rows.map((row, index) => {
        const match = getValue(row, scores.headers, ["match", "matchno", "fixture"]) || `Match ${index + 1}`;
        const teamOne = getValue(row, scores.headers, ["team1", "teamone"]);
        const teamTwo = getValue(row, scores.headers, ["team2", "teamtwo"]);
        const scoreOne = getValue(row, scores.headers, ["team1score", "teamonescore", "score1"]);
        const scoreTwo = getValue(row, scores.headers, ["team2score", "teamtwoscore", "score2"]);
        const status = getValue(row, scores.headers, ["status"]);
        const updated = getValue(row, scores.headers, ["lastupdated", "updated"]);

        return (
          <article key={`${match}-${index}`} className="rounded-xl border border-zinc-800 bg-black/30 p-5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-bold text-zinc-300">{match}</span>
              {status && <span className="rounded-full bg-pink-500/20 px-3 py-1 font-bold text-pink-300">{status}</span>}
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
              <span className="font-bold leading-tight">{teamOne || "Team 1"}</span>
              <span className="rounded-lg bg-zinc-800 px-4 py-2 text-2xl font-black text-pink-300">{scoreOne || "0"}<span className="mx-2 text-zinc-500">–</span>{scoreTwo || "0"}</span>
              <span className="font-bold leading-tight">{teamTwo || "Team 2"}</span>
            </div>
            {updated && <p className="mt-4 text-center text-xs text-zinc-500">Updated: {updated}</p>}
          </article>
        );
      })}
    </div>
  );
}

function isLogoHeader(header) {
  return /logo|image|icon/i.test(header);
}

function isImageUrl(value) {
  return typeof value === "string" && /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(value);
}

function renderTableCellValue(header, value) {
  if (value && (isLogoHeader(header) || isImageUrl(value))) {
    return (
      <div className="flex items-center justify-center">
        <img
          src={value}
          alt={isLogoHeader(header) ? `${header} image` : "logo"}
          className="h-12 w-12 min-w-[48px] rounded-full border border-zinc-800 object-cover"
        />
      </div>
    );
  }

  return value || "—";
}

function ScoreTable({ scores, title, previous = false }) {
  return (
    <div className={previous ? "opacity-70" : ""}>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-400">{title}</h4>
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-full table-auto text-left">
          <thead className="bg-zinc-800/80 text-[10px] uppercase tracking-[0.25em] text-pink-300 sm:text-xs">
            <tr>{scores.headers.map((header, index) => <th key={`${header}-${index}`} className="px-3 py-2 text-left align-top break-words">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-sm sm:text-base">
            {scores.rows.map((row, rowIndex) => (
              <tr key={`${row.join("-")}-${rowIndex}`}>
                {row.map((value, index) => (
                  <td key={`${value}-${index}`} className="px-3 py-2 align-top break-words">
                    {renderTableCellValue(scores.headers[index], value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GoogleSheetScores() {
  const [scores, setScores] = useState({ headers: [], rows: [] });
  const latestScoresRef = useRef({ headers: [], rows: [] });
  const [previousScores, setPreviousScores] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("avishkar-previous-score-sheet")) || null;
    } catch {
      return null;
    }
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!googleScoresConfig.csvExportUrl) return undefined;

    let active = true;
    const loadScores = async () => {
      try {
        let nextScores = { headers: [], rows: [] };
        let loadedFromCsv = false;

        if (googleScoresConfig.csvExportUrl) {
          try {
            const csvText = await (await fetch(googleScoresConfig.csvExportUrl, { cache: "no-store" })).text();
            nextScores = parseCsv(csvText);
            loadedFromCsv = nextScores.headers.length || nextScores.rows.length;
          } catch {
            nextScores = { headers: [], rows: [] };
          }
        }

        if (!loadedFromCsv && googleScoresConfig.visualizationUrl) {
          try {
            nextScores = await loadGoogleVisualization(googleScoresConfig.visualizationUrl);
          } catch {
            nextScores = nextScores.headers.length || nextScores.rows.length ? nextScores : { headers: [], rows: [] };
          }
        }

        if (!nextScores.headers.length && !nextScores.rows.length) {
          throw new Error("No score data available");
        }

        if (active) {
          const currentScores = latestScoresRef.current;
          const currentSnapshot = JSON.stringify(currentScores);
          const nextSnapshot = JSON.stringify(nextScores);

          if (currentScores.headers.length && currentSnapshot !== nextSnapshot) {
            setPreviousScores(currentScores);
            window.localStorage.setItem("avishkar-previous-score-sheet", currentSnapshot);
          }

          latestScoresRef.current = nextScores;
          setScores(nextScores);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    };

    loadScores();
    const refreshId = window.setInterval(
      loadScores,
      googleScoresConfig.refreshIntervalMs,
    );

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

  if (!googleScoresConfig.publishedCsvUrl) return null;

  const hasData = scores.headers.length > 0 || scores.rows.length > 0;

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Live sheet updates</h3>
        <span className="text-xs text-zinc-500">Refreshes every 30 seconds</span>
      </div>
      {status === "error" ? (
        <p className="rounded-xl border border-zinc-800 px-5 py-4 text-zinc-400">
          Match scores are temporarily unavailable.
        </p>
      ) : !hasData ? (
        <p className="rounded-xl border border-zinc-800 px-5 py-4 text-zinc-400">
          Live scores will appear here once the sheet is populated.
        </p>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <ScoreTable scores={scores} title="Current update" />
          {previousScores && <ScoreTable scores={previousScores} title="Previous update" previous />}
        </div>
      )}
    </div>
  );
}

export default GoogleSheetScores;
