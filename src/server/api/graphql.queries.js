// const playerStatsFragment = `
// fragment playerStatsInfo on Player {
//  gameWeek {
//    stats {
//      apps subs gls asts mom cs con pensv ycard rcard
//    }
//    points {
//      apps subs gls asts mom cs con pensv ycard rcard total
//    }
//  }
//  total {
//    stats {
//      apps subs gls asts mom cs con pensv ycard rcard
//    }
//    points {
//      apps subs gls asts mom cs con pensv ycard rcard total
//    }
//  }
// }`;

const playerFragment = `
fragment playerInfo on Player {
  _id code pos name club
}`;

const leagueFragment = `
fragment leagueInfo on League {
  _id name tier
}`;

const teamFragment = `
fragment teamInfo on Team {
  _id user { id name } season { id name } league { id name } name
}`;

const seasonFragment = `
${leagueFragment}
fragment seasonInfo on Season {
  _id name currentGW isLive leagues { ...leagueInfo }
}
`;

export const getPlayersQuery = `
${playerFragment}
query ($player: String) { 
  getPlayers(player: $player){ 
    ...playerInfo
 }
} 
`;

export const getDashboardQuery = `
  query { getDashboard{ message } } 
`;

export const getSeasonsQuery = `
  ${seasonFragment}
  query { getSeasons{ ...seasonInfo } }
`;

export const getTeamQuery = `
  ${teamFragment}
  query ($leagueId: String, $userId: String) { getTeam(leagueId: $leagueId, userId: $userId){ ...teamInfo } } 
`;

export const getTeamsQuery = `
  ${teamFragment}
  query { getTeams{ ...teamInfo } } 
`;

export const addSeasonsMutation = `
  ${seasonFragment}
  mutation ($name: String) { addSeason(name: $name){ ...seasonInfo } }
`;

export const addLeaguesMutation = `
  ${leagueFragment}
  mutation ($seasonId: String, $name: String) { 
    addLeague(seasonId: $seasonId, name: $name){ ...leagueInfo } 
  }
`;

export const addUserMutation = `
  ${teamFragment}
  mutation ($seasonId: String, $leagueId: String, $name: String, $email: String) { 
    addUser(seasonId: $seasonId, leagueId: $leagueId, name: $name, email: $email){ ...teamInfo  } 
  }
`;

export const updatePlayersMutation = `
  mutation ($playerUpdates: [PlayerUpdates]) { 
    updatePlayers(playerUpdates: $playerUpdates){ id code pos name club }   
  }
`;

export const updateTeamMutation = `
  ${teamFragment}
  mutation ($teamUpdate: TeamUpdate) { 
    updateTeam(teamUpdate: $teamUpdate){ ...teamInfo }   
  }
`;
