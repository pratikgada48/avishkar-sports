import { useEffect, useState } from "react";
import { superscoreTournament } from "../data/superscoreTournament";
import GoogleSheetScores from "./GoogleSheetScores";
import { googleScoresConfig } from "../data/googleScores";

const mediaBaseUrl = "https://mscsuper.blr1.digitaloceanspaces.com";

function formatDate(value) {
  if (!value) return "To be announced";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatStatus(tournament) {
  const today = new Date();
  const startDate = tournament.from_date ? new Date(tournament.from_date) : null;
  const endDate = tournament.to_date ? new Date(tournament.to_date) : null;

  if (startDate && today < startDate) return "Upcoming";
  if (endDate && today > endDate) return "Completed";
  return "Live";
}

function getTeamLogo(path, logo) {
  const baseUrl = path || mediaBaseUrl;
  return `${baseUrl.replace(/\/$/, "")}/${logo}`;
}

function SuperscoreTournament({ compact = false }) {
  const [data, setData] = useState({ tournament: null, teams: [], teamPath: "" });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const loadTournament = async () => {
      try {
        const tournamentUrl = `${superscoreTournament.apiBaseUrl}/tournaments/global-tournaments/0?tnid=${superscoreTournament.id}`;
        const teamsUrl = `${superscoreTournament.apiBaseUrl}/teams/tournament-teams-gen/${superscoreTournament.id}`;
        const [tournamentResponse, teamsResponse] = await Promise.all([
          fetch(tournamentUrl, { cache: "no-store" }),
          fetch(teamsUrl, { cache: "no-store" }),
        ]);

        if (!tournamentResponse.ok || !teamsResponse.ok) {
          throw new Error("Unable to load tournament");
        }

        const tournamentPayload = await tournamentResponse.json();
        const teamsPayload = await teamsResponse.json();
        const tournament = tournamentPayload.data?.list?.[0];

        if (!tournament) throw new Error("Tournament not found");

        if (active) {
          setData({
            tournament,
            teams: teamsPayload.data?.list ?? [],
            teamPath: teamsPayload.data?.path ?? "",
          });
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    };

    loadTournament();
    const refreshId = window.setInterval(
      loadTournament,
      superscoreTournament.refreshIntervalMs,
    );

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

  if (status !== "ready") {
    return (
      <section className={compact ? "mt-8" : "pb-16"} aria-live="polite">
        <div className={compact ? "" : "px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"}>
          <p className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-6 py-5 text-center text-zinc-300">
            {status === "loading"
              ? "Loading live tournament details…"
              : "Live tournament details are temporarily unavailable. Please refresh in a moment."}
          </p>
        </div>
      </section>
    );
  }

  const { tournament, teams, teamPath } = data;
  const tournamentStatus = formatStatus(tournament);
  const sortedTeams = [...teams].sort(
    (first, second) => Number(second.point) - Number(first.point),
  );

  return (
    <section className={compact ? "mt-8" : "pb-16"} aria-live="polite">
      <div className={compact ? "" : "px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"}>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 md:p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500" />
                </span>
                <span className="font-bold tracking-widest text-pink-400">{tournamentStatus.toUpperCase()} TOURNAMENT</span>
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-black">{tournament.title}</h2>
              <p className="mt-2 text-zinc-300">
                {tournament.sport} · Season {tournament.season} · {tournament.city}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                {formatDate(tournament.from_date)} – {formatDate(tournament.to_date)}
              </p>
            </div>
            <a
              href={superscoreTournament.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 justify-center rounded-xl border border-pink-500 px-5 py-3 font-bold text-pink-300 transition hover:bg-pink-500 hover:text-white"
            >
              View on SuperScore ↗
            </a>
          </div>

          {!compact && (
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Format</span>{tournament.type || "—"}</div>
              <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Game points</span>{tournament.game_point || "—"}</div>
              <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Win points</span>{tournament.win_point ?? "—"}</div>
              <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Teams</span>{teams.length}</div>
            </div>
          )}

          {!googleScoresConfig.publishedCsvUrl && <div className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold">Live standings</h3>
              <span className="text-xs text-zinc-500">Refreshes every 30 seconds</span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full min-w-[620px] text-left">
                <thead className="bg-zinc-800/80 text-xs uppercase tracking-wide text-pink-300">
                  <tr>
                    <th className="px-4 py-3">#</th><th className="px-4 py-3">Team</th><th className="px-4 py-3 text-center">P</th><th className="px-4 py-3 text-center">W</th><th className="px-4 py-3 text-center">L</th><th className="px-4 py-3 text-center">T</th><th className="px-4 py-3 text-center">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {sortedTeams.map((team, index) => (
                    <tr key={team.tmid}>
                      <td className="px-4 py-3 text-zinc-400">{index + 1}</td>
                      <td className="px-4 py-3 font-semibold"><div className="flex items-center gap-3">{team.logo && <img className="h-8 w-8 rounded-full object-cover bg-white" src={getTeamLogo(teamPath, team.logo)} alt="" />}<span>{team.name}</span></div></td>
                      <td className="px-4 py-3 text-center">{team.pmatch ?? 0}</td><td className="px-4 py-3 text-center">{team.win ?? 0}</td><td className="px-4 py-3 text-center">{team.lose ?? 0}</td><td className="px-4 py-3 text-center">{team.tie ?? 0}</td><td className="px-4 py-3 text-center font-bold text-pink-300">{team.point ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}

          <GoogleSheetScores />
        </div>
      </div>
    </section>
  );
}

export default SuperscoreTournament;
