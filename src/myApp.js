require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const root = 'https://gatherer.wizards.com/Handlers/Image.ashx?';

const cardSchema = new mongoose.Schema({
  name: String,
  picture: {
    type: String,
    get: v => `${root}${v}`
  },
  manaCost: String,
  manaValue: Number,
  superType: [String],
  cardType: [String], //artifact, creature, instant, etc.
  type: [String], //Human, Arcane, Treasure, Aura, etc.
  rulesText: String,
  power: Number,
  toughness: Number,
  rarity: String,
  expansion: String,
  cardNum: Number,
  artist: String,
  backSide: {
    name: String,
    picture: {
      type: String,
      get: v => `${root}${v}`
    },
    manaCost: String,
    manaValue: Number,
    superType: [String],
    cardType: [String], //artifact, creature, instant, etc.
    type: [String], //Human, Arcane, Treasure, Aura, etc.
    rulesText: String,
    power: Number,
    toughness: Number,
    rarity: String,
    expansion: String,
    cardNum: Number,
    artist: String
  }
});

const Card = mongoose.model('Card', cardSchema);


const createAndSaveCard = (done) => {
  const abrade = new Card({name: 'Abrade', picture: 'multiverseid=636839&type=card', manaCost: '1R', manaValue: 2, cardType: ['Instant'], rulesText: 'Choose One--  *Abrade deals 3 damage to target creature.  *Destroy target artifact.', rarity: 'Common', expansion: 'LCI', cardNum: 131, artist: 'Bartek Fedyczak'});
  abrade.picture;  
  abrade.toObject({ getters: false }).picture; 

  abrade.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfCards = [
  {name: 'Abuelo, Ancestral Echo', picture: 'multiverseid=636939&type=card', manaCost: '1WU', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Spirit'], rulesText: "Flying, Ward 2  1WU: Exile another target creature or artifact you control. Return it under its owner's control at the beginning of the next end step.", power: 2, toughness: 2, rarity: 'Rare', expansion: 'LCI', cardNum: 219, artist: 'Victor Adame Minguez'},
  {name: 'Abuelo, Ancestral Echo', picture: 'type=card&multiverseid=636505', manaCost: '1WU', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Spirit'], rulesText: "Flying, Ward 2  1WU: Exile another target creature or artifact you control. Return it under its owner's control at the beginning of the next end step.", power: 2, toughness: 2, rarity: 'Rare', expansion: 'LCI', cardNum: 297, artist: 'Cabrol'},
  {name: "Abuelo's Awakening", picture: 'type=card&multiverseid=636691', manaCost: 'X3W', manaValue: 4, cardType: ['Sorcery'], rulesText: "Return target artifact or non-Aura enchantment card from your graveyard to the battlefield with X additional +1/+1 counters on it. It's a 1/1 Spirit creature with flying in addition to its other types.", rarity: 'Rare', expansion: 'LCI', cardNum: 1, artist: 'Eelis Kyttanen'},
  {name: "Abuelo's Awakening", picture: 'type=card&multiverseid=639750', manaCost: 'X3W', manaValue: 4, cardType: ['Sorcery'], rulesText: "Return target artifact or non-Aura enchantment card from your graveyard to the battlefield with X additional +1/+1 counters on it. It's a 1/1 Spirit creature with flying in addition to its other types.", rarity: 'Rare', expansion: 'LCI', cardNum: 353, artist: 'Eelis Kyttanen'},
  {name: 'Abyssal Gorestalker', picture: 'multiverseid=636790&type=card', manaCost: '4BB', manaValue: 6, cardType: ['Creature'], type: ['Horror'], rulesText: 'When Abyssal Gorestalker enters the battlefield, each player sacrifices two creatures.', power: 6, toughness: 6, rarity: 'Uncommon', expansion: 'LCI', cardNum: 87, artist: 'Maxime Minard'},
  {name: 'Aclazotz, Deepest Betrayal', picture: 'multiverseid=636791&type=card', manaCost: '3BB', manaValue: 5, superType: ['Legendary'], cardType: ['Creature'], type: ['Bat', 'God'], rulesText: "Flying, lifelink  Whenever Aclazotz attacks, each opponent discards a card. For each opponent who can not, you draw a card.  Whenever an opponent discards a land card, create a 1/1 black Bat creature token with flying.  When Aclazotz dies, return it to the battlefield tapped and transformed under its owner's control.", rarity: 'Mythic Rare', expansion: 'LCI', cardNum: 88, artist: 'Steve Prescott', backSide: {name: 'Temple of the Dead', picture: 'multiverseid=636792&type=card', manaValue: 5, cardType: ['Land'], rulesText: '(Transforms from Aclazotz, Deepest Betrayal.)  Tap: Add B.  2B, Tap: Transform Temple of the Dead. Activate only if a player has one or fewer cards in hand and only as a sorcery.', rarity: 'Mythic Rare', cardNum: 88, artist: 'Steve Prescott'}},
  {name: 'Aclazotz, Deepest Betrayal', picture: 'multiverseid=639434&type=card', manaCost: '3BB', manaValue: 5, superType: ['Legendary'], cardType: ['Creature'], type: ['Bat', 'God'], rulesText: "Flying, lifelink  Whenever Aclazotz attacks, each opponent discards a card. For each opponent who can not, you draw a card.  Whenever an opponent discards a land card, create a 1/1 black Bat creature token with flying.  When Aclazotz dies, return it to the battlefield tapped and transformed under its owner's control.", rarity: 'Mythic Rare', expansion: 'LCI', cardNum: 316, artist: 'Clint Lockwood', backSide: {name: 'Temple of the Dead', picture: 'multiverseid=639435&type=card', manaValue: 5, cardType: ['Land'], rulesText: '(Transforms from Aclazotz, Deepest Betrayal.)  Tap: Add B.  2B, Tap: Transform Temple of the Dead. Activate only if a player has one or fewer cards in hand and only as a sorcery.', rarity: 'Mythic Rare', cardNum: 316, artist: 'Viko Menezes'}},
  {name: 'Acolyte of Aclazotz', picture: 'multiverseid=636793&type=card', manaCost: '2B', manaValue: 3, cardType: ['Creature'], type: ['Vampire', 'Cleric'], rulesText: 'Tap, Sacrifice another creature or artifact: Each opponent loses 1 life and you gain 1 life.', power: 1, toughness: 4, rarity: 'Common', expansion: 'LCI', cardNum: 89, artist: 'Irina Nordsol'},
  {name: 'Acrobatic Leap', picture: 'multiverseid=636692&type=card', manaCost: 'W', manaValue: 1, cardType: ['Instant'], rulesText: 'Target creature gets +1/+3 and gains flying until end of turn. Untap it.', rarity: 'Common', expansion: 'LCI', cardNum: 2, artist: 'Fesbra'},
  {name: 'Adaptive Gemguard', picture: 'multiverseid=636693&type=card', manaCost: '3W', manaValue: 4, cardType: ['Artifact', 'Creature'], type: ['Gnome'], rulesText: 'Tap two untapped artifacts and/or creatures you control: Put a +1/+1 counter on Adaptive Gemguard. Activate only as a sorcery.', power: 3, toughness: 3, rarity: 'Common', expansion: 'LCI', cardNum: 3, artist: 'Anthony Devine'},
  {name: 'Akal Pakal, First Among Equals', picture: 'multiverseid=636499&type=card', manaCost: '2U', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Human', 'Advisor'], rulesText: "At the beginning of each player's end step, if an artifact entered the battlefield under your control this turn, look at the top two cards of your library. Put one of them into your hand and the other into your graveyard.", power: 1, toughness: 5, rarity: 'Rare', expansion: 'LCI', cardNum: 292, artist: 'Alex Negrea'},
  {name: 'Akal Pakal, First Among Equals', picture: 'type=card&multiverseid=636740', manaCost: '2U', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Human', 'Advisor'], rulesText: "At the beginning of each player's end step, if an artifact entered the battlefield under your control this turn, look at the top two cards of your library. Put one of them into your hand and the other into your graveyard.", power: 1, toughness: 5, rarity: 'Rare', expansion: 'LCI', cardNum: 44, artist: 'Ryan Pancoast'},
  {name: 'Akawalli, the Seething Tower', picture: 'multiverseid=636940&type=card', manaCost: '1BG', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Fungus'], rulesText: 'Descend 4 — As long as there are four or more permanent cards in your graveyard, Akawalli, the Seething Tower gets +2/+2 and has trample.  Descend 8 — As long as there are eight or more permanent cards in your graveyard, Akawalli gets an additional +2/+2 and can not be blocked by more than one creature.', power: 3, toughness: 3, rarity: 'Uncommon', expansion: 'LCI', cardNum: 220, artist: 'Simon Dominic'},
  {name: 'Akawalli, the Seething Tower', picture: 'type=card&multiverseid=636506', manaCost: '1BG', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Fungus'], rulesText: 'Descend 4 — As long as there are four or more permanent cards in your graveyard, Akawalli, the Seething Tower gets +2/+2 and has trample.  Descend 8 — As long as there are eight or more permanent cards in your graveyard, Akawalli gets an additional +2/+2 and can not be blocked by more than one creature.', power: 3, toughness: 3, rarity: 'Uncommon', expansion: 'LCI', cardNum: 298, artist: 'rishxxv'},
  {name: 'Amalia Benavides Aguirre', picture: 'multiverseid=636941&type=card', manaCost: 'WB', manaValue: 2, superType: ['Legendary'], cardType: ['Creature'], type: ['Vampire', 'Scout'], rulesText: 'Ward—Pay 3 life.  Whenever you gain life, Amalia Benavides Aguirre explores. Then destroy all other creatures if its power is exactly 20. (To have this creature explore, reveal the top card of your library. Put that card into your hand if it is a land. Otherwise, put a +1/+1 counter on this creature, then put the card back or put it into your graveyard.)', power: 2, toughness: 2, rarity: 'Rare', expansion: 'LCI', cardNum: 221, artist: 'Alix Branwyn'},
  {name: 'Amalia Benavides Aguirre', picture: 'type=card&multiverseid=636507', manaCost: 'WB', manaValue: 2, superType: ['Legendary'], cardType: ['Creature'], type: ['Vampire', 'Scout'], rulesText: 'Ward—Pay 3 life.  Whenever you gain life, Amalia Benavides Aguirre explores. Then destroy all other creatures if its power is exactly 20. (To have this creature explore, reveal the top card of your library. Put that card into your hand if it is a land. Otherwise, put a +1/+1 counter on this creature, then put the card back or put it into your graveyard.)', power: 2, toughness: 2, rarity: 'Rare', expansion: 'LCI', cardNum: 299, artist: 'Alex Negrea'},
  {name: "Ancestors' Aid", picture: 'multiverseid=636840&type=card', manaCost: '1R', manaValue: 2, cardType: ['Instant'], rulesText: 'Target creature gets +2/+0 and gains first strike until end of turn.  Create a Treasure token. (It is an artifact with "Tap, Sacrifice this artifact: Add one mana of any color.")', rarity: 'Common', expansion: 'LCI', cardNum: 132, artist: 'Alesssandra Pisano'},
  {name: 'Ancestral Reminiscence', picture: 'multiverseid=636741&type=card', manaCost: '3U', manaValue: 4, cardType: ['Sorcery'], rulesText: 'Draw three cards, then discard a card.', rarity: 'Common', expansion: 'LCI', cardNum: 45, artist: 'Artur Treffner'},
  {name: 'Anim Pakal', picture: 'multiverseid=636943&type=card', manaCost: '1WR', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Human', 'Soldier'], rulesText: 'Whenever you attack with one or more non-Gnome creatures, put a +1/+1 counter on Anim Pakal, then create X 1/1 colorless Gnome artifact creature tokens that are tapped and attacking, where X is the number of +1/+1 counters on Anim Pakal.', power: 1, toughness: 2, rarity: 'Rare', expansion: 'LCI', cardNum: 223, artist: 'Chris Rahn'},
  {name: 'Anim Pakal', picture: 'type=card&multiverseid=636508', manaCost: '1WR', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Human', 'Soldier'], rulesText: 'Whenever you attack with one or more non-Gnome creatures, put a +1/+1 counter on Anim Pakal, then create X 1/1 colorless Gnome artifact creature tokens that are tapped and attacking, where X is the number of +1/+1 counters on Anim Pakal.', power: 1, toughness: 2, rarity: 'Rare', expansion: 'LCI', cardNum: 300, artist: 'Anditya Dita'},
  {name: 'Another Chance', picture: 'multiverseid=636794&type=card', manaCost: '2B', manaValue: 3, cardType: ['Instant'], rulesText: 'You may mill two cards. Then return up to two creature cards from your graveyard to your hand. (To mill two cards, put the top two cards of your library into your graveyard.)', rarity: 'Common', expansion: 'LCI', cardNum: 90, artist: 'Irina Nordsol'},
  {name: 'Armored Kincaller', picture: 'multiverseid=636888&type=card', manaCost: '2G', manaValue: 3, cardType: ['Creature'], type: ['Dinosaur'], rulesText: 'When Armored Kincaller enters the battlefield, you may reveal a Dinosaur card from your hand. If you do or if you control another Dinosaur, you gain 3 life.', power: 3, toughness: 3, rarity: 'Common', expansion: LCI, cardNum: 174, artist: 'John Tedrick'},
  {name: 'Attentive Sunscribe', picture: 'multiverseid=636694&type=card', manaCost: '1W', manaValue: 2, cardType: ['Artifact', 'Creature'], type: ['Gnome'], rulesText: 'Whenever Attentive Sunscribe becomes tapped, scry 1. (Look at the top card of your library. You may put that card on the bottom.)', power: 2, toughness: 2, rarity: 'Common', expansion: 'LCI', cardNum: 4, artist: 'Devin Platts'},
  {name: 'Bartolomé del Presidio', picture: 'type=card&multiverseid=636944', manaCost: 'WB', manaValue: 2, superType: ['Legendary'], cardType: ['Creature'], type: ['Vampire', 'Knight'], rulesText: 'Sacrifice another creature or artifact: Put a +1/+1 counter on Bartolomé del Presidio.', power: 2, toughness: 1, rarity: 'Uncommon', expansion: 'LCI', cardNum: '224', artist: 'Randy Gallegos'},
  {name: 'Bartolomé del Presidio', picture: 'type=card&multiverseid=636463', manaCost: 'WB', manaValue: 2, superType: ['Legendary'], cardType: ['Creature'], type: ['Vampire', 'Knight'], rulesText: 'Sacrifice another creature or artifact: Put a +1/+1 counter on Bartolomé del Presidio.', power: 2, toughness: 1, rarity: 'Uncommon', expansion: 'LCI', cardNum: '409', artist: 'Randy Gallegos'},
  {name: 'Bartolomé del Presidio', picture: 'type=card&multiverseid=636509', manaCost: 'WB', manaValue: 2, superType: ['Legendary'], cardType: ['Creature'], type: ['Vampire', 'Knight'], rulesText: 'Sacrifice another creature or artifact: Put a +1/+1 counter on Bartolomé del Presidio.', power: 2, toughness: 1, rarity: 'Uncommon', expansion: 'LCI', cardNum: '301', artist: 'Pig Hands'},
  {name: 'Basking Capybara', picture: 'multiverseid=636889&type=card', manaCost: '1G', manaValue: 2, cardType: ['Creature'], type: ['Capybara'], rulesText: 'Descend 4 — Basking Capybara gets +3/+0 as long as there are four or more permanent cards in your graveyard.', power: 1, toughness: 3, rarity: 'Common', expansion: 'LCI', cardNum: 175, artist: 'Ilse Gort'},
  {name: 'Bat Colony', picture: 'multiverseid=636695&type=card', manaCost: '2W', manaValue: 3, cardType: ['Enchantment'], rulesText: 'When Bat Colony enters the battlefield, create a 1/1 black Bat creature token with flying for each mana from a Cave spent to cast it.  Whenever a Cave enters the battlefield under your control, put a +1/+1 counter on target creature you control.', rarity: 'Uncommon', expansion: 'LCI', cardNum: 5, artist: 'Cristi Balanescu'},
  {name: 'Bedrock Tortoise', picture: 'type=card&multiverseid=636890', manaCost: '3G', manaValue: 4, cardType: ['Creature'], type: ['Turtle'], rulesText: 'As long as it is your turn, creatures you control have hexproof.  Each creature you control with toughness greater than its power assigns combat damage equal to its toughness rather than its power.', power: 0, toughness: 6, rarity: 'Rare', expansion: 'LCI', cardNum: 176, artist: 'Maxime Minard'},
  {name: 'Bedrock Tortoise', picture: 'type=card&multiverseid=639783', manaCost: '3G', manaValue: 4, cardType: ['Creature'], type: ['Turtle'], rulesText: 'As long as it is your turn, creatures you control have hexproof.  Each creature you control with toughness greater than its power assigns combat damage equal to its toughness rather than its power.', power: 0, toughness: 6, rarity: 'Rare', expansion: 'LCI', cardNum: 378, artist: 'Maxime Minard'},
  {name: 'Belligerent Yearling', picture: 'type=card&multiverseid=636841', manaCost: '1R', manaValue: 2, cardType: ['Creature'], type: ['Dinosaur'], rulesText: "Trample  Whenever another Dinosaur enters the battlefield under your control, you may have Belligerent Yearling's base power become equal to that creature's power until end of turn.", power: 3, toughness: 2, rarity: 'Uncommon', expansion: 'LCI', cardNum: 133, artist: 'Maxime Minard'},
  {name: 'Belligerent Yearling', picture: 'type=card&multiverseid=639566', manaCost: '1R', manaValue: 2, cardType: ['Creature'], type: ['Dinosaur'], rulesText: "Trample  Whenever another Dinosaur enters the battlefield under your control, you may have Belligerent Yearling's base power become equal to that creature's power until end of turn.", power: 3, toughness: 2, rarity: 'Uncommon', expansion: 'LCI', cardNum: 320, artist: 'Sidharth Chaturvedi'},
  {name: 'Bitter Triumph', picture: 'multiverseid=636795&type=card', manaCost: '1B', manaValue: 2, cardType: ['Instant'], rulesText: 'As an additional cost to cast this spell, discard a card or pay 3 life.  Destroy target creature or planeswalker.', rarity: 'Uncommon', expansion: 'LCI', cardNum: 91, artist: 'Donato Giancola'},
  {name: 'Bloodletter of Aclazotz', picture: 'type=card&multiverseid=636796', manaCost: '1BBB', manaValue: 4, cardType: ['Creature'], type: ['Vampire', 'Demon'], rulesText: 'Flying  If an opponent would lose life during your turn, they lose twice that much life instead. (Damage causes loss of life.)', power: 2, toughness: 4, rarity: 'Mythic Rare', expansion: 'LCI', cardNum: 92, artist: 'Antonio José Manzanedo'},
  {name: 'Bloodletter of Aclazotz', picture: 'type=card&multiverseid=639262', manaCost: '1BBB', manaValue: 4, cardType: ['Creature'], type: ['Vampire', 'Demon'], rulesText: 'Flying  If an opponent would lose life during your turn, they lose twice that much life instead. (Damage causes loss of life.)', power: 2, toughness: 4, rarity: 'Mythic Rare', expansion: 'LCI', cardNum: 336, artist: 'Bene Rohlmann'},
  {name: 'Bloodthorn Flail', picture: 'multiverseid=636797&type=card', manaCost: 'B', manaValue: 1, cardType: ['Artifact'], type: ['Equipment'], rulesText: 'Equipped creature gets +2/+1.  Equip--Pay 3 or discard a card.', rarity: 'Uncommon', expansion: 'LCI', cardNum: 93, artist: 'Igor Kieryluk'},
  {name: 'Bonehoard Dracosaur', picture: 'multiverseid=636842&type=card', manaCost: '3RR', manaValue: 5, cardType: ['Creature'], type: ['Dinosaur', 'Dragon'], rulesText: 'Flying, first strike  At the beginning of your upkeep, exile the top two cards of your library. You may play them this turn. If you exiled a land card this way, create a 3/1 red Dinosaur creature token. If you exiled a nonland card this way, create a Treasure token.', power: 5, toughness: 5, rarity: 'Mythic Rare', expansion: 'LCI', cardNum: 134, artist: 'Mark Zug'},
  {name: 'Bonehoard Dracosaur', picture: 'multiverseid=639567&type=card', manaCost: '3RR', manaValue: 5, cardType: ['Creature'], type: ['Dinosaur', 'Dragon'], rulesText: 'Flying, first strike  At the beginning of your upkeep, exile the top two cards of your library. You may play them this turn. If you exiled a land card this way, create a 3/1 red Dinosaur creature token. If you exiled a nonland card this way, create a Treasure token.', power: 5, toughness: 5, rarity: 'Mythic Rare', expansion: 'LCI', cardNum: 321, artist: 'Sidharth Chaturvedi'},
  {name: 'Brackish Blunder', picture: 'multiverseid=636742&type=card', manaCost: '1U', manaValue: 2, cardType: ['Instant'], rulesText: 'Return target creature to its owner`s hand. If it was tapped, create a Map token. (It is an artifact with "1, Tap, Sacrifice this artifact: Target creature you control explores. Activate only as a sorcery.")', rarity: 'Common', expansion: 'LCI', cardNum: 46, artist: 'Daarken'},
  {name: 'Braided Net', picture: 'multiverseid=636743&type=card', manaCost: '2U', manaValue: 3, cardType: ['Artifact'], rulesText: "Braided Net enters the battlefield with three net counters on it.  Tap, Remove a net counter from Braided Net: Tap another target nonland permanent. Its activated abilities can't be activated for as long as it remains tapped.  Craft with artifact 1U", rarity: 'Rare', expansion: 'LCI', cardNum: 47, artist: 'Diego Gisbert', backSide: {name: 'Braided Quipu', picture: 'multiverseid=636744&type=card', manaValue: 3, cardType: ['Artifact'], cardText: "3U, tap: Draw a card for each artifact you control, then put Braided Quipu into its owner's library third from the top.", rarity: 'Rare', expansion: 'LCI', cardNum: 47, artist: 'Diego Gisbert'}},
  {name: 'Braided Net', picture: 'multiverseid=639759&type=card', manaCost: '2U', manaValue: 3, cardType: ['Artifact'], rulesText: "Braided Net enters the battlefield with three net counters on it.  Tap, Remove a net counter from Braided Net: Tap another target nonland permanent. Its activated abilities can't be activated for as long as it remains tapped.  Craft with artifact 1U", rarity: 'Rare', expansion: 'LCI', cardNum: 360, artist: 'Diego Gisbert', backSide: {name: 'Braided Quipu', picture: 'multiverseid=639760&type=card', manaValue: 3, cardType: ['Artifact'], cardText: "3U, tap: Draw a card for each artifact you control, then put Braided Quipu into its owner's library third from the top.", rarity: 'Rare', expansion: 'LCI', cardNum: 360, artist: 'Diego Gisbert'}},
  {name: "Brass's Tunnel-Grinder", picture: 'multiverseid=636843&type=card', manaCost: '2R', manaValue: 3, superType: ['Legendary'], cardType: ['Artifact'], rulesText: "When Brass's Tunnel-Grinder enters the battlefield, discard any number of cards, then draw that many cards plus one.  At the beginning of your end step, if you descended this turn, put a bore counter on Brass's Tunnel-Grinder. Then if there are three or more bore counters on it, remove those counters and transform it. (You descended if a permanent card was put into your graveyard from anywhere.)", rarity: 'Rare', expansion: 'LCI', cardNum: 135, artist: 'Cristi Balanescu', backSide: {name: 'Tecutlan, the Searing Rift', picture: 'multiverseid=636844&type=card', manaValue: 3, superType: ['Legendary'], cardType: ['Land'], type: ['Cave'], rulesText: "(Transforms from Brass's Tunnel-Grinder.)  Tap: Add R.  Whenever you cast a permanent spell using mana produced by Tecutlan, the Searing Rift, discover X, where X is that spell's mana value.", rarity: 'Rare', expansion: 'LCI', cardNum: 135, artist: 'Cristi Balanescu' }},
  {name: "Brass's Tunnel-Grinder", picture: 'multiverseid=639776&type=card', manaCost: '2R', manaValue: 3, superType: ['Legendary'], cardType: ['Artifact'], rulesText: "When Brass's Tunnel-Grinder enters the battlefield, discard any number of cards, then draw that many cards plus one.  At the beginning of your end step, if you descended this turn, put a bore counter on Brass's Tunnel-Grinder. Then if there are three or more bore counters on it, remove those counters and transform it. (You descended if a permanent card was put into your graveyard from anywhere.)", rarity: 'Rare', expansion: 'LCI', cardNum: 373, artist: 'Cristi Balanescu', backSide: {name: 'Tecutlan, the Searing Rift', picture: 'multiverseid=639777&type=card', manaValue: 3, superType: ['Legendary'], cardType: ['Land'], type: ['Cave'], rulesText: "(Transforms from Brass's Tunnel-Grinder.)  Tap: Add R.  Whenever you cast a permanent spell using mana produced by Tecutlan, the Searing Rift, discover X, where X is that spell's mana value.", rarity: 'Rare', expansion: 'LCI', cardNum: 373, artist: 'Cristi Balanescu' }},
  {name: 'Brazen Blademaster', picture: 'multiverseid=636845&type=card', manaCost: '2R', manaValue: 3, cardType: ['Creature'], type: ['Orc', 'Pirate'], rulesText: 'Whenever Brazen Blademaster attacks while you control two or more artifacts, it gets +2/+1 until end of turn.', power: 2, toughness: 3, rarity: 'Common', expansion: 'LCI', cardNum: 136, artist: 'Jarel Threat'},
  {name: 'Breeches, Eager Pilager', picture: 'type=card&multiverseid=636846', manaCost: '2R', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Goblin', 'Pirate'], rulesText: "First Strike  Whenever a Pirate you control attacks, choose one that hasn't been chosen this turn —  • Create a Treasure token.  • Target creature can't block this turn.  • Exile the top card of your library. You may play it this turn.", power: 3, toughness: 3, rarity: 'Rare', expansion: 'LCI', cardNum: 137, artist: 'Josu Hernaiz'},
  {name: 'Breeches, Eager Pilager', picture: 'type=card&multiverseid=636501', manaCost: '2R', manaValue: 3, superType: ['Legendary'], cardType: ['Creature'], type: ['Goblin', 'Pirate'], rulesText: "First Strike  Whenever a Pirate you control attacks, choose one that hasn't been chosen this turn —  • Create a Treasure token.  • Target creature can't block this turn.  • Exile the top card of your library. You may play it this turn.", power: 3, toughness: 3, rarity: 'Rare', expansion: 'LCI', cardNum: 294, artist: 'Rafal Wechterowicz (Too Many Skulls)'},
  {name: 'Bringer of the Last Gift', picture: 'multiverseid=636798&type=card', manaCost: '6BB', manaValue: 8, cardType: ['Creature'], type: ['Vampire', 'Demon'], rulesText: "Flying  When Bringer of the Last Gift enters the battlefield, if you cast it, each player sacrifices all other creatures they control. Then each player returns all creature cards from their graveyard that weren't put there this way to the battlefield.", power: 6, toughness: 6, rarity: 'Rare', expansion: 'LCI', cardNum: '94', artist: 'Wero Gallo'},
  {name: 'Bringer of the Last Gift', picture: 'type=card&multiverseid=639263', manaCost: '6BB', manaValue: 8, cardType: ['Creature'], type: ['Vampire', 'Demon'], rulesText: "Flying  When Bringer of the Last Gift enters the battlefield, if you cast it, each player sacrifices all other creatures they control. Then each player returns all creature cards from their graveyard that weren't put there this way to the battlefield.", power: 6, toughness: 6, rarity: 'Rare', expansion: 'LCI', cardNum: '337', artist: 'Psydrian'},
    
];

var createManyCards = function(arrayOfCards, done) {
  Card.create(arrayOfCards, function (err, cards) {
    if (err) return console.log(err);
    done(null, cards);
  });
};

const findCardsByName = (cardName, done) => {
  Card.find({name: cardName}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};

const findCardsByMV = (mV, done) => {
  Card.find({manaValue: mV}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};

const findCardsByMC = (mC, done) => {
  Card.find({manaCost: mC}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};

const findCardsBySuper = (sT, done) => {
  Card.find({superType: sT}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};

const findCardsByCT = (cT, done) => {
  Card.find({cardType: cT}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};

const findCardsByType = (Type, done) => {
  Card.find({type: Type}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};

const findCardsByRarity = (rare, done) => {
  Card.find({rarity: rare}, function(err, cardFound) {
    if (err) return console.log(err);
    done(null, cardFound);
  });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
