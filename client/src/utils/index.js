import { names } from "../resources/index";

export function getRandomFromArr(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}
export function getRandomFromObj(object) {
	const randomKey = getRandomFromArr(Object.keys(object));
	return object[randomKey];
}

export function rollD6(howMany) {
	howMany = Math.floor(howMany);
	if (isNaN(howMany) || !howMany) {
		howMany = 1;
	}
	let result = 0;
	for (let i = 0; i < howMany; i++) {
		result += Math.ceil(Math.random() * 6);
	}

	return result;
}

export function generateStats(d6PerStat) {
	d6PerStat = Math.floor(d6PerStat);
	if (isNaN(d6PerStat) || !d6PerStat) {
		d6PerStat = 3;
	}
	let stats = new Array(6);
	for (let i = 0; i < stats.length; i++) {
		stats[i] = rollD6(d6PerStat);
	}

	return stats;
}

export function generateName(race, gender) {
	if (race === "any") {
		race = null;
	}
	race = race || getRandomFromArr(Object.keys(names));
	gender = gender || getRandomFromArr(["male", "female"]);
	let firstName = getRandomFromArr(names[race][gender]);
	let lastName = getRandomFromArr(names[race].family);
	return `${firstName} ${lastName}`;
}

export function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
