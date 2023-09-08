import type { Player, TeamGeneratorConfig } from '../@types/index.js';
import UserOnSport from '../models/user_on_sport.js';
import prisma from '../helpers/db.client.js';
// import Cache from './cache.js';

/* eslint-disable */

export async function generateBalancedTeam(event_id: number) {

  const event = await prisma.event.findUnique({
    where: {
      id: event_id,
    }
  });

  if (!event) throw new Error('Event not found');

  const required_participants = event.nb_max_participant;

  const participants = await prisma.event_on_user.findMany({
    where: {
      event_id,
      status: 'accepted'
    }
  });

  if (participants.length < required_participants) throw new Error('Not enough participants');

  // @ts-ignore
  const idsParticipants = participants.map((p) => p.user_id);

  const queriesRatings = idsParticipants.map((id) => UserOnSport.getRating(id, event.sport_id));

  const valueRating = await Promise.all(queriesRatings);

  const ids = Object.values(valueRating.map((rating) => rating.user_id))
  const values = Object.values(valueRating.map((value) => value.gb_rating)) as number[];

  const team1: Player[] = [];
  const team2: Player[] = [];

  const config = {
    team1,
    team2,
    ids,
    values,
    participants: required_participants,
  };

  const { team_1, team_2 } = divideInTeam(config);

  if (!team_1 || !team_2) throw new Error('Teams are not created')

  if (team_1.length !== team_2.length) throw new Error('Teams are not balanced')

  const updateParticipantsTeam1 = team_1.map((p) => prisma.event_on_user.update({
    where: {
      event_id_user_id: {
        user_id: p.id,
        event_id,
      }
    },
    data: {
      team: 1,
    }
  }))

  const updateParticipantsTeam2 = team_2.map((p) => prisma.event_on_user.update({
    where: {
      event_id_user_id: {
        user_id: p.id,
        event_id,
      }
    },
    data: {
      team: 2,
    }
  }))

  const allUpdates = [...updateParticipantsTeam1, ...updateParticipantsTeam2];

  await Promise.all(allUpdates);

  // await Cache.del([`participant${event_id}`]);

  return { team_1, team_2 };
}

export function divideInTeam(config: TeamGeneratorConfig) {

  if (config.participants % 2 !== 0) return { error: 'participants must be even' };

  const value_team_1 = getTeamValue(config.team1);
  const value_team_2 = getTeamValue(config.team2);

  const max_index = getMaxIndex(config.values);

  const player = getPlayerObject(max_index, config.ids, config.values);

  function checkIfValueIsZero() {
    if (player.rating === 0) {
      config.team1.length < config.team2.length ? config.team1.push(player) : config.team2.push(player);
    } else {
      useRandomConditionAtStart(
        config.participants,
        config.ids,
        value_team_1,
        value_team_2,
      )
        ? config.team1.push(player)
        : config.team2.push(player);
    }
  }
  checkIfValueIsZero();

  deleteFromArrayAfterPush(config.ids, config.values, max_index);

  if (config.ids.length !== 0) {
    divideInTeam(config);
  }
  return { team_1: config.team1, team_2: config.team2 };
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function useRandomConditionAtStart(
  participants: number,
  idsArray: number[],
  value_team_1: number,
  value_team_2: number,
) {
  if (participants === idsArray.length) {
    const random_nb_start = getRandomArbitrary(0, 1);
    return random_nb_start > 0.5;
  }
  return value_team_1 < value_team_2;
}

export function deleteFromArrayAfterPush(ids: number[], values: number[], index: number) {
  ids.splice(index, 1);
  values.splice(index, 1);
}

export function getMaxIndex(values: number[]): number {
  const max_values = Math.max(...values);
  return values.findIndex((v) => v === max_values);
}

export function getPlayerObject(max_index: number, ids: number[], values: number[]): Player {
  const player: Player = {
    id: Number(ids[max_index]),
    rating: values[max_index],
  };
  return player;
}

export function getTeamValue(array_team: Player[]): number {
  return array_team.length > 0 ? array_team.map((p) => {
    const value = p.rating;
    return value;
  }).reduce((a, b) => a + b) : 0;
}

/* eslint-enable */
