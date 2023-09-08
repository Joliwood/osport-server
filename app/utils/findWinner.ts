const findWinnerTeam = (scoreTeam1: number, scoreTeam2: number): number => {
  if (scoreTeam1 > scoreTeam2) {
    return 1;
  }
  if (scoreTeam1 < scoreTeam2) {
    return 2;
  }
  return 0;
};

export default findWinnerTeam;
