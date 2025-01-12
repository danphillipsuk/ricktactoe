// Create player objects factory function
const playerFactory = (name, marker) => {
  return {
    name,
    marker
  }
}

const gameBoard = (() => {

  // Create empty array for new game
  let board = Array(9).fill('')

  // Create and display squares on the DOM for each array index
  let cells = document.querySelector("#gameBoard")
  board.forEach(() => {
    const cell = document.createElement("div")
    cell.className = "square"
    cells.appendChild(cell)
  })

  // Add event listeners to each cell/square on board
  Array.from(cells.children)
    .forEach((cell, index) => {
      cell.addEventListener('click', () => {

        // Update DOM board
        const playerImage = document.createElement('img')
        playerImage.src = gameplayManagement.activePlayer.image
        playerImage.alt = `An avatar of ${gameplayManagement.activePlayer.name}`
        cell.append(playerImage)
        cell.classList.add(gameplayManagement.activePlayer.marker)


        // Remove event listener from completed cell/square and reduce remaining available cells
        cell.style.pointerEvents = 'none'
        gameplayManagement.remainingCells -= 1

        // Update board array
        board[index] = gameplayManagement.activePlayer.marker

        // Check if game has a winner | select next player if false, anounce winner if true
        gameplayManagement.checkWinner()

        if (gameplayManagement.announceWinner === false) { // If there is no winner
          if (gameplayManagement.remainingCells > 0) { // If there are still squares to play
            gameplayManagement.alertNextPlayer()
            gameplayManagement.nextPlayer()
          } else if (gameplayManagement.remainingCells < 1) { // If there are no squares left to play, announce tie game
            gameplayManagement.tieGame()
          }
        }
      })
    })

  return { board }
})()

