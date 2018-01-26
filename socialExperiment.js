//pass in a number for a personality
function Personality(type) {
	var pnt = this;
	pnt.types = ["neutral", "greedy", "giving"];
	pnt.type = pnt.types[type];
}

function Person () {	
	var pr = this;
	function _init(name, personalityInt) {
		pr.money = 5;
		//initialise personality as neutral
		pr.personality = new Personality(personalityInt);
		pr.name = "'Person " + name + ", the " + pr.personality.type + "'";
		pr.lastPaid = false;
		pr.firstMove = true;
		return pr;
	}
	
	function playSomeone(otherPerson) {
		function pay(pr, otherPerson) {
			pr.money--;
			otherPerson.money++;
			pr.lastPaid = true;
		}
		switch (pr.personality.type) {
			case "neutral":
				if (otherPerson.firstMove) {
					//if other person hasn't moved, pay
					 pay(pr, otherPerson);
				} else {
					//if otherPerson paid, pay
					if (otherPerson.lastPaid) {
						 pay(pr, otherPerson);
					//if not, don't pay
					} else {
						//do nothing
						pr.lastPaid = false;
					}
				}
				break;
			case "greedy":
				//do nothing, you bastard
				pr.lastPaid = false;
				break;
			case "giving":
				//always pay
				pay(pr, otherPerson);
				break;
		}
		pr.firstMove = false;
		if (pr.lastPaid) {
			console.log(pr.name + " paid 1 coin to " + otherPerson.name);
		} else {
			console.log(pr.name + " hasn't paid to " + otherPerson.name);
		}
		console.log(pr.name + " 's balance: " + pr.money);
		
		if (pr.money < 1) {
			delete pr;
		}
	} 
	pr.playSomeone = playSomeone;
	pr._init = _init;
}

var people = [];
//initialise 10 people
for (var i=0;i<9;i++) {
	people[i] = new Person();
	people[i] = people[i]._init(i, Math.floor(Math.random() * 3)); //0 to 2);
}

//start 10 rounds
for (var i=0;i<9;i++) {
	people[0].playSomeone(people[1]);
	people[1].playSomeone(people[0]);
	people[1].playSomeone(people[2]);
	people[2].playSomeone(people[1]);
	people[2].playSomeone(people[3]);
	people[3].playSomeone(people[2]);
	people[3].playSomeone(people[0]);
	people[0].playSomeone(people[3]);
}
