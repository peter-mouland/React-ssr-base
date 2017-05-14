const STARTING_XI = 'apps';
const SUBS = 'subs';
const GOALS = 'gls';
const ASSISTS = 'asts';
const YELLOW_CARDS = 'ycard';
const RED_CARDS = 'rcard';
const CLEAN_SHEETS = 'cs';
const CONCEEDED = 'con';
const SAVED_PENALTIES = 'pensv';

export function forStarting(starts) { // starting a match 3 point
  return starts * 3;
}

export function forSub(subs) { // sub = 1 point
  return subs * 1;
}

export function forGoals(goals, position) { // depends on position
  let multiplier = 0;
  if (position === 'GK') {
    multiplier = 10;
  } else if (position === 'FB' || position === 'CB') {
    multiplier = 8;
  } else if (position === 'WM' || position === 'CM') {
    multiplier = 6;
  } else if (position === 'STR') {
    multiplier = 4;
  }
  return goals * multiplier;
}

export function forAssists(assists) { // assist = 3 points
  return assists * 3;
}

export function forYellowCards(yc) { // -2
  return parseInt(yc * -2, 10);
}

export function forRedCards(rc) { // -5
  return parseInt(rc * -5, 10);
}

export function forCleanSheet(cs, position) { // 5
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'GK') {
    multiplier = 5;
  } else {
    multiplier = 0;
  }
  return cs * multiplier;
}

export function forConceeded(ga, position) { // -1
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'GK') {
    multiplier = -1;
  } else {
    multiplier = 0;
  }
  return parseInt(ga * multiplier, 10);
}

function forPenaltiesSaved(ps) { // -1
  return ps * 5;
}

export function forPlayer(stats, pos) {
  const starts = forStarting(stats[STARTING_XI], pos);
  const subs = forSub(stats[SUBS], pos);
  const goals = forGoals(stats[GOALS], pos);
  const asts = forAssists(stats[ASSISTS], pos);
  const cs = forCleanSheet(stats[CLEAN_SHEETS], pos);
  const con = forConceeded(stats[CONCEEDED], pos);
  const penSvd = forPenaltiesSaved(stats[SAVED_PENALTIES], pos);
  const yells = forYellowCards(stats[YELLOW_CARDS], pos);
  const reds = forRedCards(stats[RED_CARDS], pos);
  const total = goals + yells + reds + starts + subs + asts + cs + con + penSvd;
  return {
    starts: stats[STARTING_XI],
    subs: stats[SUBS],
    goals: stats[GOALS],
    asts: stats[ASSISTS],
    cs: stats[CLEAN_SHEETS],
    con: stats[CONCEEDED],
    penSvd: stats[SAVED_PENALTIES],
    yells: stats[YELLOW_CARDS],
    reds: stats[RED_CARDS],
    total
  };
}

export default function forPlayers(players) {
  return players.map((player) => {
    const ffPoints = forPlayer(player, player.pos);
    return {
      ...player,
      ffPoints
    };
  });
}