const gameplayManagement = (() => {

  // Function to randomly select player
  function randomPlayerStart() {
    const num = Math.floor((Math.random() * 2) + 1)
    if (num === 1) {
      return playerA
    } else {
      return playerB
    }
  }

  let players = [
    {
      id: 1,
      name: 'Rick',
      marker: 'rick',
      catchphrase: "I'm sorry, but your opinion means very little to me.",
      image: 'images/rick.jpeg'
    },
    {
      id: 2,
      name: 'Morty',
      marker: 'morty',
      catchphrase: "Nobody exists on purpose. Nobody belongs anywhere. Everybody's gonna die. Come watch TV.",
      image: 'images/morty.png'
    },
    {
      id: 3,
      name: 'Summer',
      marker: 'summer',
      catchphrase: "No wonder you're constantly fighting with each other & behind schedule!",
      image: 'images/summer.jpeg'
    },
    {
      id: 4,
      name: 'Jerry',
      marker: 'jerry',
      catchphrase: "Take your attitude to the men's section of K-Mart, because you need to cut me some slack...sss!",
      image: 'images/jerry.png'
    },
    {
      id: 5,
      name: 'Ants In My Eyes Johnson',
      marker: 'ants',
      catchphrase: "Everything's black!",
      image: 'images/antsinmyeyes.jpeg'
    },
    {
      id: 6,
      name: 'Alan Rails',
      marker: 'alanrails',
      catchphrase: 'He could have just used a ghost train ',
      image: 'images/alanrails.jpeg'
    },
    {
      id: 7,
      name: 'Abradolf Lincler',
      marker: 'lincler',
      catchphrase: "Prepare to be emancipated, from your own inferior genes!",
      image: "images/hitler.jpeg"
    },
    {
      id: 8,
      name: 'Baby Legs',
      marker: 'babylegs',
      catchphrase: 'Ooh I learned a valuable lesson here today!',
      image: 'images/babylegs.jpeg'
    },
    {
      id: 9,
      name: 'Big Morty',
      marker: 'bigmorty',
      catchphrase: 'Ah, Bubblah!',
      image: 'images/bigmorty.jpeg'
    },
    {
      id: 10,
      name: 'Bird Person',
      marker: 'birdperson',
      catchphrase: "Don't be gross Tammy",
      image: 'images/birdperson.png'
    },
    {
      id: 11,
      name: 'Blim Blam',
      marker: 'blimblam',
      catchphrase: 'Cards on the table: I am a murderer that eats babies and I came to this planet to eat babies!',
      image: 'images/blimblam.jpeg'
    },
    {
      id: 12,
      name: 'Campaign Manager Morty',
      marker: 'ccm',
      catchphrase: "You don't pay me to have faith! And we're the same age!",
      image: 'images/campaignmorty.jpeg'
    },
    {
      id: 13,
      name: 'Cop Morty',
      marker: 'copmorty',
      catchphrase: "Nothing's wrong with putting your faith in a Morty.",
      image: 'images/copmorty.jpeg'
    },
    {
      id: 14,
      name: 'Cousin Nicky',
      marker: 'cousinnicky',
      catchphrase: "I'm walkin' here",
      image: 'images/cousinnicky.jpeg'
    },
    {
      id: 15,
      name: 'Doofus Rick',
      marker: 'doofus',
      catchphrase: "I'm not doofus Rick! I'm Rick J-19-Zeta-7",
      image: 'images/doofus.jpeg'
    },
    {
      id: 16,
      name: 'Evil Morty',
      marker: 'evil',
      catchphrase: "This seems like a good time for a drink, and a cold, calculated speech with sinister overtones",
      image: 'images/evilmorty.jpeg'
    },
    {
      id: 17,
      name: 'Eyehole Man',
      marker: 'eyehole',
      catchphrase: "Get up on outta here with my eyeholes!",
      image: 'images/eyehole.jpeg'
    },
    {
      id: 18,
      name: 'Fat Morty',
      marker: 'fatmorty',
      catchphrase: "I thought I was left-handed Morty?",
      image: 'images/fatmorty.jpeg'
    },
    {
      id: 19,
      name: "Frankenstein's Monster",
      marker: 'frankenstein',
      catchphrase: "I was on the wrong side of the pitchfork on this one.",
      image: 'images/frankenstein.jpeg'
    },
    {
      id: 20,
      name: "Ice T",
      marker: 'icet',
      catchphrase: "I care now!",
      image: 'images/icet.jpeg'
    },
    {
      id: 21,
      name: "Insurance Rick",
      marker: 'insurancerick',
      catchphrase: "Scuse me, sir, is your Morty insured?",
      image: 'images/insurancerick.jpeg'
    },
    {
      id: 22,
      name: "Celebrity Jerry",
      marker: 'celebrityjerry',
      catchphrase: "I love doing cocaine with you Johnny Depp!",
      image: 'images/celebrityjerry.jpeg'
    },
    {
      id: 23,
      name: "Johnny Depp",
      marker: 'johnnydepp',
      catchphrase: "You're my best friend, Jerry Smith. I love doing cocaine with you.",
      image: 'images/johnnydepp.jpeg'
    },
    {
      id: 24,
      name: "King Flippy Nips",
      marker: 'flippynips',
      catchphrase: "Knock 'em dead you!",
      image: 'images/flippynips.jpeg'
    },
    {
      id: 25,
      name: "King Jellybean",
      marker: 'jellybean',
      catchphrase: "How are you today? I'm Mr. Jelly Bean!",
      image: 'images/jellybean.jpeg'
    },
    {
      id: 26,
      name: "Krombopulos Michael",
      marker: 'krombopulos',
      catchphrase: "Oh boy, here I go killing again!",
      image: 'images/krombopolus.jpeg'
    },
    {
      id: 27,
      name: "Mr. Beauregard",
      marker: 'beauregard',
      catchphrase: "Ladies and gentlemen, marmalade is served!",
      image: 'images/beauregard.jpeg'
    },
    {
      id: 28,
      name: "Mr. Booby Buyer",
      marker: 'boobybuyer',
      catchphrase: "I'll buy those boobies for 25 shmeckels!",
      image: 'images/boobybuyer.jpeg'
    },
    {
      id: 29,
      name: "Mr. Meeseeks",
      marker: 'meeseeks',
      catchphrase: "You gotta relax!",
      image: 'images/meeseeks.jpeg'
    },
    {
      id: 30,
      name: "Mr. Needful",
      marker: 'needful',
      catchphrase: "What a terrible waste of a monkey paw!",
      image: 'images/needful.jpeg'
    },
    {
      id: 31,
      name: "Mr. Poopybutthole",
      marker: 'butthole',
      catchphrase: "Oo-wee! Hopefully you don't just waste your life",
      image: 'images/butthole.jpeg'
    },
    {
      id: 32,
      name: "Photography Cyborg",
      marker: 'photography',
      catchphrase: "I am not staring at you. I am Cyborg photographer, just act natural",
      image: 'images/photography.jpeg'
    },
    {
      id: 33,
      name: "Pickle Rick",
      marker: 'pickle',
      catchphrase: "The reason anyone would do this is, if they could, which they can't, would be because they could, which they can't.",
      image: 'images/pickle.jpeg'
    },
    {
      id: 34,
      name: "Prince Nebulon",
      marker: 'nebulon',
      catchphrase: "Oh Rick, how dumb are you?",
      image: 'images/nebulon.jpeg'
    },
    {
      id: 35,
      name: "Principal Vagina",
      marker: 'vagina',
      catchphrase: "Principal Vagina here. Don't let the name fool you — I'm very much in charge.",
      image: 'images/vagina.jpeg'
    },
    {
      id: 36,
      name: "Randy Dicknose",
      marker: 'dicknose',
      catchphrase: "Ha ha ha ha ha... I mean, wouldn't the cars always win...?",
      image: 'images/dicknose.jpeg'
    },
    {
      id: 37,
      name: "Regular Legs",
      marker: 'regularlegs',
      catchphrase: "I'm coming, Baby Legs! I'm Regular Legs!",
      image: 'images/regularlegs.jpeg'
    },
    {
      id: 38,
      name: "Ruben",
      marker: 'ruben',
      catchphrase: "Pearl Harbour.",
      image: 'images/ruben.jpeg'
    },
    {
      id: 39,
      name: "Scary Terry",
      marker: 'terry',
      catchphrase: "Oh, no! I'm not wearing any pants!",
      image: 'images/terry.jpeg'
    },
    {
      id: 40,
      name: "Scroopy Noopers",
      marker: 'scroopy',
      catchphrase: "Is everyone in your family an idiot?",
      image: 'images/scroopy.jpeg'
    },
    {
      id: 41,
      name: "Sleepy Gary",
      marker: 'sleepygary',
      catchphrase: "Maybe we'll see Chewbacca?",
      image: 'images/sleepygary.jpeg'
    },
    {
      id: 42,
      name: "Slippery Stair",
      marker: 'slippery',
      catchphrase: "Y'all need to ride down the stairs? My name is Slippely-Slippery Stair",
      image: 'images/slipperystair.jpeg'
    },
    {
      id: 43,
      name: "Slow Mobius",
      marker: 'mobius',
      catchphrase: "Ha ha! Sorry, dude! I'm just trying to show off my powers, bro!",
      image: 'images/mobius.jpeg'
    },
    {
      id: 44,
      name: "Stealy",
      marker: 'stealy',
      catchphrase: "Alright, here we go. We're gonna just steal a couple of things.",
      image: 'images/stealy.jpeg'
    },
    {
      id: 45,
      name: "Stu",
      marker: 'stu',
      catchphrase: "There's another real human in the simulator.",
      image: 'images/stu.jpeg'
    },
    {
      id: 46,
      name: "Supernova",
      marker: 'supernova',
      catchphrase: "I conceived a child with Million Ants and it died inside me because it as HALF A MILLION ANTS AND HALF COLLAPSING STAR! And yes, he was better than you!",
      image: 'images/supernova.jpeg'
    },
    {
      id: 47,
      name: "Tammy Guetermann",
      marker: 'tammy',
      catchphrase: "Have you ever been peed on before? Oh my God, yum!",
      image: 'images/tammy.jpeg'
    },
    {
      id: 48,
      name: "President Curtis",
      marker: 'president',
      catchphrase: " I have pants at the Pentagon, Rhonda. It's in my contract.",
      image: 'images/curtis.jpeg'
    },
    {
      id: 49,
      name: "Tomas Lipnip",
      marker: 'tommy',
      catchphrase: "I'm going to have sex with some of you and then eat the babies.'",
      image: 'images/tommy.jpeg'
    },
    {
      id: 50,
      name: "Tiny Rick",
      marker: 'tinyrick',
      catchphrase: "I'm really old. This isn't me.",
      image: 'images/tinyrick.jpeg'
    },
    {
      id: 51,
      name: "Toxic Rick",
      marker: 'toxicrick',
      catchphrase: "Are you listening, you stupid little garbage person?!",
      image: 'images/toxicrick.jpeg'
    },
  ]

  function rando(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function playerSelect() {
    const player = players[rando(0, players.length)]
    const index = players.findIndex((ele => ele.id === player.id))
    players.splice(index, 1)
    return player
  }

  const playerA = playerSelect()
  const playerB = playerSelect()

  // Decide which player starts game and announce on the DOM
  const activePlayer = randomPlayerStart()

  // Required selecters
  const wrapper = document.querySelector('#bodyWrapper')
  const gameState = document.querySelector('#gameState')
  const gameboard = document.querySelector('#gameBoard')
  const announcement = document.querySelector('#announcement')

  // Announce game players
  announcement.innerHTML = `<h2><span class='playerId'>${playerA.name}</span><span id='versus'>V</span><span class='playerId'>${playerB.name}</span></h2>`
  gameboard.append(announcement)
  gameState.innerHTML = `<p>${activePlayer.name}, you're up first, show us what you got!</p>`

  setTimeout(() => {
    announcement.style.display = 'none'
    gameState.style.opacity = '1'
    wrapper.style.background = 'rgba(0, 0, 0, .5)'
  }, 3000)

  // Initial game state
  let remainingCells = 9
  let announceWinner = false

  // Winning conditions
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function checkWinner() {
    winningCombinations.forEach((item) => {
      if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
        this.announceWinner = true
        announceWinningPlayer(this.activePlayer)
      }
    })
  }

  function announceWinningPlayer(player) {
    gameState.style.display = 'none'
    announcement.style.display = 'grid'
    announcement.style.background = 'rgba(2, 169, 247, 0.8)'
    announcement.innerHTML = `<h3>${player.catchphrase}<span>${player.name} wins!</span></h3>`
    gameboard.append(announcement)
    resetGame()
    muteBoard()
  }

  function alertNextPlayer() {
    this.activePlayer === playerA ? gameState.innerHTML = `<p>It's ${playerB.name}'s turn</p>` : gameState.innerHTML = `<p>${playerA.name}, you're up...</p>`
  }

  function nextPlayer() {
    this.activePlayer === playerA ? this.activePlayer = playerB : this.activePlayer = playerA
  }

  function tieGame() {
    announcement.style.display = 'grid'
    announcement.style.background = 'rgba(2, 169, 247, 0.8)'
    announcement.innerHTML = `<h3><span class='playerId'>Tie game!</span></h3>`
    gameboard.append(announcement)
    resetGame()
  }

  function muteBoard() {
    Array.from(gameboard.children).forEach((cell) => {
      cell.style.pointerEvents = 'none'
    })
  }

  function resetGame() {
    const resetButton = document.createElement('button')
    resetButton.id = 'reset'
    resetButton.style.pointerEvents = 'auto'
    resetButton.textContent = 'Play Again?'
    announcement.appendChild(resetButton)
    resetButton.addEventListener('click', () => {
      window.location.reload(false)
    })
  }

  return {
    activePlayer,
    remainingCells,
    announceWinner,
    alertNextPlayer,
    nextPlayer,
    checkWinner,
    tieGame,
  }
})()

