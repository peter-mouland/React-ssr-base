import { buildSchema } from 'graphql';

export default buildSchema(`
  type MinDetail {
    id: String
    name: String
  }
  type Team {
    _id: String
    name: String
    user: MinDetail
    season: MinDetail
    league: MinDetail
  }
  type League {
    _id: String
    name: String
    tier: Int
  }
  type Season {
    _id: String!
    name: String
    isLive: Boolean
    currentGW: Int
    leagues: [League]
  }
  type Player {
    _id: String!
    code: String
    name: String
    pos: String
    club: String
  }
  type UpdatedPlayer { 
    id: String!
    code: String
    name: String
    pos: String
    club: String
  }
  type Stats {
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
  }

  type Points {
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
    total: Int
  }

  type GameWeek {
    stats: Stats
    points: Points
  }

  type Player {
    _id: String!
    name: String!
    code: Int
    pos: String
    club: String
    new: String
    gameWeek: GameWeek
    total: GameWeek
    pointsChange: Int
  }

  type User {
    _id: String!
    email: String!
    name: String
    mustChangePassword: Boolean
  }

  input TeamUpdate {
    club: String
    name: String
    pos: String
    id: String
  }

  input PlayerUpdates {
    club: String
    name: String
    pos: String
    id: String
  }
  
  type Dashboard {
    message: String!
  }
  
  type Query {
    getTeams: [Team]
    getSeasons: [Season]
    getPlayers(player: String): [Player]
    getUser(email: String, id: String): User
    getDashboard: Dashboard
  }
  
  type Mutation {
    updatePlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    addUser(seasonId: String, leagueId: String, email: String, name: String): Team
    addLeague(seasonId: String, name: String): League
    addSeason(name: String): Season
    updateTeam(teamUpdate: TeamUpdate): Team
  }
`);

