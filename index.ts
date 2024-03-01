import readline from "readline-sync";

interface Player {
  id: string;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthdate: string;
  imageURL: string;
  status: string;
  hobbies: string[];
  goalsScored: number;
  assists: number;
  nationality: string;
  position: string;
  number: number;
}

const soccerPlayersJson =
  "https://hamzachl.github.io/milestone1-json/soccerplayers.json";

const viewData = async () => {
  try {
    const resp = await fetch(soccerPlayersJson);
    const data = await resp.json();

    for (let i = 0; i < data.players.length; i++) {
      const player = data.players[i];

      console.log(`- ${player.name} (${player.id})`);
    }
  } catch (error) {
    console.log(error);
  }
};

const filterById = async () => {
  const idToFilter = readline.question(
    "Please enter the ID you want to filter by: "
  );

  try {
    const resp = await fetch(soccerPlayersJson);
    const data: { players: Player[] } = await resp.json();

    const filteredPlayer = data.players.find(
      (player) => player.id === idToFilter
    );

    if (filteredPlayer) {
      console.log(`  - ${filteredPlayer.name} (${filteredPlayer.id})`);
      console.log(`  - Description: ${filteredPlayer.description}`);
      console.log(`  - Age: ${filteredPlayer.age}`);
      console.log(`  - isActive: ${filteredPlayer.isActive}`);
      console.log(`  - Birthdate: ${filteredPlayer.birthdate}`);
      console.log(`  - Image: ${filteredPlayer.imageURL}`);
      console.log(`  - Status: ${filteredPlayer.status}`);
      console.log(`  - hobbies: ${filteredPlayer.hobbies.join(", ")}`);
      console.log(`  - GoalsScored: ${filteredPlayer.goalsScored}`);
      console.log(`  - Assists: ${filteredPlayer.assists}`);
      console.log(`  - Nationality: ${filteredPlayer.nationality}`);
      console.log(`  - Position: ${filteredPlayer.position}`);
      console.log(`  - Number: ${filteredPlayer.number}`);
    } else {
      console.log(`Player with ID ${idToFilter} not found.`);
    }
    console.log("");
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

let exitProgram = false;

async function mainMenu() {
  console.log("Welcome to the JSON data viewer!\n");

  while (!exitProgram) {
    console.log("1. View all data");
    console.log("2. Filter by ID");
    console.log("3. Exit");

    const choice = readline.question("Please enter your choice: ");

    switch (choice) {
      case "1":
        await viewData();
        console.log(""); //LEEG REGEL
        break;
      case "2":
        await filterById();
        console.log(""); //LEEG REGEL
        break;
      case "3":
        console.log("Goodbye..");
        exitProgram = true;
        break;
      default:
        console.log("Invalid choice. Please enter a valid option.");
        break;
    }
  }
}

mainMenu();

export {};
