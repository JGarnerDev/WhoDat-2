import {
	getRandomFromArr,
	getRandomFromObj,
	rollD6,
	generateStats,
	generateName,
	capitalize,
} from "../../utils";

describe("Utility functions", () => {
	describe("Sanity tests", () => {
		describe("getRandomFromArr utility function", () => {
			it("has a module", () => {
				expect(getRandomFromArr).toBeDefined();
			});
		});
		describe("getRandomFromObj utility function", () => {
			it("has a module", () => {
				expect(getRandomFromObj).toBeDefined();
			});
		});
		describe("roll1d6 utility function", () => {
			it("has a module", () => {
				expect(rollD6).toBeDefined();
			});
		});
		describe("generateStats utility function", () => {
			it("has a module", () => {
				expect(generateStats).toBeDefined();
			});
		});
		describe("generateName utility function", () => {
			it("has a module", () => {
				expect(generateName).toBeDefined();
			});
		});
	});
	// done
	describe("getRandomFromArr utility function", () => {
		it("returns a random element from an array of elements", () => {
			const array = ["One", "Two", "Three", [], {}, false, NaN, null];

			let set = new Set();

			for (let i = 0; i <= 30; i++) {
				let element = getRandomFromArr(array);
				set.add(element);
			}

			expect(set.size).toBeGreaterThan(5);
		});
	});
	//
	describe("getRandomFromObj utility function", () => {
		it("returns a random value from an object", () => {
			const names = {
				male: ["Allen", "Bob", "Carl"],
				female: ["Amy", "Brittany", "Christine"],
				family: ["Albright", "Benson", "Cooper"],
			};
			const randomProperty = getRandomFromObj(names);
			expect(
				randomProperty === names.male ||
					randomProperty === names.female ||
					randomProperty === names.family
			).toBeTruthy();
		});
	});
	// done
	describe("rollD6 utility function", () => {
		it("returns a random interger between 1 and 6 (inclusive) when no argument is passed", () => {
			let set = new Set();

			for (let i = 0; i <= 30; i++) {
				const result = rollD6();
				set.add(result);
				expect(result).toBeGreaterThan(0);
				expect(result).toBeLessThan(7);
			}

			expect(set.size).toBeGreaterThan(4);
			expect(set.size).toBeLessThan(7);
		});
		it("returns a random interger between 1 and 6 (inclusive) when a non-number is passed", () => {
			let set = new Set();

			for (let i = 0; i <= 30; i++) {
				const result = rollD6("foo");
				set.add(result);
				expect(result).toBeGreaterThan(0);
				expect(result).toBeLessThan(7);
			}

			expect(set.size).toBeGreaterThan(4);
			expect(set.size).toBeLessThan(7);
		});
		it("returns a random interger between 1 and 6 (inclusive) when a non-interger is passed", () => {
			let set = new Set();

			for (let i = 0; i <= 30; i++) {
				const result = rollD6(1.2);
				set.add(result);
				expect(result).toBeGreaterThan(0);
				expect(result).toBeLessThan(7);
			}
			expect(set.size).toBeGreaterThan(4);
			expect(set.size).toBeLessThan(7);
		});

		it("returns a random interger between 1 and 6 * argument (inclusive) when an interger is passed as an argument", () => {
			let set = new Set();
			const howMany = 3;

			for (let i = 0; i <= 30; i++) {
				const result = rollD6(howMany);
				set.add(result);
				expect(result).toBeGreaterThan(howMany - 1);
				expect(result).toBeLessThan(howMany * 6 + 1);
			}
			expect(set.size).toBeGreaterThan(howMany * 2.5);
			expect(set.size).toBeLessThan(howMany * 6 - 1);
		});
	});
	// done
	describe("generateStats utility function", () => {
		it("returns an array of six sums of 3d6 when no argument is passed", () => {
			const result = generateStats();
			expect(result.length).toBe(6);
			for (let i = 0; i < result.length; i++) {
				expect(result[i]).toBeGreaterThan(2);
				expect(result[i]).toBeLessThan(19);
			}
		});
		it("returns an array of six sums of 1d6 rolled n times when an interger is passed", () => {
			const randomInterger = Math.ceil(Math.random() * 10);
			const d6PerStat = randomInterger;
			const result = generateStats(d6PerStat);
			expect(result.length).toBe(6);
			for (let i = 0; i < result.length; i++) {
				expect(result[i]).toBeGreaterThan(d6PerStat - 1);
				expect(result[i]).toBeLessThan(d6PerStat * 6 + 1);
			}
		});
		it("returns an array of six sums of 3d6 when a non-number is passed", () => {
			const result = generateStats("foo");
			expect(result.length).toBe(6);
			for (let i = 0; i < result.length; i++) {
				expect(result[i]).toBeGreaterThan(2);
				expect(result[i]).toBeLessThan(19);
			}
		});
		it("returns an array of six sums of nd6 when a non-interger is passed", () => {
			let randomNumber = Math.random() * 10;
			if (randomNumber < 1) {
				randomNumber += 1;
			}

			const result = generateStats(randomNumber);
			expect(result.length).toBe(6);
			for (let i = 0; i < result.length; i++) {
				expect(result[i]).toBeGreaterThan(Math.floor(randomNumber - 1));
				expect(result[i]).toBeLessThan(
					Math.floor(randomNumber < 1 ? (randomNumber = 1) : randomNumber) * 6 +
						1
				);
			}
		});
	});
	// done
	describe("generateName", () => {
		it("returns a name string with first and last name when no arguments are given", () => {
			const randomName = generateName();
			expect(randomName).toEqual(expect.any(String));
			const arrOfFirstAndLastName = randomName.split(" ");
			expect(arrOfFirstAndLastName.length).toEqual(2);
			const firstName = arrOfFirstAndLastName[0];
			expect(firstName.charAt(0)).toBe(firstName.charAt(0).toUpperCase());
			const lastName = arrOfFirstAndLastName[1];
			expect(lastName.charAt(0)).toBe(lastName.charAt(0).toUpperCase());
		});
	});
	//
	describe("capitalize", () => {
		const lowerCaseWord = "cat";
		const capitalized = "Cat";
		const actual = capitalize(lowerCaseWord);
		expect(actual).toBe(capitalized);
	});
});
