import { gameboardFactory } from "./gameboard";

export const playerFactory = (name) => {
  const player = {
    name: name,
    oponentGameboard: gameboardFactory(),

    submitAttack: function () {},
  };
  return player;
};
