// Player data mock - Real-feeling data for The Lineup
import athleteSpence from "@/assets/athlete-spence.png";
import athleteAward from "@/assets/athlete-award.png";
import athleteFocus from "@/assets/athlete-focus.png";
import athleteGoalkeeper from "@/assets/athlete-goalkeeper.png";
import athleteCelebration from "@/assets/athlete-celebration.png";
import athleteBlue from "@/assets/athlete-blue.png";
import athleteHandshake from "@/assets/athlete-handshake.png";

export interface Player {
  id: string;
  name: string;
  team: string;
  country: string;
  position: string;
  image: string;
}

export const players: Player[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    team: "Chelsea FC",
    country: "England",
    position: "Forward",
    image: athleteSpence,
  },
  {
    id: "2",
    name: "Emma Rodriguez",
    team: "Arsenal WFC",
    country: "Spain",
    position: "Midfielder",
    image: athleteAward,
  },
  {
    id: "3",
    name: "Maya Johnson",
    team: "Manchester City",
    country: "USA",
    position: "Defender",
    image: athleteFocus,
  },
  {
    id: "4",
    name: "Sophie Anderson",
    team: "Lyon",
    country: "France",
    position: "Goalkeeper",
    image: athleteGoalkeeper,
  },
  {
    id: "5",
    name: "Isabella Chen",
    team: "Barcelona",
    country: "China",
    position: "Forward",
    image: athleteCelebration,
  },
  {
    id: "6",
    name: "Lily Thompson",
    team: "PSG",
    country: "Australia",
    position: "Midfielder",
    image: athleteBlue,
  },
  {
    id: "7",
    name: "Zara Williams",
    team: "Bayern Munich",
    country: "Germany",
    position: "Defender",
    image: athleteHandshake,
  },
  {
    id: "8",
    name: "Ava Martinez",
    team: "Real Madrid",
    country: "Brazil",
    position: "Forward",
    image: athleteSpence,
  },
  {
    id: "9",
    name: "Olivia Brown",
    team: "Juventus",
    country: "Italy",
    position: "Midfielder",
    image: athleteAward,
  },
];

